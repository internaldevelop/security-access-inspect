
import React from 'react'
import { Card, InputNumber, Form, DatePicker, Switch, Row, Col, Tabs, Popconfirm } from 'antd'
import { getCardHeaderStyle } from '../../utils/CardUtils';
import { renderAssetInfo } from './AssetInfo';

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
        return (<Card title={'终端信息'} headStyle={getCardHeaderStyle('info')}
            extra={this.getExtra()}
            style={{ height: '100%', margin: 8 }}>
            {renderAssetInfo(assetInfo)}
        </Card>);
    }
}
