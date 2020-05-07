import React from 'react';
import { Card, Tag } from 'antd';
import { MySendEvent, MyRegisterEvent, MyUnregisterEvent } from '../../global/environment/MySysEvent';
import SimuAuthRecords from '../../modules/simdata/SimuAuthRecords';
import AssetBasicInfo from '../../modules/assetForm/AssetBasicInfo';
import AuthDetails from '../../modules/assetForm/AuthDetails';
import MCardProps from '../../rlib/props/MCardProps';

class AuthRecordInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authUuid: '',
            authRecord: { auth_result: 0 },
        }

    }

    componentDidMount() {
        MyRegisterEvent('my_select_auth_record', this.handleSelectAuthRecord);
    }

    componentWillUnmount() {
        MyUnregisterEvent('my_select_auth_record', this.handleSelectAuthRecord);
    }

    handleSelectAuthRecord = (authUuid) => {
        let authRecord = SimuAuthRecords.getAuthRecord(authUuid);
        MySendEvent('my_auth_details_info', authRecord);

        this.setState({ authUuid, authRecord });
    }

    getExtra() {
        const { authRecord } = this.state;
        let status = authRecord.auth_result;
        let color = '#d4380d';
        let tag = '未知状态';
        if (status === 2) {
            color = '#ff4d4f';
            tag = '验签失败';
        } else if (status === 3) {
            color = '#d4380d';
            tag = '解密失败';
        } else if (status === 4) {
            color = '#d46b08';
            tag = '授信过期';
        } else if (status === 1) {
            color = '#389e0d';
            tag = '认证成功';
        }
        return (<span>
            <Tag color={color} key={tag}>{tag}</Tag>
        </span>);
    }

    render() {
        return (
            <div>
                <Card title={'接入认证信息'} extra={this.getExtra()} style={{ height: '100%', margin: 8 }} headStyle={MCardProps.headerStyle('info-2')}>
                    <AssetBasicInfo />
                    <AuthDetails />
                </Card>
                <br />
            </div>
        );
    }
}

export default AuthRecordInfo;
