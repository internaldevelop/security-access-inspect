import { AssetClass, AssetStatus, getAssetCategories, getCateIndex, getCateIndexByClass, getCateIndexByStatus } from '../../modules/assetForm/AssetStatus';
import MArrayUtils from '../../rlib/utils/MArrayUtils';
import SimAssets from '../../modules/simdata/SimAssets';

var options = {
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            return [params.name];
        }
    },
    // animationDurationUpdate: 1500,
    // animationEasingUpdate: 'quinticInOut',
    label: {
        normal: {
            show: true,
            textStyle: {
                fontSize: 12
            },
        }
    },
    legend: {
        x: "center",
        show: true,
        // data: ["白名单-在线", "白名单-离线", "黑名单-在线", "黑名单-离线", '待审核-在线', "白名单-离线", ]
        data: [],
        selected: {},
        selectedMode: 'multiple',
    },
    series: [
        {
            type: 'graph',
            layout: 'circular',
            // draggable: true,
            symbolSize: 45,
            focusNodeAdjacency: true,
            roam: true,
            categories: [],
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        fontSize: 10
                    },
                }
            },
            force: {
                // initLayout: 'circular',
                repulsion: [200, 1500],
                // edgeLength: [10, 200],
                layoutAnimation: true,
            },
            edgeSymbolSize: [4, 50],
            edgeLabel: {
                normal: {
                    show: true,
                    textStyle: {
                        fontSize: 10
                    },
                    formatter: "{c}"
                }
            },
            itemStyle: {
                borderColor: '#fff',
                borderWidth: 1,
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.3)'
            },
            data: [{
                name: '接入认证服务器',
                // draggable: true,
            },],
            links: [],
            lineStyle: {
                normal: {
                    opacity: 0.9,
                    width: 1,
                    curveness: 0.2,
                    color: 'target',
                }
            },
            emphasis: {
                lineStyle: {
                    width: 5
                }
            }
        }
    ]
};

function _initOptions(options) {
    // let categories = [['白名单-在线', '#009800', 30], ['白名单-离线', '#b9f6ca', 15], ['黑名单-在线', '#101010', 30], ['黑名单-离线', '#909090', 20], 
    //                 ['待审核-在线', '#4592FF', 50], ['待审核-离线', '#80d8ff', 40]];
    // let catsParams = [['白名单-在线', '#009800', 30], ['白名单-离线', '#52c41a', 15], ['黑名单-在线', '#101010', 30], ['黑名单-离线', '#606060', 20],
    // ['待审核-在线', '#ff4d4f', 60], ['待审核-离线', '#ff7875', 40]];
    let catsParams = [['#ff7875', 40], ['#ff4d4f', 60], ['#52c41a', 15], ['#009800', 30], ['#606060', 20], ['#101010', 30]];
    let legendData = options.legend.data;
    let seriCats = options.series[0].categories;
    let seriesData = options.series[0].data;
    let seriesLinks = options.series[0].links;

    legendData.splice(0, legendData.length);
    seriCats.splice(0, seriCats.length);
    seriesData.splice(0, seriesData.length);
    seriesData.push({ name: '接入认证服务器', x: 30, y: 30, itemStyle: { color: '#0050b3' } });
    // seriesData.push({ name: '接入认证服务器', itemStyle: { color: '#0050b3' }});
    seriesLinks.splice(0, seriesLinks.length);

    let categories = getAssetCategories();
    for (let index in categories) {
        let category = categories[index];
        legendData.push(category);
        seriCats.push({
            name: category,
            symbolSize: catsParams[index][1],
            // fixed: true, 
            itemStyle: { normal: { color: catsParams[index][0], } },
            label: { show: false }
        });
    }
}

function _addSimulateAssets(options) {
    let seriesData = options.series[0].data;
    let seriesLinks = options.series[0].links;
    let assetsList = SimAssets.allAssets();

    for (let index in assetsList) {
        let asset = assetsList[index];
        let category = getCateIndex(asset.cls, asset.status);

        let totalCount = seriesData.push({ name: asset.name, category: category, value: '' + 100 * category + index });
        seriesLinks.push({
            source: 0,
            target: totalCount - 1,
            category: category,
            value: ''
        });
    }
}

function _addSimulateAssets2(options, edgesNameList, assetClass, assetStatus) {
    let seriesData = options.series[0].data;
    let seriesLinks = options.series[0].links;

    let category = getCateIndex(assetClass, assetStatus);

    for (let index in edgesNameList) {
        let edgeName = edgesNameList[index];
        let totalCount = seriesData.push({ name: edgeName, category: category, value: '' + 100 * category + index });
        seriesLinks.push({
            source: 0,
            target: totalCount - 1,
            category: category,
            value: ''
        });
    }
}

function selectCats(options, catsList) {
    let selected = options.legend.selected;
    let categories = getAssetCategories();
    for (let index in categories) {
        index = parseInt(index)
        let category = categories[index];
        selected[category] = MArrayUtils.contains(catsList, index);
    }
}

function selectAssectClassAndStatus(options, assetClass, assetStatus) {
    let catsList = [getCateIndex(assetClass, assetStatus)];
    selectCats(options, catsList);
}

function selectAssectClass(options, assetClass) {
    let catsList = getCateIndexByClass(assetClass);
    selectCats(options, catsList);
}

function selectAssectStatus(options, assetStatus) {
    let catsList = getCateIndexByStatus(assetStatus);
    selectCats(options, catsList);
}

export function getSimulateOptions(assetClass, assetStatus) {
    console.log(`assetClass ${assetClass}\t\tassetStatus ${assetStatus}`);
    _initOptions(options);

    // selectAssectClass(options, AssetClass.WHITE_LIST);
    // 筛选
    if (assetStatus !== null) {
        if (assetClass !== null) {
            selectAssectClassAndStatus(options, assetClass, assetStatus);
        } else {
            selectAssectStatus(options, assetStatus);
        }
    } else if (assetClass !== null) {
        selectAssectClass(options, assetClass);
    } else {
        let catsList = getAssetCategories().map((item, index) => index);
        selectCats(options, catsList);
    }
    // if (assetClass === 0) {
    //     selectAssectClass(options, AssetClass.NOT_ASSIGN);
    // } else {
    //     selectAssectClass(options, AssetClass.WHITE_LIST);
    // }


    _addSimulateAssets(options);

    return options;

}

function _addAsset(options, asset) {
    let seriesData = options.series[0].data;
    let seriesLinks = options.series[0].links;

    // classify: 0/1/2，对应黑白名单等
    let assetClass = asset.classify;

    // TODO: 接口未返回，暂时设定为在线
    let assetStatus = AssetStatus.ON_LINE;

    let category = getCateIndex(assetClass, assetStatus);

    // graph 中添加 edge
    let totalCount = seriesData.push({ name: asset.name, category: category, value: asset.uuid });
    // graph 中添加 path
    seriesLinks.push({
        source: 0,
        target: totalCount - 1,
        category: category,
        value: ''
    });
}


export function getGraphOptions(assetsList, assetClass, assetStatus) {
    getSimulateOptions(assetClass, assetStatus);
    for (let asset of assetsList) {
        _addAsset(options, asset);
    }
    return options;
}

// export default {
//     title: {
//         text: ''
//     },
//     tooltip: {},
//     animationDurationUpdate: 1500,
//     animationEasingUpdate: 'quinticInOut',
//     label: {
//         normal: {
//             show: true,
//             textStyle: {
//                 fontSize: 12
//             },
//         }
//     },
//     legend: {
//         x: "center",
//         show: true,
//         data: ["白名单", "黑名单", '新设备']
//     },
//     series: [
//         {
//             type: 'graph',
//             layout: 'force',
//             symbolSize: 45,
//             focusNodeAdjacency: true,
//             roam: true,
//             categories: [{
//                 name: '白名单',
//                 itemStyle: {
//                     normal: {
//                         color: "#009800",
//                     }
//                 }
//             }, {
//                 name: '黑名单',
//                 itemStyle: {
//                     normal: {
//                         color: "#101010",
//                     }
//                 }
//             }, {
//                 name: '新设备',
//                 itemStyle: {
//                     normal: {
//                         color: "#4592FF",
//                     }
//                 }
//             }],
//             label: {
//                 normal: {
//                     show: true,
//                     textStyle: {
//                         fontSize: 12
//                     },
//                 }
//             },
//             force: {
//                 repulsion: 2000
//             },
//             edgeSymbolSize: [4, 50],
//             edgeLabel: {
//                 normal: {
//                     show: true,
//                     textStyle: {
//                         fontSize: 10
//                     },
//                     formatter: "{c}"
//                 }
//             },
//             data: [{
//                 name: '接入认证服务器',
//                 // draggable: true,
//             }, {
//                 name: '配电终端-1', '变电终端-1', 变电终端-2', '变电终端-3', '变电终端-4', '风电终端-1', '风电终端-2', 
//                 category: 2,
//                 // draggable: true,
//             }, {
//                 name: '变电终端-1',
//                 category: 0,
//                 // draggable: true,
//             }, {
//                 name: '变电终端-2',
//                 category: 0,
//                 // draggable: true,
//             }, {
//                 name: '变电终端-3',
//                 category: 1,
//                 // draggable: true,
//             }, {
//                 name: '风电终端-1',
//                 category: 1,
//                 // draggable: true,
//             }, {
//                 name: '火电终端-1',
//                 category: 2,
//                 // draggable: true,
//             }, {
//                 name: '火电终端-3',
//                 category: 2,
//                 // draggable: true,
//             }],
//             links: [{
//                 source: 0,
//                 target: 1,
//                 category: 0,
//                 value: ''
//             }, {
//                 source: 0,
//                 target: 2,
//                 value: ''
//             }, {
//                 source: 0,
//                 target: 3,
//                 value: ''
//             }, {
//                 source: 0,
//                 target: 4,
//                 value: ''
//             }, {
//                 source: 0,
//                 target: 5,
//                 value: ''
//             }, {
//                 source: 0,
//                 target: 6,
//                 value: ''
//             }, {
//                 source: 0,
//                 target: 7,
//                 value: ''
//             }],
//             lineStyle: {
//                 normal: {
//                     opacity: 0.9,
//                     width: 2,
//                     curveness: 0.3,
//                     color: 'target',
//                 }
//             },
//             emphasis: {
//                 lineStyle: {
//                     width: 5
//                 }
//             }
//         }
//     ]
// }