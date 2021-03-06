import React, { Component } from 'react';
import { Table, Modal, Button } from 'antd'
import Draggable from 'react-draggable';
import AntdDraggableModal from 'antd-draggable-modal';
import MEvent from '../../rlib/utils/MEvent';
import { WindowsFill } from '@ant-design/icons';
import MAntdTable from '../../rlib/props/MAntdTable';
import withStyles from '@material-ui/core/styles/withStyles';
import SimNetPackets from '../../modules/simdata/SimNetPackets';
import RestReq from '../../utils/RestReq';

const { confirm } = Modal;

function tableColumns() {
    let colsList = [
        { title: '序号', width: 100, dataIndex: 'index' },
        { title: '时间', width: 200, dataIndex: 'parse_time', myNoWrap: true, },
        { title: '源IP', width: 160, dataIndex: 'source_ip', myNoWrap: true, },
        { title: '源端口', width: 100, dataIndex: 'source_port', },
        { title: '目的IP', width: 160, dataIndex: 'dest_ip', myNoWrap: true, },
        { title: '目的端口', width: 120, dataIndex: 'dest_port', },
        { title: '方向', width: 100, dataIndex: 'direction', },
        { title: '传输协议', width: 120, dataIndex: 'transport_protocol', },
        { title: '应用协议', width: 150, dataIndex: 'app_protocol', },
    ];

    // 按照各列的定义构建列元素
    MAntdTable.buildColumns(colsList);

    return colsList;
}

const styles = theme => ({
    clickRow: {
        backgroundColor: '#bae7ff',
    },
});

class FlowPackTable extends React.Component {
    constructor(props) {
        super(props);

        let visible = false;
        if (this.props.hasOwnProperty('visible')) {
            visible = this.props.visible
        }

        this.state = {
            assetUuid: '1',
            visible: visible,
            asset: {},
            columns: tableColumns(),
            dataSource: SimNetPackets.allPackets(),
            pageSize: 10,
            currentPage: 1,     // Table中当前页码（从 1 开始）
            selectRowIndex: -1,
            totalRecords: 0,
        };

        this.handleFetchAssetPacks = this.handleFetchAssetPacks.bind(this);
        this.showTable = this.showTable.bind(this);
        this.hideTable = this.hideTable.bind(this);
        this.setRowClassName = this.setRowClassName.bind(this);
    }

    // allPackets() {
    //     if (!global.simuData) {
    //         return [];
    //     }

    //     _packsList = [];
    //     for (let index=0; index < 100; index++ ) {
    //         let pack = {
    //             index: index + 1,
    //             parse_time: this.randTime(),
    //             direction: this.randDirection(),
    //             transport_protocol: this.randTransP(),
    //             app_protocol: this.randAppP(),
    //             source_port: this.randPort(),
    //             dest_port: this.randPort(),
    //         }

    //         if (pack['direction'] === 'IN') {
    //             pack['source_ip'] = this.randIP();
    //             pack['dest_ip'] = _def['LOCAL'];
    //         } else {
    //             pack['source_ip'] = _def['LOCAL'];
    //             pack['dest_ip'] = this.randIP();
    //         }

    //         _packsList.push(pack);
    //     }

    //     return _packsList;
    // }

    fetchAssetPacksCB = (response) => {
        let packsList = [];
        let records = response.payload.data;
        for (let index in records) {
            let record = records[index];
            let pack = {
                index: parseInt(index) + 1,
                parse_time: record.create_time,
                direction: record.direction === '1' ? 'OUT' : 'IN',
                transport_protocol: record.transport_protocol,
                app_protocol: record.app_protocol === null ? '' : record.app_protocol,
                source_ip: record.source_ip,
                source_port: record.source_port,
                dest_ip: record.dest_ip,
                dest_port: record.dest_port,
            }
            packsList.push(pack);
        }

        let totalRecords = response.payload.totalResults;

        this.setState({ dataSource: packsList, totalRecords });
        this.showTable();
    }

    handleFetchAssetPacks(asset_uuid) {
        const { currentPage, pageSize } = this.state;
        RestReq.asyncGet(this.fetchAssetPacksCB, '/embed-terminal/network/packet/get-datas', {asset_uuid, page_num: currentPage, page_size: pageSize}, { token: false });
        // this.showTable();
        this.setState({assetUuid: asset_uuid});
    }

    componentDidMount() {
        MEvent.register('my_fetch_asset_packs', this.handleFetchAssetPacks);
    }

    componentWillUnmount() {
        MEvent.unregister('my_fetch_asset_packs', this.handleFetchAssetPacks);
    }

    showTable() {
        this.setState({ visible: true });
    }

    hideTable() {
        this.setState({ visible: false });
    }

    setRowClassName = (record) => {
        const { classes } = this.props;
        const { selectRowIndex } = this.state;
        return (selectRowIndex === record.index) ? classes.clickRow : '';
    }

    /** 处理页面变化（页面跳转/切换/每页记录数变化） */
    handlePageChange = (currentPage, pageSize) => {
        const { assetUuid } = this.state;
        this.setState({ currentPage, pageSize });
        RestReq.asyncGet(this.fetchAssetPacksCB, '/embed-terminal/network/packet/get-datas', {asset_uuid: assetUuid, page_num: currentPage, page_size: pageSize}, { token: false });
    }

    render() {
        const { visible, dataSource, columns, currentPage, totalRecords } = this.state;
        let self = this;
        let pagination = MAntdTable.pagination(self.handlePageChange);
        pagination.page = currentPage;
        pagination.total = totalRecords;
        // return (<Draggable>
        //     <div style={{ top: 20}}>I can now be moved around!</div>
        //   </Draggable>);
        return (<div>
            {visible && (
                <AntdDraggableModal
                    title="流量包解析"
                    visible={visible}
                    width={1200}
                    style={{ top: 20 }}
                    closable
                    onCancel={this.hideTable}
                    footer={[<Button key="submit" type="primary" onClick={this.hideTable}> 关闭 </Button>]}
                >
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        bordered={true}
                        rowKey={record => record.uuid}
                        rowClassName={this.setRowClassName}
                        // onRow={this.onRow}
                        pagination={pagination}
                    />
                </AntdDraggableModal>)}
        </div>);
    }
}

export default withStyles(styles)(FlowPackTable);