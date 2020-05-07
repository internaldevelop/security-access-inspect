import React from 'react'
import ReactEcharts from 'echarts-for-react';
import { Card, Select, Icon, Button, Col, Tabs, Popconfirm } from 'antd'
import { getSimulateOptions, getGraphOptions } from './options';
import { getCardHeaderStyle } from '../../utils/CardUtils';
import { AssetClass, AssetStatus, getAssetClass, getCateIndex, getCateIndexByClass, getCateIndexByStatus } from '../../modules/assetForm/AssetStatus'
import { MyRegisterEvent, MyUnregisterEvent, MySendEvent } from '../../global/environment/MySysEvent';
import RestReq from '../../utils/RestReq';
import { DeepClone } from '../../utils/ObjUtils';

const { Option } = Select;

export default class AssetsGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // selectClass: 2,
            // selectStatus: null,
            assetBasicInfos: [],
            assetDetailInfos: [],
        }

        this.selectClass = null;
        this.selectStatus = null;
        this.echartsReact = React.createRef();

        // 从后台获取设备数据的集合
        this.getAllAssets();

        this.onClickScanAssets = this.onClickScanAssets.bind(this);
    }

    queryBasicInfosCB = (data) => {
        let assetsArr = data.payload.data;
        let assetBasicInfos = assetsArr.map((asset, index) => {
            let basicInfo = DeepClone(asset);
            return basicInfo;
        })
        this.setState({ assetBasicInfos });
    }

    queryDetailInfosCB = (data) => {
    }

    getAllAssets() {
        RestReq.asyncGet(this.queryBasicInfosCB, '/embed-terminal/assets/get-assets', {}, { token: false });
        // RestReq.asyncGet(this.queryDetailInfosCB, '/embed-terminal/assets/get-assets-details');
    }

    handleAssetClassChange = (value) => {
        console.log(`selected ${value}`);
        if (value === "not-assign") { value = AssetClass.NOT_ASSIGN; }
        else if (value === "white") { value = AssetClass.WHITE_LIST; }
        else if (value === "black") { value = AssetClass.BLACK_LIST; }
        else { value = null; }
        this.selectClass = value;

        // 坑，需要通过 setOption 才能动态刷新，render 时调整参数做不到刷新
        this.echartsReact.getEchartsInstance().setOption(getSimulateOptions(this.selectClass, this.selectStatus));
    }

    handleAssetStatusChange = (value) => {
        const { assetBasicInfos } = this.state;

        console.log(`selected ${value}`);
        if (value === "online") { value = AssetStatus.ON_LINE; }
        else if (value === "offline") { value = AssetStatus.OFF_LINE; }
        else { value = null; }
        this.selectStatus = value;

        // 刷新
        this.echartsReact.getEchartsInstance().setOption(getGraphOptions(assetBasicInfos, this.selectClass, this.selectStatus));
    }

    onClickScanAssets() {
        this.getAllAssets();
    }

    getExtra() {
        return (<div>
            <Select defaultValue="all" style={{ width: 120 }} onChange={this.handleAssetClassChange.bind(this)}>
                <Option value="all">全部分类</Option>
                <Option value="not-assign">未审核</Option>
                <Option value="white">白名单</Option>
                <Option value="black">黑名单</Option>
            </Select>
            <Select defaultValue="all" style={{ width: 120 }} onChange={this.handleAssetStatusChange.bind(this)}>
                <Option value="all">所有状态</Option>
                <Option value="online">在线</Option>
                <Option value="offline">离线</Option>
            </Select>
            <Button style={{ backgroundColor: '#fff7e6', color: '#610b00' }} onClick={this.onClickScanAssets}>重新扫描</Button>
            {/* <Button style={{ backgroundColor: '#ff4d4f', color: 'white' }}>重新扫描</Button> */}
            {/* <Button type="primary" htmlType="submit">重新扫描</Button> */}
        </div>);
    }

    onChartover() {
        console.log('ReactEcharts graph onChartover');
    }

    onChartout() {
        console.log('ReactEcharts graph onChartout');
    }

    findAssetInfo(uuid) {
        const { assetBasicInfos, assetDetailInfos } = this.state;
        let basicInfo = {};
        for (let item of assetBasicInfos) {
            if (item.uuid === uuid) {
                basicInfo = item;
            }
        }
        let detailInfo = {};
        for (let item of assetDetailInfos) {
            if (item.uuid === uuid) {
                detailInfo = item;
            }
        }
        return {basicInfo, detailInfo};
    }

    onClick(event) {
        console.log('ReactEcharts graph onClick');
        console.log(event);
        // echarts 中，错误地把 path(links) 当做 edge，links 的 dataType 是 'edge'
        if (event.dataType === 'node') {
            // event.data['assetClass'] = getAssetClass(event.data.category);
            // MySendEvent('my_select_asset_basic_info', event.data);

            let assetInfo = this.findAssetInfo(event.data.value);
            if (assetInfo.basicInfo.hasOwnProperty('uuid')) {
                MySendEvent('my_select_asset_basic_info', assetInfo.basicInfo);
                MySendEvent('my_select_asset_detail_info', assetInfo.detailInfo);
            } else {
                // 发送虚拟设备
                let basicInfo = {uuid: event.data.value, name: event.data.name, classify: getAssetClass(event.data.category)};
                MySendEvent('my_select_asset_basic_info', basicInfo);
            }
        }
    }

    render() {
        const { assetBasicInfos } = this.state;
        const onEvents = {
            // 'mouseover': this.onChartover.bind(this),
            // 'mouseout': this.onChartout.bind(this),
            'click': this.onClick.bind(this),
        }

        return (<Card title={'终端一览（review）'} headStyle={getCardHeaderStyle('main')}
            extra={this.getExtra()}
            style={{ height: '100%', margin: 8 }}>
            <ReactEcharts option={getGraphOptions(assetBasicInfos, null, null)} style={{ width: '100%', height: 600 }}
                ref={(e) => { this.echartsReact = e }} onEvents={onEvents} />
        </Card>);
    }
}

// export default withStyles(styles)(AssetsGraph);
