import React from 'react'
import { Card, InputNumber, Form, DatePicker, Switch, Input, Col, Tabs, Popconfirm } from 'antd'
import { MyRegisterEvent, MyUnregisterEvent } from '../../global/environment/MySysEvent';

const { TextArea } = Input;

export default class AssetBasicInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            basicInfo: {},
        };
    }

    componentDidMount() {
        // 注册事件
        MyRegisterEvent('my_select_asset_basic_info', this.handleSelectAsset);
    }

    componentWillUnmount() {
        // 注销事件
        MyUnregisterEvent('my_select_asset_basic_info', this.handleSelectAsset);
    }

    handleSelectAsset = (basicInfo) => {
        console.log(basicInfo);
        this.setState({ basicInfo });
    }

    render() {
        const { basicInfo } = this.state;
        if (!basicInfo.hasOwnProperty('uuid')) {
            return (<div>
                获取设备信息失败
            </div>);
        }

        return (<Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            layout="horizontal"
        >
            <Form.Item label="终端名称">
                <Input value={basicInfo.name} />
            </Form.Item>
            <Form.Item label="终端标识">
                <Input value={basicInfo.uuid} />
            </Form.Item>
            <Form.Item label="分类">
                <Input value={basicInfo.classify} />
            </Form.Item>
            <Form.Item label="IP地址">
                <Input value={basicInfo.ip} />
            </Form.Item>
            <Form.Item label="操作系统">
                <Input value={basicInfo.os_type} />
            </Form.Item>
            <Form.Item label="系统版本">
                <Input value={basicInfo.os_ver} />
            </Form.Item>
            <Form.Item label="公钥">
                <TextArea value={basicInfo.public_key} autoSize={{ minRows: 2, maxRows: 6 }} readOnly />
            </Form.Item>
        </Form>);
    }
}
