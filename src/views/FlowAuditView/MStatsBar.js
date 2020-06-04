import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import MEvent from '../../rlib/utils/MEvent';
import MNumUtils from '../../rlib/utils/MNumUtils';
import { message } from 'antd'

export default class MStatsBar extends Component {
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

        return extraParams;
    }

    initDataSource = () => {
        let dataSource = this.props.dataSet;

        if (typeof(dataSource) === 'undefined') {
            // 模拟数据
            dataSource = [
                ['flow', '下行', '上行'],
            ];
            for (let index = 0; index < 30; index++) {
                dataSource.push(['2020-8-' + (index + 1), MNumUtils.rand(800) + 20, MNumUtils.rand(1000) + 100])
            }
        }

        return dataSource;
    }

    getOption() {
        const { name, dataSource } = this.state;

        let options = {
            title: { text: name, left: 'center' },
            grid: {
                left : '1%',   //组件离容器左侧的距离
                right : '1%',
                bottom : '1%',
                top: 24,
                containLabel : true     //grid 区域是否包含坐标轴的刻度标签
            },
            legend: {
                // type: 'scroll',
                // orient: 'vertical',
                right: 10,
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            dataset: {
                source: dataSource
            },
            xAxis: { type: 'category' },
            yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: []
        };

        // 根据实际的数据种类，确定条带的数量
        for (let index in dataSource[0]) {
            if (index === '0')
                continue;
            options.series.push({ type: 'bar' });
        }

        return options;
    }

    handleClick(param, echarts) {
        const { extraParams } = this.props;

        if (extraParams.hasOwnProperty('onClick')) {
            // message.error(param.data[0] + ': ' + param.data[1] + ', ' + param.data[2]);
            extraParams['onClick'](param.data);
        }
    }

    render() {
        let option = this.getOption();
        let onEvents = {
            'click': this.handleClick,
        }
        return (<ReactEcharts option={option} onEvents={onEvents}/>);
    }

}
