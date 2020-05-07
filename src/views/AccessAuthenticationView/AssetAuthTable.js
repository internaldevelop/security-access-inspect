import { Card, Table } from 'antd';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { GetMainViewMinHeight } from '../../utils/PageUtils';
import { columns as AccessLogColumn } from './AccessLogColumn';
import RestReq from '../../utils/RestReq';
import SimAssets from '../../modules/simdata/SimAssets';
import SimuAuthRecords from '../../modules/simdata/SimuAuthRecords';
import withStyles from '@material-ui/core/styles/withStyles';
import { MySendEvent } from '../../global/environment/MySysEvent';
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

        this.handleAssetSelectChange = this.handleAssetSelectChange.bind(this);
        this.setRowClassName = this.setRowClassName.bind(this);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    handleResize = e => {
    }

    /** 处理页面变化（页面跳转/切换/每页记录数变化） */
    handlePageChange = (currentPage, pageSize) => {
        this.setState({ currentPage, pageSize });
    }

    handleAssetSelectChange(value) {
        console.log(`selected ${value}`);
    }

    getExtra() {
        const { assetsList } = this.state;
        return MSelect.normal(assetsList, this.handleAssetSelectChange, '请选择终端...');
    }

    setRowClassName = (record) => {
        const { classes } = this.props;
        const { selectRowIndex } = this.state;
        return (selectRowIndex === record.index) ? classes.clickRow : '';
    }

    onRow = (record) => {
        return {
            onClick: (event) => {
                // 发送虚拟设备
                let asset = SimAssets.getAsset(record.asset_uuid);
                let basicInfo = { uuid: record.uuid, name: record.name, classify: asset.cls };
                MySendEvent('my_select_asset_basic_info', basicInfo);

                MySendEvent('my_select_auth_record', record.uuid);
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
