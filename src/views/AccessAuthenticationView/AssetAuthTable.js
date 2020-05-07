import { Select, Card, Table } from 'antd';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { GetMainViewMinHeight } from '../../utils/PageUtils';
import { columns as AccessLogColumn } from './AccessLogColumn';
import RestReq from '../../utils/RestReq';
import SimAssets from '../../modules/simdata/SimAssets';
import SimuAuthRecords from '../../modules/simdata/SimuAuthRecords';
import withStyles from '@material-ui/core/styles/withStyles';
// import styles from './authTable.less';
import { MySendEvent } from '../../global/environment/MySysEvent';
import { getCardHeaderStyle } from '../../utils/CardUtils';

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
            columns: AccessLogColumn,
            // equips: [],
            // scrollWidth: 1000,        // 表格的 scrollWidth
            // scrollHeight: 200,      // 表格的 scrollHeight
            pageSize: DEFAULT_PAGE_SIZE,
            currentPage: 1,     // Table中当前页码（从 1 开始）
            selectRowIndex: -1,
            // totalResult: 0,
            // selectedEquipRowKeys: [],
            // equipValue: '',
        }

        // 先用虚拟设备填充
        // let assetsList = SimAssets.allAssets();
        // this.setState({ assetsList: assetsList });
        let i = 1;
        // this.queryAuthorizationEquips(this.state.currentPage, this.state.pageSize);
        this.handleAssetSelectChange = this.handleAssetSelectChange.bind(this);
        this.setRowClassName = this.setRowClassName.bind(this);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    handleResize = e => {
    }

    queryAuthorizationEquips = (targetPage, pageSize) => {
        // let startSet = (targetPage - 1) * pageSize + 1;
        // return RestReq.asyncGet(this.queryAuthorizationEquipsCB, '/embed-terminal/assets/get-assets', { classify: 1, /*offset: startSet, count: pageSize*/ }, { token: false });
    }

    queryAuthorizationEquipsCB = (data) => {
        // if (data.code === 'ERROR_OK') {
        //     let startSet = (this.state.currentPage - 1) * this.state.pageSize;
        //     let equips = data.payload.map((equip, index) => {
        //         let item = DeepClone(equip);
        //         item.index = startSet + index + 1;
        //         item.key = startSet + index + 1;
        //         return item;
        //     });
        //     this.setState({ equips, /*totalResult: data.payload.total*/ });
        // }
    }

    /**
     * 将数据所在页的行索引转换成整个数据列表中的索引
     * @param {} rowIndex 数据在表格当前页的行索引
     */
    transferDataIndex = (rowIndex) => {
        // currentPage 为 Table 中当前页码（从 1 开始）
        // const { currentPage, pageSize } = this.state;
        // let dataIndex = (currentPage - 1) * pageSize + rowIndex;
        // return dataIndex;
    }

    /** 处理页面变化（页面跳转/切换/每页记录数变化） */
    handlePageChange = (currentPage, pageSize) => {
        this.setState({ currentPage, pageSize });
        // this.queryAuthorizationEquips(currentPage, pageSize);
    }

    onSelectEquipChange = selectedEquipRowKeys => {
        //console.log('selectedEquipRowKeys changed: ', selectedEquipRowKeys);
        // this.setState({ selectedEquipRowKeys });
    };

    handleEquipInputKeyPressed = (event) => {
        // if (event.which === 13) {
        //     //this.equipSearch();
        // }
    }

    handleEquipInputValue = (event) => {
        // if (event.target.value === '' && (this.state.equipValue === '' || this.state.equipValue === undefined)) {
        //     //this.queryEquipAuthorizations(this.state.currentPage, this.state.pageSize, 0);
        // }
        // this.setState({
        //     equipValue: event.target.value,
        // })
    }

    equipAuthenticationCB = (data) => {
        // if (data.code === 'ERROR_OK') {
        //     this.queryAuthorizationEquips(this.state.currentPage, this.state.pageSize);
        // } else {
        //     message.info("认证失败！");
        // }
    }

    handleAuthentication = (index) => (event) => {
        // const equips = this.state.equips;

        // //RestReq.asyncGet(this.queryAuthorizationEquipsCB, '/embed-terminal/assets/get-assets', { classify: 1, /*offset: startSet, count: pageSize*/ }, { token: false });
        // RestReq.asyncGet(this.queryAuthorizationEquipsCB, '/embed-terminal/authenticate/authenticate', { asset_uuid: equips[index].uuid, }, { token: false });
    }

    handleAssetSelectChange(value) {
        console.log(`selected ${value}`);
    }

    getExtra() {
        const { assetsList } = this.state;
        let self = this;

        return (<Select
            // mode="multiple"
            style={{ maxWidth: 500, minWidth: 200 }}
            allowClear
            // dropdownMatchSelectWidth
            onChange={this.handleAssetSelectChange}
        >
            {assetsList.map((item, index) => (
                <Select.Option key={index} value={item.name}>
                    {item.name}
                </Select.Option>
            ))}
        </Select>);
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
                <Card title={'接入认证记录'} extra={this.getExtra()} style={{ height: '100%', margin: 8 }} headStyle={getCardHeaderStyle('main')}>
                    <Table
                        columns={columns}
                        dataSource={authRecords}
                        bordered={true}
                        // scroll={{ x: scrollWidth, y: scrollHeight }}
                        rowKey={record => record.uuid}
                        rowClassName={this.setRowClassName}
                        onRow={this.onRow}
                        pagination={{
                            showTotal: (total, range) => `${range[0]}-${range[1]} / ${total}`,
                            pageSizeOptions: [DEFAULT_PAGE_SIZE.toString(), '20', '30', '40'],
                            defaultPageSize: DEFAULT_PAGE_SIZE,
                            showQuickJumper: true,
                            showSizeChanger: true,
                            onShowSizeChange(current, pageSize) {  //当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
                                self.handlePageChange(current, pageSize);
                            },
                            onChange(current, pageSize) {  //点击改变页数的选项时调用函数，current:将要跳转的页数
                                self.handlePageChange(current, pageSize);
                            },
                        }}
                    />
                </Card>
                <br />
            </div>

        );
    }
}

export default withStyles(styles)(AssetAuthTable);
// export default AssetAuthTable;
