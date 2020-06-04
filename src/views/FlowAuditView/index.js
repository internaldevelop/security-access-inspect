import React from 'react'
import { Row, Col, Card } from 'antd';
import Draggable from 'react-draggable';
import MStatsBar from './MStatsBar';
import MStatsPie from './MStatsPie';
import MNumUtils from '../../rlib/utils/MNumUtils';
import MObjUtils from '../../rlib/utils/MObjUtils';
import MAntdCard from '../../rlib/props/MAntdCard';
import RestReq from '../../utils/RestReq';
import { statBarByDay, totalPieByIO, outPieByAsset, inPieByAsset, statBarByTerminal } from './StatCharts';
import FlowPackTable from './FlowPackTable';
import SimNetStats from '../../modules/simdata/SimNetStats';

class FlowAuditView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // assets: [] = SimAssets.allAssets(),
            stats: SimNetStats.fetchVirtualStats(),
            hasData: false,
        };

        this.fetchStats();

    }
    componentDidMount() {
    }

    componentWillUnmount() {
    }

    fetchStatsCB = (response) => {
        let payload = response.payload;
        let stats = MObjUtils.deepClone(this.state.stats);
        // 接收发送总数饼图数据
        stats['netIOTotal'] = [{ name: '接收', value: payload.all_recv_count }, { name: '发送', value: payload.all_sent_count }];

        let details = payload.details;
        for (let asset of details) {
            // 各资产接收饼图数据
            let inRecord = { name: asset.asset_name, value: asset.recv_count, asset_ip: asset.asset_ip, asset_uuid: asset.asset_uuid };
            stats['inIPTotal'].push(inRecord);
            // 各资产发送饼图数据
            let outRecord = { name: asset.asset_name, value: asset.sent_count, asset_ip: asset.asset_ip, asset_uuid: asset.asset_uuid };
            stats['outIPTotal'].push(outRecord);
            // 各资产接收发送条形图数据
            let record = [asset.asset_name, asset.recv_count,asset.sent_count, asset.asset_ip, asset.asset_uuid];
            stats['ipStat'].push(record);
        }

        this.setState({ stats, hasData: true });
    }

    fetchStats() {
        RestReq.asyncGet(this.fetchStatsCB, '/embed-terminal/network/packet/statistics', {});
    }

    render() {
        const { stats, hasData } = this.state;
        let rowHeight = 200;
        return (
            <div>
                {hasData && <div>
                    <Row gutter={20} style={{ marginBottom: 24 }}>
                        <Col span={18}> {statBarByTerminal(stats['ipStat'])} </Col>
                        <Col span={6}> {totalPieByIO(stats['netIOTotal'])} </Col>
                    </Row>
                    <Row gutter={20} style={{ marginBottom: 24 }}>
                        <Col span={12}> {outPieByAsset(stats['outIPTotal'])} </Col>
                        <Col span={12}> {inPieByAsset(stats['inIPTotal'])} </Col>
                    </Row>
                    <Row gutter={20} style={{ marginBottom: 24 }}>
                        {/* {statBarByDay(stats['dayStat'])} */}
                    </Row>

                    {/* <Draggable defaultPosition={{x: 100, y: 0}}>
                    <div style={{ top: 20 }}>I can now be moved around!</div>
                    </Draggable> */}
                    <FlowPackTable />
                </div>}
            </div>
        );
    }
}


export default FlowAuditView;
