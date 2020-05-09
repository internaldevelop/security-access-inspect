import React from 'react';
import { Card, Tag } from 'antd';
import MEvent from '../../rlib/utils/MEvent';
import SimuAuthRecords from '../../modules/simdata/SimuAuthRecords';
import AssetBasicInfo from '../../modules/assetForm/AssetBasicInfo';
import AuthDetails from '../../modules/assetForm/AuthDetails';
import MAntdCard from '../../rlib/props/MAntdCard';
import authResultTag from '../../modules/antdComponents/AuthResultTag';
import MTest from '../../rlib/utils/MTest';

class AuthRecordInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authUuid: '',
            authRecord: { auth_result: 0 },
        }

        MTest.timeParse();
    }

    componentDidMount() {
        MEvent.register('my_select_auth_record', this.handleSelectAuthRecord);
    }

    componentWillUnmount() {
        MEvent.unregister('my_select_auth_record', this.handleSelectAuthRecord);
    }

    handleSelectAuthRecord = (authUuid) => {
        let authRecord = SimuAuthRecords.getAuthRecord(authUuid);
        MEvent.send('my_auth_details_info', authRecord);

        this.setState({ authUuid, authRecord });
    }

    getExtra() {
        const { authRecord } = this.state;
        let status = authRecord.auth_result;

        return authResultTag(status);
    }

    render() {
        return (
            <div>
                <Card title={'接入认证信息'} extra={this.getExtra()} style={{ height: '100%', margin: 8 }} headStyle={MAntdCard.headerStyle('info-2')}>
                    <AssetBasicInfo />
                    <AuthDetails />
                </Card>
                <br />
            </div>
        );
    }
}

export default AuthRecordInfo;
