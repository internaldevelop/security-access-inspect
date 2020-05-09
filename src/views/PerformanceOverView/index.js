import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react'

import { Tabs, Card, Skeleton, Select, Input, Spin, Button, Row, Col, Icon, Collapse, message, Modal } from 'antd';

import { renderAssetInfo } from './AssetInfo';
import ProcUsageLine from '../AssetOverView/ProcUsageLine';
import HistoryUsageLine from './HistoryUsageLine';
import UsageGauge from '../AssetOverView/UsageGauge';
import HttpRequest from '../../utils/HttpRequest';
import { OpenSocket, CloseSocket } from '../../utils/WebSocket';
import { sockMsgType } from '../../global/enumeration/SockMsgType'
import { GetMainServerRootUrl, GetAgentRootUrl } from '../../global/environment'
import MEvent from '../../rlib/utils/MEvent';
import MStatCardV3 from '../../rlib/antdComponents/MStatCardV3';
import MAntdCard from '../../rlib/props/MAntdCard';
import PerformMonitorView from './PerformMonitorView';
import MUsageChart from '../../rlib/echarts/MUsageChart';
import SimAssets from '../../modules/simdata/SimAssets';
import MTimeUtils from '../../rlib/utils/MTimeUtils';
import MNumUtils from '../../rlib/utils/MNumUtils';

let l_timer3S = undefined;    // 3秒的定时器

class PerformanceOverView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assets: [] = SimAssets.allAssets(),
            stats: this.fetchVirtualStats(),
        };

        this.fetchVirtualStats();

        this.startSimulateTimer();
    }

    timer3sProcess = () => {
        const { assets } = this.state;
        // 模拟各资产的资源使用数据
        for (let index in assets) {
            let cpuUsage = {
                time: MTimeUtils.now(),
                data: MNumUtils.rand(30, 70),
            }
            MEvent.send('CPU_' + assets[index].uuid, cpuUsage);
            let netUsage = {
                time: MTimeUtils.now(),
                data: [MNumUtils.rand(30), MNumUtils.rand(30)]
            }
            MEvent.send('NET_' + assets[index].uuid, netUsage);
        }
    }

    startSimulateTimer = () => {
        // 开启3秒的定时器
        l_timer3S = setInterval(() => this.timer3sProcess(), 3000);
    }

    fetchVirtualStats() {
        let stats = [];
        stats.push({ name: 'total', title: '终端总数', value: 129, icon: 'database', bgColor: '#DEF2DD', fgColor: 'black' });
        stats.push({ name: 'white_list', title: '白名单', value: 94, icon: 'like', bgColor: '#F3E6FA', fgColor: 'black' });
        stats.push({ name: 'black_list', title: '黑名单', value: 35, icon: 'dislike', bgColor: '#FFF2CC', fgColor: 'red' });
        stats.push({ name: 'online', title: '在线', value: 46, icon: 'eye', bgColor: '#DDEBFF', fgColor: 'green' });
        stats.push({ name: 'auth_time', title: '认证成功', value: 460, icon: 'check-circle', bgColor: '#DEF2DD', fgColor: 'green' });
        stats.push({ name: 'auth_time', title: '认证失败', value: 100, icon: 'close-circle', bgColor: '#FFF2CC', fgColor: 'red' });

        return stats;
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        if (l_timer3S !== undefined)
            clearInterval(l_timer3S);
    }

    render() {
        const { stats, assets } = this.state;
        let statSpan = 24 / stats.length;
        return (
            <div>
                <Row gutter={20} style={{ marginBottom: 24 }}>
                    {stats.map((stat) => (<Col span={statSpan}>
                        <MStatCardV3 myparams={stat} />
                    </Col>))}
                </Row>
                <Row gutter={24} >
                    <div style={{ overflow: 'scroll', minWidth: 800, height: 850 }}>
                        {assets.map((asset, index) => (<Col span={12}>
                            <PerformMonitorView title={asset.name} uuid={asset.uuid}/>
                        </Col>))}
                    </div>
                </Row>
            </div>
        );
    }
}

PerformanceOverView.propTypes = {
    classes: PropTypes.object,
};


export default PerformanceOverView;
