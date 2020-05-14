import MNumUtils from '../../rlib/utils/MNumUtils'

var _packsList = [
    //{ parse_time: '11:31:22', source_ip: '192.168.1.2', dest_ip: '192.168.1.2', direction: 'IN' },
];

var _def = {
    LOCAL: '192.168.1.100',
    TRANS_P: ['TCP', 'UDP', 'ICMP', 'ARP'],
    APP_P: ['MODBUS', 'S7', 'IEC-104', 'Profinet', '--', '--', '--'],
    PORT: ['80', '502', '39461', '39460', '39459', '102', '138', '137', '67', '6001'],
}

class SimNetPackets {
    constructor(props) {

    }

    randIP() {
        return '192.168.1.' + (MNumUtils.rand(50) + 20);
    }
    
    randTime() {
        return '11:31:' + (MNumUtils.rand(60));
    }

    randDirection() {
        let direction = MNumUtils.rand(2);
        return (direction === 1 ? 'IN' : 'OUT');
    }

    _randElemnt(name) {
        let count = _def[name].length;
        let index = MNumUtils.rand(count);
        return _def[name][index];
    }

    randTransP() {
        return this._randElemnt('TRANS_P');
    }

    randAppP() {
        return this._randElemnt('APP_P');
    }

    randPort() {
        return this._randElemnt('PORT');
    }

    allPackets() {
        if (!global.simuData) {
            return [];
        }
        
        _packsList = [];
        for (let index=0; index < 100; index++ ) {
            let pack = {
                index: index + 1,
                parse_time: this.randTime(),
                direction: this.randDirection(),
                transport_protocol: this.randTransP(),
                app_protocol: this.randAppP(),
                source_port: this.randPort(),
                dest_port: this.randPort(),
            }

            if (pack['direction'] === 'IN') {
                pack['source_ip'] = this.randIP();
                pack['dest_ip'] = _def['LOCAL'];
            } else {
                pack['source_ip'] = _def['LOCAL'];
                pack['dest_ip'] = this.randIP();
            }

            _packsList.push(pack);
        }

        return _packsList;
    }
}

export default new SimNetPackets();
