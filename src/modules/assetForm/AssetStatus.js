// export class AssetStatus {
//     var BLACK_LIST = '黑名单';

//     function getCategories() {

//     }
// }

const assetClassStr = ['未审核', '白名单', '黑名单'];
export const AssetClass = {
    NOT_ASSIGN: 0,      // 未审核
    WHITE_LIST: 1,      // 白名单
    BLACK_LIST: 2,      // 黑名单
};

const assetStatusStr = ['离线', '在线'];
export const AssetStatus = {
    OFF_LINE: 0,        // 离线
    ON_LINE: 1,         // 在线
};

export function getAssetStatusMeaning(assetStatus) {
    return assetStatusStr[assetStatus];
}

export function getAssetClassMeaning(assetClass) {
    return assetClassStr[assetClass];
}

export function getAssetCategories() {
    let categories = [];
    for (let assetClass of assetClassStr) {
        for (let assetStatus of assetStatusStr) {
            categories.push(assetClass + '-' + assetStatus);
        }
    }
    return categories;
}

export function getCateIndex(assetClass, assetStatus) {
    return assetClass * assetStatusStr.length + assetStatus;
}

export function getCateIndexByClass(assetClass) {
    let indexList = [assetClass * assetStatusStr.length + AssetStatus.OFF_LINE,
        assetClass * assetStatusStr.length + AssetStatus.ON_LINE];
    return indexList;
}

export function getCateIndexByStatus(assetStatus) {
    let indexList = [];
    for (let index in assetClassStr) {
        let assetClass = index;
        indexList.push(assetClass * assetStatusStr.length + assetStatus);
    }
    return indexList;
}

export function getAssetClass(cateIndex) {
    let assetClass = Math.floor(cateIndex / assetStatusStr.length);
    return assetClass;
}

export function getAssetStatus(cateIndex) {
    let assetStatus = cateIndex % assetStatusStr.length;
    return assetStatus;
}

// export function getCateIndexByClassAndStatus(assetStatus) {
//     let indexList = [];
//     for (let index in assetClassStr) {
//         let assetClass = index;
//         indexList.push(assetClass * assetStatusStr.length + assetStatus);
//     }
//     return indexList;
// }
