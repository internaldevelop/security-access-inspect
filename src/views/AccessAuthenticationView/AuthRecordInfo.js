import React from 'react';
import { Card, Tag } from 'antd';
import MEvent from '../../rlib/utils/MEvent';
import SimuAuthRecords from '../../modules/simdata/SimuAuthRecords';
import AssetBasicInfo from '../../modules/assetForm/AssetBasicInfo';
import AuthDetails from '../../modules/assetForm/AuthDetails';
import MAntdCard from '../../rlib/props/MAntdCard';
import authResultTag from '../../modules/antdComponents/AuthResultTag';
import MTest from '../../rlib/utils/MTest';
import RestReq from '../../utils/RestReq';

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
        if (authRecord.hasOwnProperty('uuid')) {
            // 模拟代码，找到虚拟认证记录，发送虚拟认证记录信息
            MEvent.send('my_auth_details_info', authRecord);
            this.setState({ authUuid, authRecord });
        } else {
            // 获取真实认证记录信息
            this.fetchAuthInfo(authUuid);
            this.setState({ authUuid });
        }

    }

    fetchAuthInfoCB = (response) => {
        let record = response.payload;
        let asset = record.asset;

        // 发送更新设备信息的消息
        let assetBasicInfo = {
            uuid: asset.uuid, name: asset.name, classify: asset.classify,
            ip: asset.ip, os_type: asset.os_type, os_ver: asset.os_ver,
            public_key: record.public_key,
        };
        MEvent.send('my_select_asset_basic_info', assetBasicInfo);

        // 发送更新认证记录的消息
        let authRecord = {
            signature: record.signature,
            pub_key: record.public_key,
            plain_text: record.plaintext,
            cipher_text: record.ciphertext,
            sym_key: record.sym_key,
            auth_uuid: record.auth_uuid,
            asset_uuid: record.asset_uuid,
            auth_result: record.authenticate_flag,
            dev_fingerprint: record.dev_fingerprint,
            auth_time: record.auth_time,
        };
        MEvent.send('my_auth_details_info', authRecord);
        this.setState({ authRecord });
    }

    fetchAuthInfo(authUuid) {
        RestReq.asyncGet(this.fetchAuthInfoCB, '/embed-terminal/authenticate/authenticate-record-info', { auth_uuid: authUuid });
    }

    getExtra() {
        const { authRecord } = this.state;
        let status = authRecord.auth_result;

        return (<div>
            {authResultTag(status)}
            {authResultTag(status, true)}
            </div>);
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
