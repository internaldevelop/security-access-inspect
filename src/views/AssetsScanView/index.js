import React from 'react'
import PropTypes from 'prop-types';
import { Skeleton, Table, Icon, Button, Row, Col, Tabs, Popconfirm } from 'antd'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { observer, inject } from 'mobx-react'
import { actionType } from '../../global/enumeration/ActionType';
import { DeepClone, DeepCopy } from '../../utils/ObjUtils'
import { GetMainViewHeight } from '../../utils/PageUtils'
import HttpRequest from '../../utils/HttpRequest';
import AssetsGraph from './AssetsGraph';
import AssetInfoForm from '../../modules/assetForm/AssetInfoForm';
import AssetReviewForm from '../../modules/assetForm/AssetReviewForm';
import FingerPrintInfoForm from '../../modules/assetForm/FingerPrintInfoForm';
import ReactEcharts from 'echarts-for-react';
import { getSimulateOptions } from './options';

const TabPane = Tabs.TabPane;


const styles = theme => ({
    iconButton: {
        margin: 0,
        marginBottom: 0,
        marginTop: 0,
    },
});

const DEFAULT_PAGE_SIZE = 10;
@inject('assetStore')
@inject('userStore')
@observer
class AssetsScanView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showConfig: false,
            // columns: Column,
            // assets: [],
            // recordChangeID: -1,
            // currentPage: 1,     // Table中当前页码（从 1 开始）
            // pageSize: DEFAULT_PAGE_SIZE,
            // scrollWidth: 1000,        // 表格的 scrollWidth
            // scrollHeight: 300,      // 表格的 scrollHeight
            // shadeState: false,
        }
        // 设置操作列的渲染
        // this.initActionColumn();

        // 从后台获取设备数据的集合
        // this.getAllAssets();
    }

    componentDidMount() {
        // 增加监听器，侦测浏览器窗口大小改变
        // window.addEventListener('resize', this.handleResize.bind(this));
        // this.setState({ scrollHeight: GetMainViewHeight() });
    }

    handleResize = e => {
        // console.log('浏览器窗口大小改变事件', e.target.innerWidth, e.target.innerHeight);
        // this.setState({ scrollHeight: GetMainViewHeight() });
    }

    componentWillUnmount() {
        // 组件卸装前，一定要移除监听器
        // window.removeEventListener('resize', this.handleResize.bind(this));
    }


    render() {
        const { columns, showConfig, assets, scrollWidth, scrollHeight } = this.state;
        let self = this;
        const userStore = this.props.userStore;
        return (<div>
            {/* <Skeleton loading={!userStore.isNormalUser} active avatar> */}
            <Row>
                <Col span={12}>
                    {/* <div>23213213</div> */}
                    <AssetsGraph />
                    {/* <ReactEcharts option={getSimulateOptions()} /> */}
                </Col>
                <Col span={6}>
                    <Row>
                        <AssetReviewForm />
                    </Row>
                    <Row>
                        <AssetInfoForm />
                    </Row>
                </Col>
                <Col span={6}>
                    <Row>
                        <FingerPrintInfoForm />
                    </Row>
                </Col>
            </Row>
            {/* <Skeleton loading={!userStore.isNormalUser} active avatar paragraph={{ rows: 24 }}> */}

            {/* <Skeleton loading={!userStore.isNormalUser} active avatar> */}
            {/* </Skeleton> */}
        </div>)

    }
}

AssetsScanView.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(AssetsScanView);