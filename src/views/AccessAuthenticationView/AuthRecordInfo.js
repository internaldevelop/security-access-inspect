import React from 'react';
import { Card, Tag } from 'antd';
import { MySendEvent, MyRegisterEvent, MyUnregisterEvent } from '../../global/environment/MySysEvent';
import SimuAuthRecords from '../../modules/simdata/SimuAuthRecords';
import AssetBasicInfo from '../../modules/assetForm/AssetBasicInfo';
import AuthDetails from '../../modules/assetForm/AuthDetails';
import MAntdCard from '../../rlib/props/MAntdCard';
import authResultTag from '../../modules/antdComponents/AuthResultTag';
import MTimeUtils from '../../rlib/utils/MTimeUtils';

class AuthRecordInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authUuid: '',
            authRecord: { auth_result: 0 },
        }

        // let tms1 = MTimeUtils.now();
        // let tms2 = MTimeUtils.now('str', 'simple');
        // let tms3 = MTimeUtils.now('str', 'yyyy-MM-dd hh:mm:ss.S');
        // let tms4 = MTimeUtils.now('str', 'locale');
        // let tms5 = MTimeUtils.now('str', 'localetime');
        // let tms6 = MTimeUtils.now('str', 'normal');
        // let tms7 = MTimeUtils.now('str', 'GMT');

        // let tms0 = MTimeUtils.now();
        // let tms1 = MTimeUtils.offset(-39, 'second');
        // let tms2 = MTimeUtils.offset(-39, 'minute');
        // let tms3 = MTimeUtils.offset(-9, 'hour');
        // let tms4 = MTimeUtils.offset(-9, 'day');
        // let tms5 = MTimeUtils.offset(-9, 'month');
        // let tms6 = MTimeUtils.offset(-9, 'year');
        // let i=1;
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
