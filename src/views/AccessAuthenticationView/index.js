import { message, Row, Col, Input, Button, Card, Skeleton, Table } from 'antd';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { DeepClone } from '../../utils/ObjUtils';
import { GetMainViewHeight, GetMainViewMinHeight, GetMainViewMinWidth } from '../../utils/PageUtils';
import { columns as AccessLogColumn } from './AccessLogColumn';
import { columns as Column } from './Column';
import AssetAuthTable from './AssetAuthTable';
import AuthRecordInfo from './AuthRecordInfo';
import RestReq from '../../utils/RestReq';

// export default 
@inject('userStore')
@observer
class AccessAuthenticationView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }

        // this.queryAuthorizationEquips(this.state.currentPage, this.state.pageSize);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }


    queryAuthorizationEquips = (targetPage, pageSize) => {
        let startSet = (targetPage - 1) * pageSize + 1;
        return RestReq.asyncGet(this.queryAuthorizationEquipsCB, '/embed-terminal/assets/get-assets', { classify: 1, /*offset: startSet, count: pageSize*/ }, { token: false });
    }

    queryAuthorizationEquipsCB = (data) => {
    }



    render() {
        const userStore = this.props.userStore;
        const { classes } = this.props;
        let self = this;
        return (
                <div style={{ minWidth: GetMainViewMinWidth(), minHeight: GetMainViewMinHeight() }}>
                    <Row>
                        <Col span={15}>
                            <AssetAuthTable />
                    </Col>
                    <Col span={9}>
                    <AuthRecordInfo />
                    </Col>
                    </Row>
                </div>
        );
    }
}

export default AccessAuthenticationView;
