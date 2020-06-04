import React from 'react'
import { Row, Col, Card } from 'antd';
import MStatsBar from './MStatsBar';
import MStatsPie from './MStatsPie';
import MNumUtils from '../../rlib/utils/MNumUtils';
import MAntdCard from '../../rlib/props/MAntdCard';
import MEvent from '../../rlib/utils/MEvent';

function getFlowPackByDay(day) {
    // message.error('每日统计--' + day);
    MEvent.send('my_fetch_asset_packs', 1);
}

function getFlowPackByAsset(asset_uuid) {
    // message.error('IP统计--' + ipAddr);
    MEvent.send('my_fetch_asset_packs', 'd6adc99a-2dd4-4402-8a86-4a8f0bdcfcd2');
}

function clickAssetFlowPie(data) {
    MEvent.send('my_fetch_asset_packs', data.asset_uuid);
}

function clickAssetFlowBar(data) {
    // 多 category 的数据格式为：
    // [asset.name, number, number, asset.asset_ip, asset.asset_uuid]
    MEvent.send('my_fetch_asset_packs', data[4]);
}


var rowHeight = 200;

export function statBarByDay(dataSet) {
    return (
        <Card title={'按日统计流量'}
            bodyStyle={{ minHeight: rowHeight }}
            headStyle={MAntdCard.headerStyle('main')}
            extra={<div style={{ color: 'white', fontSize: 16 }}>点击条形图，解析指定日期的网络数据包</div>}
        >
            <MStatsBar name={''} dataSet={dataSet} extraParams={{ height: rowHeight, onClick: getFlowPackByDay }} />
        </Card>
    );
}

export function totalPieByIO(dataSet) {
    return (
        <Card title={'进出流量对比'} bodyStyle={{ minHeight: rowHeight }} headStyle={MAntdCard.headerStyle('main')}
        >
            <MStatsPie name={''} dataSet={dataSet} extraParams={{ width: rowHeight, }} />
        </Card>
    );
}

export function outPieByAsset(dataSet) {
    return (
        <Card title={'发送数据'}
            bodyStyle={{ minHeight: rowHeight }}
            headStyle={MAntdCard.headerStyle('emphasis')}
            extra={<div style={{ color: 'white', fontSize: 16 }}>点击图中扇形，解析指定终端的网络数据包</div>}
        >
            <MStatsPie name={''} dataSet={dataSet} extraParams={{ width: rowHeight, vertLegend: true, onClick: clickAssetFlowPie }} />
        </Card>
    );
}

export function inPieByAsset(dataSet) {
    return (
        <Card title={'接收数据'}
            bodyStyle={{ minHeight: rowHeight }}
            headStyle={MAntdCard.headerStyle('emphasis-2')}
            extra={<div style={{ color: 'white', fontSize: 16 }}>点击图中扇形，解析指定终端的网络数据包</div>}
        >
            <MStatsPie name={''} dataSet={dataSet} extraParams={{ width: rowHeight, vertLegend: true, onClick: clickAssetFlowPie }} />
        </Card>
    );
}

export function statBarByTerminal(dataSet) {
    return (
        <Card title={'各终端流量统计'}
            bodyStyle={{ minHeight: rowHeight }}
            headStyle={MAntdCard.headerStyle('main-2')}
            extra={<div style={{ color: 'white', fontSize: 16 }}>点击条形图，解析指定终端的网络数据包</div>}
        >
            <MStatsBar name={''} dataSet={dataSet} extraParams={{ height: rowHeight, onClick: clickAssetFlowBar }} />
        </Card>
    );
}

