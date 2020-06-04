import MNumUtils from '../../rlib/utils/MNumUtils';

class SimNetStats {
    simAssetRandPackets(index) {
        let asset_ip = '192.168.1.' + (index);
        let name = 'Sim终端-' + index;
        let value = MNumUtils.rand(800) + 200;

        return { name, value, asset_ip, asset_uuid: asset_ip };
    }

    fetchVirtualStats() {
        let stats = {};
        let start = 11;
        let end = 24;

        // 用于接收发送百分比的饼图
        stats['netIOTotal'] = [{ name: '接收', value: MNumUtils.rand(800) + 1120 }, { name: '发送', value: MNumUtils.rand(800) + 1120 }];

        // 用于饼图中各资产发送包数占比
        let outIPTotal = [];
        for (let index = start; index <= end; index++) {
            outIPTotal.push(this.simAssetRandPackets(index));
        }
        stats['outIPTotal'] = outIPTotal;

        // 用于饼图中各资产接收包数占比
        let inIPTotal = [];
        for (let index = start; index <= end; index++) {
            inIPTotal.push(this.simAssetRandPackets(index));
        }
        stats['inIPTotal'] = inIPTotal;

        // 用于条形图中每天的接收发送包数
        let dayStat = [['flow', '接收（每日）', '发送（每日）'],];
        for (let index = 1; index <= 30; index++) {
            dayStat.push(['2020-8-' + index, MNumUtils.rand(800) + 20, MNumUtils.rand(1000) + 100]);
        }
        stats['dayStat'] = dayStat;

        // 用于条形图中各资产的接收发送包数
        let ipStat = [['flow', '接收', '发送'],];
        for (let index = start; index <= end; index++) {
            let asset = this.simAssetRandPackets(index);
            // ipStat.push([asset.name, ]);
            ipStat.push([asset.name, MNumUtils.rand(800) + 20, MNumUtils.rand(1000) + 100, asset.asset_ip, asset.asset_uuid] )
        }
        stats['ipStat'] = ipStat;

        return stats;
    }
}

export default new SimNetStats();
