import React from 'react'
import ReactEcharts from 'echarts-for-react';
import { Card, Select, Icon, Row, Col, Tabs, Popconfirm } from 'antd'
import MEvent from '../../rlib/utils/MEvent';
import MSingleTimeLine from '../../rlib/echarts/MSingleTimeLine';
import MMultiTimeLine from '../../rlib/echarts/MMultiTimeLine';
import MGauge from '../../rlib/echarts/MGauge';
import MTimeUtils from '../../rlib/utils/MTimeUtils';
import MNumUtils from '../../rlib/utils/MNumUtils';
import MAntdCard from '../../rlib/props/MAntdCard';
import { OpenSocket, CloseSocket } from '../../utils/WebSocket';
import { sockMsgType } from '../../global/enumeration/SockMsgType'

let l_socket = null;

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
            lastPacketsRecv: -1,
            lastPacketsSent: -1,
            lastTimeStamp: 1,
        }

        this.processAssetRealTimeInfo = this.processAssetRealTimeInfo.bind(this);
    }

    componentDidMount() {
        MEvent.register('my_update_perform_data', this.handleUpdate);
        // l_socket = OpenSocket('asset_info', this.processAssetRealTimeInfo);
    }

    componentWillUnmount() {
        MEvent.unregister('my_update_perform_data', this.handleUpdate);

        // CloseSocket(l_socket);
    }

    processAssetRealTimeInfo(data) {
        let { asset_uuid, lastPacketsRecv, lastPacketsSent, lastTimeStamp } = this.state;

        let message = JSON.parse(data);
        // if (message.type !== sockMsgType.ASSET_REAL_TIME_INFO)
        if (message.type !== sockMsgType.SINGLE_TASK_RUN_INFO)
            return;

        let assetInfo = message.payload;
        if (assetInfo.asset_uuid !== asset_uuid)
            return;
        console.log(message);

        // CPU 占用率
        let cpuUsage = {
            time: MTimeUtils.now(),
            data: MNumUtils.fixed(assetInfo.CPU.systemCpuLoad * 100),
        }
        MEvent.send('CPU_' + asset_uuid, cpuUsage);

        // 内存 占用率
        let memPercent = 1.0 * (assetInfo.Memory.total - assetInfo.Memory.available) / assetInfo.Memory.total;
        memPercent = MNumUtils.fixed(memPercent, 4);
        MEvent.send('MEMORY_' + asset_uuid, memPercent);

        // 磁盘占用率
        let diskPercent = MNumUtils.fixed(assetInfo.Disks.usedPercentTotal / 100.0, 4); 
        MEvent.send('DISK_' + asset_uuid, diskPercent);

        // 网络包收发速度
        let packetsRecv = assetInfo.NewworkObj.packetsRecv;
        let packetsSent = assetInfo.NewworkObj.packetsSent;
        let timeStamp = assetInfo.NewworkObj.timeStamp;

        if (lastPacketsRecv < 0) {
            lastPacketsRecv = packetsRecv;
        }
        if (lastPacketsSent < 0) {
            lastPacketsSent = packetsSent;
        }

        let recvSpeed = (packetsRecv - lastPacketsRecv) / (timeStamp - lastTimeStamp);
        recvSpeed = MNumUtils.fixed(recvSpeed);
        let sentSpeed = (packetsRecv - lastPacketsRecv) / (timeStamp - lastTimeStamp);
        sentSpeed = MNumUtils.fixed(sentSpeed);
        let netUsage = {
            time: MTimeUtils.now(),
            data: [recvSpeed, sentSpeed]
        }
        MEvent.send('NET_' + asset_uuid, netUsage);

        this.setState({lastPacketsRecv: packetsRecv, lastPacketsSent: packetsSent, lastTimeStamp: timeStamp});
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
            usagesList.push({ time: MTimeUtils.formatStr(tm, 'UTC'), data: 0 });
        }
        let usagesList2 = [];
        for (let i = 10; i >= 0; i--) {
            tm.setSeconds(tm.getSeconds() - 3000 * i);
            usagesList2.push({ time: MTimeUtils.formatStr(tm, 'UTC'), data: [0, 0] });
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
