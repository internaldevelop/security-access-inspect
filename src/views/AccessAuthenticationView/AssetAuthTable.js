import { message, Row, Col, Input, Button, Select, Card, Tag, Table } from 'antd';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { DeepClone } from '../../utils/ObjUtils';
import { GetMainViewHeight, GetMainViewMinHeight, GetMainViewMinWidth } from '../../utils/PageUtils';
import { columns as AccessLogColumn } from './AccessLogColumn';
import RestReq from '../../utils/RestReq';
import SimAssets from '../../modules/simdata/SimAssets';
import SimuAuthRecords from '../../modules/simdata/SimuAuthRecords';
import withStyles from '@material-ui/core/styles/withStyles';
// import styles from './authTable.less';

const DEFAULT_PAGE_SIZE = 10;
const styles = theme => ({
    clickRow: {
        backgroundColor: '#00b4ed',
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

    /** 初始化操作列，定义渲染效果 */
    initActionColumn() {
        // const { columns } = this.state;
        // const { classes } = this.props;
        // if (columns.length === 0)
        //     return;

        // columns[columns.length - 1].render = (text, record, index) => (
        //     <div>
        //         <Button className={classes.actionButton} type="primary" size="small" onClick={this.handleAuthentication(index).bind(this)}>指纹认证</Button>
        //     </div>
        // )

        // this.setState({ columns });
    }

    queryAuthorizationEquips = (targetPage, pageSize) => {
        // let startSet = (targetPage - 1) * pageSize + 1;
        // return RestReq.asyncGet(this.queryAuthorizationEquipsCB, '/embed-terminal/assets/get-assets', { empower_flag: 1, /*offset: startSet, count: pageSize*/ }, { token: false });
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

        // //RestReq.asyncGet(this.queryAuthorizationEquipsCB, '/embed-terminal/assets/get-assets', { empower_flag: 1, /*offset: startSet, count: pageSize*/ }, { token: false });
        // RestReq.asyncGet(this.queryAuthorizationEquipsCB, '/embed-terminal/authenticate/authenticate', { asset_uuid: equips[index].uuid, }, { token: false });
    }

    getExtraInput = () => {
        // const { classes } = this.props;
        // return (
        //     <Input className={classes.antInput} size="large" onChange={this.handleEquipInputValue} placeholder="接入日志查询" onKeyPress={this.handleEquipInputKeyPressed} />
        // );
    }

    getAccessLogTableProps() {
        // const { totalResult, scrollWidth, scrollHeight, equips } = this.state;
        // let self = this;

        // const tableProps = {
        //     columns: AccessLogColumn,
        //     rowKey: record => record.uuid,
        //     dataSource: equips,
        //     scroll: { x: scrollWidth, y: scrollHeight },
        //     bordered: true,
        //     pagination: {
        //         total: totalResult > 0 ? totalResult : 10,
        //         showTotal: (total, range) => `${range[0]}-${range[1]} / ${total}`,
        //         pageSizeOptions: [DEFAULT_PAGE_SIZE.toString(), '20', '30', '40'],
        //         defaultPageSize: DEFAULT_PAGE_SIZE,
        //         showSizeChanger: true,
        //         onShowSizeChange(current, pageSize) {  //当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
        //             self.handlePageChange(current, pageSize);
        //         },
        //         onChange(current, pageSize) {  //点击改变页数的选项时调用函数，current:将要跳转的页数
        //             self.handlePageChange(current, pageSize);
        //         },
        //     }
        // };
        // return tableProps;
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
        // return (selectRowIndex === record.index) ? styles.clickRow : '';
    }

    onRow = (record) => {
        return {
            onClick: (event) => {
                this.setState({ selectRowIndex: record.index });
            },
        };
    }

    render() {
        const { columns, authRecords } = this.state;
        let self = this;
        return (
            <div style={{ minWidth: GetMainViewMinWidth(), minHeight: GetMainViewMinHeight() }}>
                <Card title={'接入认证记录'} extra={this.getExtra()}>
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
