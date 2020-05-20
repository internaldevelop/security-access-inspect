import React from 'react'
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import MEvent from '../../rlib/utils/MEvent';
import MStatCardV3 from '../../rlib/antdComponents/MStatCardV3';
import PerformMonitorView from './PerformMonitorView';
import SimAssets from '../../modules/simdata/SimAssets';
import MTimeUtils from '../../rlib/utils/MTimeUtils';
import MNumUtils from '../../rlib/utils/MNumUtils';
import RestReq from '../../utils/RestReq';
import { OpenSocket, CloseSocket } from '../../utils/WebSocket';
import { sockMsgType } from '../../global/enumeration/SockMsgType'

let l_timer3S = undefined;    // 3秒的定时器
let l_socket = null;


class PerformanceOverView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assets: SimAssets.allAssets(),
            stats: this.initAssetStats(),
            hasStats: false,
        };

        this.queryAssets();

        this.queryStats();

        // this.startSimulateTimer();
        this.processAssetRealTimeInfo = this.processAssetRealTimeInfo.bind(this);
    }

    queryAssetsCB = (response) => {
        let data = response.payload.data;
        if (typeof (data) === 'undefined') {
            return;
        }

        let assetsList = data.map((item) => { return { uuid: item.uuid, classify: item.classify, name: item.name, onLine: parseInt(item.on_line) }; });
        this.setState({ assets: assetsList });
    }

    queryAssets() {
        // flag: 1, 表示不需要返回指纹信息
        RestReq.asyncGet(this.queryAssetsCB, '/embed-terminal/assets/get-assets', { flag: '' + 1 });
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
                data: [MNumUtils.rand(10) + 20, MNumUtils.rand(30) + 20]
            }
            MEvent.send('NET_' + assets[index].uuid, netUsage);

            let memPercent = MNumUtils.rand(80) + 20;
            MEvent.send('MEMORY_' + assets[index].uuid, memPercent / 100.0);
            let diskPercent = MNumUtils.rand(100);
            MEvent.send('DISK_' + assets[index].uuid, diskPercent / 100.0);
        }
    }

    startSimulateTimer = () => {
        // 开启3秒的定时器
        l_timer3S = setInterval(() => this.timer3sProcess(), 3000);
    }

    queryStatsCB = (response) => {
        const { stats } = this.state;
        let data = response.payload;
        // 终端总数
        stats[0].value = data.all_num;
        // 白名单
        stats[1].value = data.white_list_num;
        // 黑名单
        stats[2].value = data.blacklist_num;
        // 在线
        stats[3].value = data.on_line_num;
        // 认证成功
        stats[4].value = data.auth_num;
        // 认证失败
        stats[5].value = data.unprocessed_num;

        this.setState({ stats, hasStats: true });
    }

    queryStats() {
        RestReq.asyncGet(this.queryStatsCB, '/embed-terminal/assets/get-statistics', {}, { token: false });
    }

    initAssetStats() {
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
        l_socket = OpenSocket('asset_info', this.processAssetRealTimeInfo);
    }

    componentWillUnmount() {
        if (l_timer3S !== undefined)
            clearInterval(l_timer3S);

        CloseSocket(l_socket);
    }

    processAssetNetFlowInfo(asset, netInfo) {
        if (!asset.hasOwnProperty('hasLastNetInfo')) {
            asset['last_pack_recv'] = -1;
            asset['last_pack_sent'] = -1;
            asset['last_time_stamp'] = 1;
            asset['hasLastNetInfo'] = true;
        }
        // let asset_uuid = '';
        // let lastPacketsRecv = -1;
        // let lastPacketsSent = -1;
        // let lastTimeStamp = 1;

        let packetsRecv = netInfo.packetsRecv;
        let packetsSent = netInfo.packetsSent;
        let timeStamp = netInfo.timeStamp;

        if (asset['last_pack_recv'] < 0) {
            asset['last_pack_recv'] = packetsRecv;
        }
        if (asset['last_pack_sent'] < 0) {
            asset['last_pack_sent'] = packetsSent;
        }

        let recvSpeed = (packetsRecv - asset['last_pack_recv']) * 1000.0 / (timeStamp - asset['last_time_stamp']);
        recvSpeed = MNumUtils.fixed(recvSpeed);
        let sentSpeed = (packetsSent - asset['last_pack_sent']) * 1000.0 / (timeStamp - asset['last_time_stamp']);
        sentSpeed = MNumUtils.fixed(sentSpeed);
        let netUsage = {
            time: MTimeUtils.now(),
            data: [recvSpeed, sentSpeed]
        }
        MEvent.send('NET_' + asset.uuid, netUsage);

        asset['last_pack_recv'] = packetsRecv;
        asset['last_pack_sent'] = packetsSent;
        asset['last_time_stamp'] = timeStamp;

        // this.setState({lastPacketsRecv: packetsRecv, lastPacketsSent: packetsSent, lastTimeStamp: timeStamp});
    }

    processAssetRealTimeInfo(data) {
        const { assets, lastNetInfoList } = this.state;

        // WebSocket 推送的实时信息是 JSON 字符串格式
        let message = JSON.parse(data);
        // 检查消息类型
        // if (message.type !== sockMsgType.ASSET_REAL_TIME_INFO)
        if (message.type !== sockMsgType.SINGLE_TASK_RUN_INFO)
            return;

        // 从资产 UUID 获取资产对象
        let assetInfo = message.payload;
        let asset = this.findAsset(assetInfo.asset_uuid);
        if (asset === null)
            return;
        
        // CPU 占用率
        let cpuUsage = {
            time: MTimeUtils.now(),
            data: MNumUtils.fixed(assetInfo.CPU.usedPercentTotal),
        }
        asset['cpu_usage'] = cpuUsage;
        MEvent.send('CPU_' + asset.uuid, cpuUsage);

        // 内存 占用率
        let memPercent = assetInfo.Memory.usedPercentTotal / 100.0;
        // memPercent = MNumUtils.fixed(memPercent, 4);
        asset['mem_usage'] = memPercent;
        MEvent.send('MEMORY_' + asset.uuid, memPercent);

        // 磁盘占用率
        let diskPercent = assetInfo.Disks.usedPercentTotal / 100.0; 
        asset['disk_usage'] = diskPercent;
        MEvent.send('DISK_' + asset.uuid, diskPercent);

        // 网络包收发速度
        this.processAssetNetFlowInfo(asset, assetInfo.NewworkObj);

        this.setState({ assets });
    }

    findAsset(assetUuid) {
        for (let asset of this.state.assets) {
            if (asset.uuid === assetUuid) {
                return asset;
            }
        }
        return null;
    }

    renderMonitorView() {
        const { assets } = this.state;
        let comps = [];
        for (let asset of assets) {
            if (asset.onLine) {
                comps.push(<Col span={12}> <PerformMonitorView title={asset.name} uuid={asset.uuid} /> </Col>);
            }
        }
        return comps;
    }

    render() {
        const { stats, hasStats } = this.state;
        let statSpan = 24 / stats.length;
        return (
            <div>
                <Row gutter={20} style={{ marginBottom: 24 }}>
                    {stats.map((stat) => (<Col span={statSpan}>
                        {hasStats && <MStatCardV3 myparams={stat} />}
                    </Col>))}
                </Row>
                <Row gutter={24} >
                    <div style={{ overflow: 'scroll', minWidth: 800, height: 850 }}>
                        {this.renderMonitorView()}
                        {/* {assets.map((asset, index) => (<Col span={12}>
                            <PerformMonitorView title={asset.name} uuid={asset.uuid}/>
                        </Col>))} */}
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
