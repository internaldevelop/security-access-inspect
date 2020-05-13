import React, { Component } from 'react';
import { Table, Modal, Button } from 'antd'
import MEvent from '../../rlib/utils/MEvent';
import { WindowsFill } from '@ant-design/icons';
import MAntdTable from '../../rlib/props/MAntdTable';
import withStyles from '@material-ui/core/styles/withStyles';
import SimNetPackets from '../../modules/simdata/SimNetPackets';

const { confirm } = Modal;

export function getFlowPackByDay(day) {
    // message.error('每日统计--' + day);
    MEvent.send('my_fetch_IP_packs', 1);
}

export function getFlowPackByIP(ipAddr) {
    // message.error('IP统计--' + ipAddr);
    MEvent.send('my_fetch_IP_packs', 1);
}

function tableColumns() {
    let colsList = [
        { title: '序号', width: 60, dataIndex: 'index' },
        { title: '时间', width: 160, dataIndex: 'parse_time', myNoWrap: true, mySort: true },
        { title: '源IP', width: 160, dataIndex: 'source_ip', myNoWrap: true, mySort: true },
        // { title: '源端口', width: 100, dataIndex: 'source_port',  },
        { title: '目的IP', width: 160, dataIndex: 'dest_ip', myNoWrap: true, mySort: true },
        // { title: '目的端口', width: 120, dataIndex: 'dest_port',  },
        { title: '方向', width: 100, dataIndex: 'direction', mySort: true },
        { title: '传输协议', width: 100, dataIndex: 'transport_protocol', mySort: true },
        { title: '应用协议', width: 150, dataIndex: 'app_protocol', mySort: true },
        // { title: '时间', width: 150, dataIndex: 'auth_time', myNoWrap: true, mySort: true },
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
            visible: visible,
            columns: tableColumns(),
            dataSource: SimNetPackets.allPackets(),
            pageSize: 10,
            currentPage: 1,     // Table中当前页码（从 1 开始）
            selectRowIndex: -1,

        };

        this.handleFetchIPPacks = this.handleFetchIPPacks.bind(this);
        this.showTable = this.showTable.bind(this);
        this.hideTable = this.hideTable.bind(this);
        this.setRowClassName = this.setRowClassName.bind(this);
    }

    handleFetchIPPacks(params) {
        this.showTable();
    }

    componentDidMount() {
        MEvent.register('my_fetch_IP_packs', this.handleFetchIPPacks);
    }

    componentWillUnmount() {
        MEvent.unregister('my_fetch_IP_packs', this.handleFetchIPPacks);
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
        this.setState({ currentPage, pageSize });
    }

    render() {
        const { visible, dataSource, columns } = this.state;
        let self = this;
        return (<div>
            <Modal
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
                    pagination={MAntdTable.pagination(self.handlePageChange)}
                />
            </Modal>
        </div>);
    }
}

export default withStyles(styles)(FlowPackTable);