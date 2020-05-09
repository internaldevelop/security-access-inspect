import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import MTimeUtils from '../utils/MTimeUtils';
import MEvent from '../utils/MEvent';

var MAX_COUNT = 60;
var TIME_GAP = 3000;

export default class MLineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            extraParams: this.initExtraParams(),
            dataSource: this.initDataSource(),
        };

        this.handleUpdateData = this.handleUpdateData.bind(this);
    }

    componentDidMount() {
        // 注册事件
        const { extraParams } = this.state;
        if (extraParams.hasOwnProperty('updateEvent')) {
            MEvent.register(extraParams.updateEvent, this.handleUpdateData);
        }
    }

    componentWillUnmount() {
        // 注销事件
        const { extraParams } = this.state;
        if (extraParams.hasOwnProperty('updateEvent')) {
            MEvent.unregister(extraParams.updateEvent, this.handleUpdateData);
        }
    }

    handleUpdateData(usage) {
        const { dataSource } = this.state;
        this.pushNewUsage(dataSource, usage.time, usage.data);
        this.setState({ dataSource });
    }

    initExtraParams() {
        let extraParams = {};
        if (!this.props.hasOwnProperty('extraParams')) {
            extraParams = {
                lineNames: ['折线']
            }
        } else {
            extraParams = this.props.extraParams;
        }

        if (!extraParams.hasOwnProperty('lineNames')) { extraParams['lineNames'] = ['折线']; }

        return extraParams;
    }

    initDataSource = () => {
        const { extraParams } = this.props;
        let dataSource = [];
        dataSource.push(['time']);
        for (let index = 0; index < extraParams.lineNames.length; index++) {
            dataSource.push([extraParams.lineNames[index]]);
        }

        if (!this.props.hasOwnProperty('usagesList')) {
            return dataSource;
        }

        for (let usage of this.props.usagesList) {
            this.pushNewUsage(dataSource, usage.time, usage.data);
        }
        for (let index in dataSource) {
            let series = dataSource[index];
        }

        return dataSource;
    }

    formatTime(tm) {
        return MTimeUtils.formatStr(tm, 'hh:mm:ss');
    }

    pushNewUsage = (dataSource, timeStr, data) => {
        const { extraParams } = this.props;
        let tm = MTimeUtils.parse(timeStr);
        dataSource[0].push(this.formatTime(tm));
        if (dataSource[0].length > MAX_COUNT) {
            dataSource[0].shift();
        }

        for (let index = 0; index < extraParams.lineNames.length; index++) {
            let series = dataSource[index + 1];
            series.push(data[index]);
            if (series.length > MAX_COUNT) {
                series.shift();
            }
        }
    }

    getOption(dataSource) {
        const { name, extraParams } = this.state;

        let options = {
            tooltip: {
                trigger: 'axis',
                showContent: true,
                alwaysShowContent: true,
                axisPointer: { type: 'cross' },
            },
            legend: [{
                // selectedMode: 'single',
                data: extraParams.lineNames.map(item => item)
            }],
            grid : {
                left : '1%',   //组件离容器左侧的距离
                right : '1%',
                bottom : '1%',
                top: '10%',
                height: 120,
                containLabel : true     //grid 区域是否包含坐标轴的刻度标签
            },
            dataset: { source: dataSource },
            xAxis: {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    formatter: function (value) {
                        return value;
                    }
                }
            },
            yAxis: { name: name, },
            // grid: { top: '55%' },
            series: [],
        };

        // for (let index = 0; index < extraParams.lineNames.length; index++) {
        for (let lineName of extraParams.lineNames) {
            options.series.push({
                type: 'line', smooth: true,
                seriesLayoutBy: 'row',
                // symbol: 'none',
                // encode: {
                //     // Map the "value" column to Y axis.
                //     y: lineName,
                //     // Map the "time" column to X axis
                //     x: 'time'
                // },
            });
        }

        return options;
    }

    render() {
        const { dataSource } = this.state;
        let option = this.getOption(dataSource);
        return (
            <ReactEcharts option={option} />
        );
    }

}
