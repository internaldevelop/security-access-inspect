import SimAssets from './SimAssets';
import { DeepClone } from '../../utils/ObjUtils';

var _authResultsList = [
    // auth_result: 0--未知，1--成功，2--验签失败，3--解密失败，4--过期
    {name: '水电终端-31', ip: '192.168.1.100', auth_result: 1, auth_time: '2020-04-21 10:57:16'},
    {name: '水电终端-32', ip: '192.168.1.101', auth_result: 1, auth_time: '2020-04-21 10:57:16'},
    {name: '水电终端-33', ip: '192.168.1.102', auth_result: 2, auth_time: '2020-04-21 10:57:16'},
    {name: '水电终端-34', ip: '192.168.1.103', auth_result: 3, auth_time: '2020-04-21 10:57:16'},
    {name: '火电终端-1', ip: '192.168.1.104', auth_result: 1, auth_time: '2020-04-21 10:57:16'},
    {name: '火电终端-2', ip: '192.168.1.105', auth_result: 4, auth_time: '2020-04-21 10:57:16'},
];

class SimuAuthRecords {
    getAssetUuid(name) {
        let assets = SimAssets.allAssets();
        for (let asset of assets) {
            if (asset.name === name) {
                return asset.uuid;
            }
        }
        return '';
    }

    generateAuthsGroup(authRecords, auth_time='') {
        if (auth_time === '') {
            auth_time = '2020-04-21 10:57:16';
        }
        let startId = authRecords.length + 1;
        let dataList = _authResultsList.map((item, index) => { 
            let itemId = startId + parseInt(index); 
            let cloneItem = DeepClone(item);
            cloneItem['index'] = itemId;
            cloneItem['uuid'] = '' + itemId; 
            cloneItem['asset_uuid'] = this.getAssetUuid(item.name); 
            cloneItem['auth_time'] = auth_time; 
            return cloneItem; 
        });
        authRecords.push(...dataList);
        return;
    }

    allAuths() {
        let authRecords = [];
        for (let i=0; i<10; i++) {
            this.generateAuthsGroup(authRecords, '2020-04-' + i + ' 10:57:16');
        }
        for (let i=0; i<10; i++) {
            this.generateAuthsGroup(authRecords, '2020-04-11 ' + i + ':57:16');
        }
        return authRecords;
    }
}

export default new SimuAuthRecords();

