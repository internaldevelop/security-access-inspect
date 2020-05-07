
import React from 'react'
import { Card, InputNumber, Form, DatePicker, Switch, Row, Col, Tabs, Popconfirm } from 'antd'
import MAntdCard from '../../rlib/props/MAntdCard';
import { renderAssetInfo } from './AssetInfo';
import AssetBasicInfo from './AssetBasicInfo';

export default class AssetInfoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assetInfo: {},
        }
    }

    getExtra() {
        return (<div>
        </div>);
    }

    render() {
        const { assetInfo } = this.state;
        return (<Card title={'终端信息'} headStyle={MAntdCard.headerStyle('info')}
            extra={this.getExtra()}
            style={{ height: '100%', margin: 8 }}>
            <AssetBasicInfo />
            {/* {renderAssetInfo(assetInfo)} */}
        </Card>);
    }
}
