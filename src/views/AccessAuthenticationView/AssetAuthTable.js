import { Card, Table } from 'antd';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { GetMainViewMinHeight } from '../../utils/PageUtils';
import { columns as AccessLogColumn } from './AccessLogColumn';
import RestReq from '../../utils/RestReq';
import SimAssets from '../../modules/simdata/SimAssets';
import SimuAuthRecords from '../../modules/simdata/SimuAuthRecords';
import withStyles from '@material-ui/core/styles/withStyles';
import MEvent from '../../rlib/utils/MEvent';
import MAntdTable from '../../rlib/props/MAntdTable';
import MAntdCard from '../../rlib/props/MAntdCard';
import MSelect from '../../rlib/antdComponents/MSelect';

const DEFAULT_PAGE_SIZE = 10;
const styles = theme => ({
    clickRow: {
        backgroundColor: '#bae7ff',
    },
});

@observer
@inject('userStore')
class AssetAuthTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assetsList: SimAssets.allAssets(),
            authRecords: SimuAuthRecords.allAuths(),
            columns: AccessLogColumn(),
            pageSize: DEFAULT_PAGE_SIZE,
            currentPage: 1,     // Table中当前页码（从 1 开始）
            selectRowIndex: -1,
        }

        this.queryAssets();

        this.queryAuthRecords();

        this.handleAssetSelectChange = this.handleAssetSelectChange.bind(this);
        this.setRowClassName = this.setRowClassName.bind(this);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    handleResize = e => {
    }

    queryAssetsCB = (response) => {
        let data = response.payload.data;
        if (typeof (data) === 'undefined') {
            return;
        }

        let assetsList = data.map((item) => { return { uuid: item.uuid, classify: item.classify, name: item.name }; });
        this.setState({ assetsList });
    }

    queryAssets() {
        // flag: 1, 表示不需要返回指纹信息
        RestReq.asyncGet(this.queryAssetsCB, '/embed-terminal/assets/get-assets', { flag: '' + 1 });
    }

    queryAuthRecordsCB = (data) => {
        let authRecords = SimuAuthRecords.allAuths();
        authRecords = [];

        let records = data.payload.data;
        for (let item of records) {
            let authRecord = {
                index: (authRecords.length + 1),
                name: item.asset.name,
                // uuid: (authRecords.length + 1),
                uuid: item.auth_uuid,
                asset_uuid: item.asset_uuid,
                ip: item.asset.ip,
                auth_result: item.authenticate_flag,
                result_cause: item.authenticate_flag,
                auth_time: item.auth_time,
            };
            authRecords.push(authRecord);
        }

        this.setState({ authRecords: authRecords });
    }

    queryAuthRecords() {
        RestReq.asyncGet(this.queryAuthRecordsCB, '/embed-terminal/authenticate/authenticate-record');
    }

    /** 处理页面变化（页面跳转/切换/每页记录数变化） */
    handlePageChange = (currentPage, pageSize) => {
        this.setState({ currentPage, pageSize });
    }

    handleAssetSelectChange(value) {
        console.log(`selected ${value}`);
        let uuid = value;
        RestReq.asyncGet(this.queryAuthRecordsCB, '/embed-terminal/authenticate/authenticate-record', { asset_uuid: uuid });
    }

    getExtra() {
        const { assetsList } = this.state;
        let options = assetsList.map((item) => { return { value: item.uuid, title: item.name }; });
        return MSelect.normal(options, this.handleAssetSelectChange, '请选择终端...');
    }

    setRowClassName = (record) => {
        const { classes } = this.props;
        const { selectRowIndex } = this.state;
        return (selectRowIndex === record.index) ? classes.clickRow : '';
    }

    onRow = (record) => {
        return {
            onClick: (event) => {
                let asset = SimAssets.getAsset(record.asset_uuid);
                if (asset.hasOwnProperty('uuid')) {
                    // 模拟代码，找到虚拟设备，发送虚拟设备信息
                    let basicInfo = { uuid: record.uuid, name: record.name, classify: asset.cls };
                    MEvent.send('my_select_asset_basic_info', basicInfo);
                } else {
                    // 发送真实认证记录
                    MEvent.send('my_select_auth_record', record.uuid);
                }

                // 设置当前选中行
                this.setState({ selectRowIndex: record.index });
            },
        };
    }

    render() {
        const { columns, authRecords } = this.state;
        let self = this;
        return (
            // <div style={{ minWidth: GetMainViewMinWidth(), minHeight: GetMainViewMinHeight() }}>
            <div style={{ minHeight: GetMainViewMinHeight() }}>
                <Card title={'接入认证记录'} extra={this.getExtra()} style={{ height: '100%', margin: 8 }} headStyle={MAntdCard.headerStyle('main')}>
                    <Table
                        columns={columns}
                        dataSource={authRecords}
                        bordered={true}
                        // scroll={{ x: scrollWidth, y: scrollHeight }}
                        rowKey={record => record.uuid}
                        rowClassName={this.setRowClassName}
                        onRow={this.onRow}
                        pagination={MAntdTable.pagination(self.handlePageChange)}
                    />
                </Card>
                <br />
            </div>

        );
    }
}

export default withStyles(styles)(AssetAuthTable);
// export default AssetAuthTable;
