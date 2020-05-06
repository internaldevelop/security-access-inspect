import { AssetClass, AssetStatus, getAssetCategories, getCateIndex, getCateIndexByClass, getCateIndexByStatus } from '../../modules/assetForm/AssetStatus'

const _UNASSIGN = AssetClass.NOT_ASSIGN;
const _WHITE = AssetClass.WHITE_LIST;
const _BLACK = AssetClass.BLACK_LIST;
const _ON = AssetStatus.ON_LINE;
const _OFF = AssetStatus.OFF_LINE;

var _assetsList = [
    {name: '水电终端-41', cls: _UNASSIGN, status: _OFF},
    {name: '水电终端-42', cls: _UNASSIGN, status: _OFF},
    {name: '火电终端-43', cls: _UNASSIGN, status: _OFF},
    {name: '水电终端-51', cls: _UNASSIGN, status: _ON},
    {name: '水电终端-52', cls: _UNASSIGN, status: _ON},
    {name: '水电终端-53', cls: _UNASSIGN, status: _ON},
    {name: '配电终端-1', cls: _WHITE, status: _OFF},
    {name: '变电终端-1', cls: _WHITE, status: _OFF},
    {name: '变电终端-2', cls: _WHITE, status: _OFF},
    {name: '变电终端-3', cls: _WHITE, status: _OFF},
    {name: '变电终端-4', cls: _WHITE, status: _OFF},
    {name: '风电终端-1', cls: _WHITE, status: _OFF},
    {name: '风电终端-2', cls: _WHITE, status: _OFF},
    {name: '火电终端-1', cls: _WHITE, status: _ON},
    {name: '火电终端-2', cls: _WHITE, status: _ON},
    {name: '火电终端-3', cls: _WHITE, status: _ON},
    {name: '火电终端-4', cls: _WHITE, status: _ON},
    {name: '水电终端-11', cls: _BLACK, status: _OFF},
    {name: '水电终端-12', cls: _BLACK, status: _OFF},
    {name: '水电终端-13', cls: _BLACK, status: _OFF},
    {name: '水电终端-31', cls: _BLACK, status: _ON},
    {name: '水电终端-32', cls: _BLACK, status: _ON},
    {name: '水电终端-33', cls: _BLACK, status: _ON},
    {name: '水电终端-34', cls: _BLACK, status: _ON},
];

class SimAssets {
    constructor(props) {

    }

    allAssets() {
        return _assetsList.map((item, index) => { 
            item['uuid'] = index; 
            return item; 
        });
    }


}

export default new SimAssets();
