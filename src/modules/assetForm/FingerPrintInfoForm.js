import React from 'react'
import { Card, InputNumber, Form, DatePicker, Switch, Input, Col, Tabs, Popconfirm } from 'antd'
import MAntdCard from '../../rlib/props/MAntdCard';
import { renderAssetInfo } from './AssetInfo';

const { TextArea } = Input;

export default class FingerPrintInfoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showConfig: false,
            assetInfo: {},
        }
    }

    getExtra() {
        return (<div>
        </div>);
    }

    render() {
        const { assetInfo } = this.state;
        return (<Card title={'设备指纹'} headStyle={MAntdCard.headerStyle('info')}
            extra={this.getExtra()}
            style={{ height: '100%', margin: 8 }}>
                <TextArea prefix="￥" autoSize={{ minRows: 2, maxRows: 10 }} />
                {renderAssetInfo(assetInfo)}
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                layout="horizontal"
            // initialValues={{ size: componentSize }}
            // onValuesChange={onFormLayoutChange}
            // size={componentSize}
            >
                <Form.Item label="Input">
                    <Input />
                </Form.Item>
                <Form.Item label="Input">
                    <Input />
                </Form.Item>
                <Form.Item label="Input">
                    <Input />
                </Form.Item>
                <Form.Item label="DatePicker">
                    <DatePicker />
                </Form.Item>
                <Form.Item label="InputNumber">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Switch">
                    <Switch />
                </Form.Item>
                <Form.Item label="DatePicker">
                    <DatePicker />
                </Form.Item>
                <Form.Item label="InputNumber">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Switch">
                    <Switch />
                </Form.Item>
                <Form.Item label="Input">
                    <Input />
                </Form.Item>
            </Form>
        </Card>);
    }
}
