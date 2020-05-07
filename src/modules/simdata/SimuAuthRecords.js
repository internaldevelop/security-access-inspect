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

    _addAuthDetails(record) {
        record['finger_print'] = 'YTVlNDIwOWU4NDEzMjFhZTcwNmVlODRiOTRiMzgwODhhMThhY2M3NjQzMjUwZTRiYjBhZjU0M2M5ZDc1OTlhMDg1NGM4ZTA4YzIyODNlYzBlZTMzODgwNmNjYTE3MTIwNjM0MGE1MTBjNWM0MDZiZWI2ZWMzYjZmMTgxNTBjNGI=';
        record['signature'] = 'NWYyOGYyNGY1NTIwMjMwZmQxZTY2ZWE2YWM2NDllOWY5NjM3NTE1ZjUxNmIyZWY3NGZjOTA2MjJiNjBmMTY1ZWFmY2E4ZjM0ZGI4NDcxYjg1YjliNGEyY2RmNzJmNzUwOTlhZTBlYjg4NjBjNGYzMzkyNTIyNjE3NzhkNDA2ZWI1ZjI4ZjI0ZjU1MjAyMzBmZDFlNjZlYTZhYzY0OWU5Zjk2Mzc1MTVmNTE2YjJlZjc0ZmM5MDYyMmI2MGYxNjVlYWZjYThmMzRkYjg0NzFiODViOWI0YTJjZGY3MmY3NTA5OWFlMGViODg2MGM0ZjMzOTI1MjI2MTc3OGQ0MDZlYg==';
        record['pub_key'] = 'MzE2M2E4ZDZhNDU0MGVjZjE3OTRlY2UwMjQ1ZjI5MTE1NGQzMGUxMDgwMzU5ZDJlOTk0ZWY3OWMxYTQ2OWFhMGNkODA4NzY5ZDljN2VlMzBjYTM0MmM2ODAzZDJlYmNlYzNlYjcxYTkyOGQ2ZGIxODdkZmIxZmMyY2Y2NDAzOTUzMTYzYThkNmE0NTQwZWNmMTc5NGVjZTAyNDVmMjkxMTU0ZDMwZTEwODAzNTlkMmU5OTRlZjc5YzFhNDY5YWEwY2Q4MDg3NjlkOWM3ZWUzMGNhMzQyYzY4MDNkMmViY2VjM2ViNzFhOTI4ZDZkYjE4N2RmYjFmYzJjZjY0MDM5NQ==';
        record['cipher_text'] = 'NWYyOGYyNGY1NTIwMjMwZmQxZTY2ZWE2YWM2NDllOWY5NjM3NTE1ZjUxNmIyZWY3NGZjOTA2MjJiNjBmMTY1ZWFmY2E4ZjM0ZGI4NDcxYjg1YjliNGEyY2RmNzJmNzUwOTlhZTBlYjg4NjBjNGYzMzkyNTIyNjE3NzhkNDA2ZWI=';
        record['plain_text'] = '终端名称：termianl-1\n终端OS：Linux\n系统版本：V2.3.9.22\n。。。\n。。。\n认证时间：2020-04-04 12:59:01';
    }

    getAuthRecord(authUuid) {
        let authList = this.allAuths();
        for (let record of authList) {
            if (record.uuid === authUuid) {
                this._addAuthDetails(record);
                return record;
            }
        }
        return {};
    }
}

export default new SimuAuthRecords();

