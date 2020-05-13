import React from 'react'
import { Row, Col, Card } from 'antd';
import MStatsBar from './MStatsBar';
import MStatsPie from './MStatsPie';
import MNumUtils from '../../rlib/utils/MNumUtils';
import MAntdCard from '../../rlib/props/MAntdCard';

import { getFlowPackByDay, getFlowPackByIP } from './FlowPackTable';

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

export function outPieByIP(dataSet) {
    return (
        <Card title={'上行数据'}
            bodyStyle={{ minHeight: rowHeight }}
            headStyle={MAntdCard.headerStyle('emphasis')}
            extra={<div style={{ color: 'white', fontSize: 16 }}>点击图中扇形，解析指定IP地址的网络数据包</div>}
        >
            <MStatsPie name={'上行'} dataSet={dataSet} extraParams={{ width: rowHeight, vertLegend: true, onClick: getFlowPackByIP }} />
        </Card>
    );
}

export function inPieByIP(dataSet) {
    return (
        <Card title={'下行数据'}
            bodyStyle={{ minHeight: rowHeight }}
            headStyle={MAntdCard.headerStyle('emphasis-2')}
            extra={<div style={{ color: 'white', fontSize: 16 }}>点击图中扇形，解析指定IP地址的网络数据包</div>}
        >
            <MStatsPie name={''} dataSet={dataSet} extraParams={{ width: rowHeight, vertLegend: true, onClick: getFlowPackByIP }} />
        </Card>
    );
}

export function statBarByIP(dataSet) {
    return (
        <Card title={'按IP地址统计流量'}
            bodyStyle={{ minHeight: rowHeight }}
            headStyle={MAntdCard.headerStyle('main-2')}
            extra={<div style={{ color: 'white', fontSize: 16 }}>点击条形图，解析指定IP地址的网络数据包</div>}
        >
            <MStatsBar name={''} dataSet={dataSet} extraParams={{ height: rowHeight, onClick: getFlowPackByIP }} />
        </Card>
    );
}

