import React from 'react'
import ReactEcharts from 'echarts-for-react';
import { Card, Select, Icon, Button, Col, Tabs, Popconfirm } from 'antd'
import { getSimulateOptions, getGraphOptions } from './options';
import MAntdCard from '../../rlib/props/MAntdCard';
import { AssetClass, AssetStatus, getAssetClass, getCateIndex, getCateIndexByClass, getCateIndexByStatus } from '../../modules/assetForm/AssetStatus'
import MEvent from '../../rlib/utils/MEvent';
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

        // 获取到资产后，默认选择第一个设备
        if (assetBasicInfos.length > 0) {
            this.selectAsset(assetBasicInfos[0].uuid);
        }
    }

    getAllAssets() {
        RestReq.asyncGet(this.queryBasicInfosCB, '/embed-terminal/assets/get-assets', {}, { token: false });
    }

    fetchDetailInfoCB = (data) => {
        const { assetDetailInfos } = this.state;
        let payload = data.payload;

        // 解析并保存设备详情
        let detailInfo = {};
        detailInfo['uuid'] = payload['asset_uuid'];
        detailInfo['sym_key'] = payload['sym_key'];
        detailInfo['public_key'] = payload['public_key'];

        detailInfo['plaintext'] = JSON.parse(payload['plaintext']);
        // console.log(detailInfo['plaintext']);

        // detailInfo['fingerprint'] = JSON.parse(payload['dev_fingerprint']);

        // 缓存设备详情
        assetDetailInfos.push(detailInfo);
        this.setState({ assetDetailInfos });

        // 发送事件给其它组件处理
        MEvent.send('my_select_asset_detail_info', detailInfo);
    }

    fetchAsssetDetailInfo(assetUuid) {
        RestReq.asyncGet(this.fetchDetailInfoCB, '/embed-terminal/assets/get-asset-info', {asset_uuid: assetUuid});
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
        return { basicInfo, detailInfo };
    }

    onClick(event) {
        console.log('ReactEcharts graph onClick');
        console.log(event);
        // echarts 中，错误地把 path(links) 当做 edge，links 的 dataType 是 'edge'
        if (event.dataType === 'node') {
            // event.data['assetClass'] = getAssetClass(event.data.category);
            // MEvent.send('my_select_asset_basic_info', event.data);

            // let assetInfo = this.findAssetInfo(event.data.value);
            this.selectAsset(event.data.value, event);
        }
    }

    selectAsset(assetUuid, event = null) {
        let assetInfo = this.findAssetInfo(assetUuid);

        if (assetInfo.basicInfo.hasOwnProperty('uuid')) {
            // 查找到设备信息，发送事件给其它组件处理
            MEvent.send('my_select_asset_basic_info', assetInfo.basicInfo);
            // MEvent.send('my_select_asset_detail_info', assetInfo.detailInfo);
        } else {
            // 设备信息列表中找不到该设备，又有事件产生，说明是虚拟设备
            if (event != null) {
                let basicInfo = { uuid: event.data.value, name: event.data.name, classify: getAssetClass(event.data.category) };
                MEvent.send('my_select_asset_basic_info', basicInfo);
            }
        }

        if (assetInfo.detailInfo.hasOwnProperty('uuid')) {
            // 查找到设备详情，发送事件给其它组件处理
            MEvent.send('my_select_asset_detail_info', assetInfo.detailInfo);
        } else {
            // 未查到该设备，说明缓存中还没有该设备详情，调用后台接口获取设备详情
            this.fetchAsssetDetailInfo(assetUuid);
        }
    }

    render() {
        const { assetBasicInfos } = this.state;
        const onEvents = {
            // 'mouseover': this.onChartover.bind(this),
            // 'mouseout': this.onChartout.bind(this),
            'click': this.onClick.bind(this),
        }

        return (<Card title={'终端一览（review）'} headStyle={MAntdCard.headerStyle('main')}
            extra={this.getExtra()}
            style={{ height: '100%', margin: 8 }}>
            <ReactEcharts option={getGraphOptions(assetBasicInfos, null, null)} style={{ width: '100%', height: 600 }}
                ref={(e) => { this.echartsReact = e }} onEvents={onEvents} />
        </Card>);
    }
}

// export default withStyles(styles)(AssetsGraph);
