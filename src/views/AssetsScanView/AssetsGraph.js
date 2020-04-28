import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import ReactEcharts from 'echarts-for-react';
import { Card, Select, Icon, Button, Col, Tabs, Popconfirm } from 'antd'
import { getSimulateOptions } from './options';
import { getCardHeaderStyle } from '../../utils/CardUtils';
import { AssetClass, AssetStatus, getAssetClass, getCateIndex, getCateIndexByClass, getCateIndexByStatus } from '../../modules/assetForm/AssetStatus'
import { MyRegisterEvent, MyUnregisterEvent, MySendEvent } from '../../global/environment/MySysEvent';

const styles = theme => ({
    root: {
        width: '90%',
    },
});

const { Option } = Select;

export default class AssetsGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // selectClass: 2,
            // selectStatus: null,
        }

        this.selectClass = null;
        this.selectStatus = null;
        this.echartsReact = React.createRef();
        // 设置操作列的渲染
        // this.initActionColumn();

        // 从后台获取设备数据的集合
        // this.getAllAssets();
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
        console.log(`selected ${value}`);
        if (value === "online") { value = AssetStatus.ON_LINE; }
        else if (value === "offline") { value = AssetStatus.OFF_LINE; }
        else { value = null; }
        this.selectStatus = value;

        // 刷新
        this.echartsReact.getEchartsInstance().setOption(getSimulateOptions(this.selectClass, this.selectStatus));
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
            <Button style={{ backgroundColor: '#fff7e6', color: '#610b00' }}>重新扫描</Button>
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

    onClick(event) {
        console.log('ReactEcharts graph onClick');
        console.log(event);
        event.data['assetClass'] = getAssetClass(event.data.category);
        MySendEvent('my_select_asset', event.data);
    }

    render() {
        const onEvents = {
            // 'mouseover': this.onChartover.bind(this),
            // 'mouseout': this.onChartout.bind(this),
            'click': this.onClick.bind(this),
        }  

        return (<Card title={'终端一览（review）'} headStyle={getCardHeaderStyle('main')}
            extra={this.getExtra()}
            style={{ height: '100%', margin: 8 }}>
            <ReactEcharts option={getSimulateOptions(null, null)} style={{ width: '100%', height: 600 }}
                ref={(e) => { this.echartsReact = e }} onEvents={onEvents}/>
        </Card>);
    }
}

// export default withStyles(styles)(AssetsGraph);
