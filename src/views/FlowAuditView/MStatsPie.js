import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { message } from 'antd'
import MEvent from '../../rlib/utils/MEvent';
import MNumUtils from '../../rlib/utils/MNumUtils';

export default class MStatsPie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            extraParams: this.initExtraParams(),
            dataSource: this.initDataSource(),
        };

        this.handleClick = this.handleClick.bind(this);
    }

    initExtraParams() {
        let extraParams = {};
        if (!this.props.hasOwnProperty('extraParams')) {
            extraParams = {
            }
        } else {
            extraParams = this.props.extraParams;
        }

        if (!extraParams.hasOwnProperty('width')) { extraParams['width'] = 200; }

        return extraParams;
    }

    initDataSource = () => {
        let dataSource = this.props.dataSet;
        const { extraParams } = this.props;

        if (typeof (dataSource) === 'undefined') {
            // 模拟数据
            dataSource = [];
            let dataNames = ['下行', '上行'];
            for (let dataName of dataNames) {
                dataSource.push({ name: dataName, value: MNumUtils.rand(800) + 1120 });
            }
        }

        return dataSource;
    }

    getOption() {
        const { name, dataSource } = this.state;
        const { extraParams } = this.props;

        let options = {
            title: { text: name },
            // grid: {
            //     left : '10%',   //组件离容器左侧的距离
            //     right : '10%',
            //     bottom : '1%',
            //     top: 24,
            //     containLabel : true     //grid 区域是否包含坐标轴的刻度标签
            // },
            legend: {
                // type: 'scroll',
                // orient: 'vertical',
                right: 10,
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} {b}: <br/>{c} ({d}%)'
            },
            series: [{
                name: name,
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: dataSource,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };

        if (extraParams.hasOwnProperty('vertLegend') && extraParams['vertLegend']) { 
            options.legend = { type: 'scroll', orient: 'vertical', right: 10, };
            options.series[0].center = ['35%', '50%'];
        } else {
            options.legend = { right: 10, };
            options.series[0].center = ['50%', '55%'];
        }

        return options;
    }

    handleClick(param, echarts) {
        const { extraParams } = this.props;

        if (extraParams.hasOwnProperty('onClick')) {
            // message.error(param.data['name'] + ': ' + param.data['value']);
            extraParams['onClick'](param.data);
        }
    }

    render() {
        let option = this.getOption();
        let onEvents = {
            'click': this.handleClick,
        }

        return (<ReactEcharts option={option} onEvents={onEvents} />);
    }

}
