import React from 'react'
import { Row, Col, Card } from 'antd';
import Draggable from 'react-draggable';
import MStatsBar from './MStatsBar';
import MStatsPie from './MStatsPie';
import MNumUtils from '../../rlib/utils/MNumUtils';
import MAntdCard from '../../rlib/props/MAntdCard';
import { statBarByDay, totalPieByIO, outPieByIP, inPieByIP, statBarByIP } from './StatCharts';
import FlowPackTable from './FlowPackTable';

class FlowAuditView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // assets: [] = SimAssets.allAssets(),
            stats: this.fetchVirtualStats(),
        };

    }
    componentDidMount() {
    }

    componentWillUnmount() {
    }

    fetchVirtualStats() {
        let stats = {};
        stats['netIOTotal'] = [{ name: '下行', value: MNumUtils.rand(800) + 1120 }, { name: '上行', value: MNumUtils.rand(800) + 1120 }];

        let outIPTotal = [];
        for (let index = 11; index <= 28; index++) {
            outIPTotal.push({ name: '192.168.1.' + (index), value: MNumUtils.rand(800) + 200 });
        }
        stats['outIPTotal'] = outIPTotal;

        let inIPTotal = [];
        for (let index = 11; index <= 28; index++) {
            inIPTotal.push({ name: '192.168.1.' + (index), value: MNumUtils.rand(800) + 200 });
        }
        stats['inIPTotal'] = inIPTotal;

        let dayStat = [['flow', '下行（每日）', '上行（每日）'],];
        for (let index = 1; index <= 30; index++) {
            dayStat.push(['2020-8-' + index, MNumUtils.rand(800) + 20, MNumUtils.rand(1000) + 100])
        }
        stats['dayStat'] = dayStat;

        let ipStat = [['flow', '下行-IP', '上行-IP'],];
        for (let index = 1; index <= 30; index++) {
            ipStat.push(['192.168.1.' + index, MNumUtils.rand(800) + 20, MNumUtils.rand(1000) + 100])
        }
        stats['ipStat'] = ipStat;

        return stats;
    }

    render() {
        const { stats } = this.state;
        let rowHeight = 200;
        return (
            <div>
                <Row gutter={20} style={{ marginBottom: 24 }}>
                    <Col span={18}> {statBarByIP(stats['ipStat'])} </Col>
                    <Col span={6}> {totalPieByIO(stats['netIOTotal'])} </Col>
                </Row>
                <Row gutter={20} style={{ marginBottom: 24 }}>
                    <Col span={12}> {outPieByIP(stats['outIPTotal'])} </Col>
                    <Col span={12}> {inPieByIP(stats['inIPTotal'])} </Col>
                </Row>
                <Row gutter={20} style={{ marginBottom: 24 }}>
                    {statBarByDay(stats['dayStat'])}
                </Row>

                {/* <Draggable defaultPosition={{x: 100, y: 0}}>
                    <div style={{ top: 20 }}>I can now be moved around!</div>
                </Draggable> */}
                <FlowPackTable />
            </div>
        );
    }
}


export default FlowAuditView;
