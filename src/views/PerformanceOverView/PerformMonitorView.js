import React from 'react'
import ReactEcharts from 'echarts-for-react';
import { Card, Select, Icon, Row, Col, Tabs, Popconfirm } from 'antd'
import MEvent from '../../rlib/utils/MEvent';
import MSingleTimeLine from '../../rlib/echarts/MSingleTimeLine';
import MMultiTimeLine from '../../rlib/echarts/MMultiTimeLine';
import MGauge from '../../rlib/echarts/MGauge';
import MTimeUtils from '../../rlib/utils/MTimeUtils';
import MAntdCard from '../../rlib/props/MAntdCard';

export default class PerformMonitorView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            asset_name: this.props.title,
            asset_uuid: this.props.uuid,
            cpuUsage: [],
            networkIn: [],
            networkOut: [],
            memUsage: 0,
            diskUsage: 0,
        }

    }

    componentDidMount() {
        MEvent.register('my_update_perform_data', this.handleUpdate);
    }

    componentWillUnmount() {
        MEvent.unregister('my_update_perform_data', this.handleUpdate);
    }

    handleUpdate = (infosList) => {
        const { asset_uuid, cpuUsage, networkIn, networkOut } = this.state;
        for (let info of infosList) {
            if (info.asset_uuid === asset_uuid) {
                let now = MTimeUtils.now('nostr');
                cpuUsage.push({ time: now, data: info.cpuUsage });
                networkIn.push({ time: now, data: info.networkIn });
                networkOut.push({ time: now, data: info.networkOut });
                this.setState({ cpuUsage, networkIn, networkOut, memUsage: info.memUsage, diskUsage: info.diskUsage });
            }
        }
    }

    render() {
        const { asset_name, asset_uuid } = this.state;
        let tm = MTimeUtils.parse('2020-05-09 18:49:50');
        let usagesList = [];
        for (let i = 10; i >= 0; i--) {
            tm.setSeconds(tm.getSeconds() - 3000 * i);
            usagesList.push({ time: MTimeUtils.formatStr(tm, 'UTC'), data: i / 5.0 });
        }
        let usagesList2 = [];
        for (let i = 10; i >= 0; i--) {
            tm.setSeconds(tm.getSeconds() - 3000 * i);
            usagesList2.push({ time: MTimeUtils.formatStr(tm, 'UTC'), data: [i / 5.0, i / 3.0] });
        }
        let rowHeight = 130;
        return (<div>
            <Card title={asset_name} bodyStyle={{ minHeight: rowHeight * 2 }} headStyle={MAntdCard.headerStyle('main')}>
                <Row gutter={20} style={{ marginBottom: 18 }}>
                    <Col span={18}>
                        <MSingleTimeLine name={'CPU(%)'} usagesList={usagesList} extraParams={{ updateEvent: 'CPU_' + asset_uuid, height: rowHeight }} />
                    </Col>
                    <Col span={6}>
                        <MGauge name={'内存(%)'} extraParams={{ updateEvent: 'MEMORY_' + asset_uuid, height: rowHeight }} />
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col span={18}>
                        <MMultiTimeLine name={'网络流量'} usagesList={usagesList2}
                            extraParams={{ updateEvent: 'NET_' + asset_uuid, lineNames: ['In', 'Out'], height: rowHeight }} />
                    </Col>
                    <Col span={6}>
                        <MGauge name={'磁盘'} extraParams={{ updateEvent: 'DISK_' + asset_uuid, height: rowHeight }} />
                    </Col>
                </Row>
            </Card>
        </div>);

    }

}
