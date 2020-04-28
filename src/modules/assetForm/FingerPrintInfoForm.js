import React from 'react'
import { Card, InputNumber, Form, DatePicker, Switch, Input, Col, Tabs, Popconfirm } from 'antd'
import { getCardHeaderStyle } from '../../utils/CardUtils';

export default class FingerPrintInfoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showConfig: false,
        }
    }

    getExtra() {
        return (<div>
        </div>);
    }

    render() {
        return (<Card title={'设备指纹'} headStyle={getCardHeaderStyle('info')}
            extra={this.getExtra()}
            style={{ height: '100%', margin: 8 }}>
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
