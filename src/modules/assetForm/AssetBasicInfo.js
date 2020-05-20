import React from 'react'
import { Form, Input } from 'antd'
import MEvent from '../../rlib/utils/MEvent';
import { getOSName } from '../const/OSType';

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
        MEvent.register('my_select_asset_basic_info', this.handleSelectAsset);
        MEvent.register('my_asset_classified', this.handleAssetClassified);
    }

    componentWillUnmount() {
        // 注销事件
        MEvent.unregister('my_select_asset_basic_info', this.handleSelectAsset);
        MEvent.unregister('my_asset_classified', this.handleAssetClassified);
    }

    handleSelectAsset = (basicInfo) => {
        console.log(basicInfo);
        this.setState({ basicInfo });
    }

    handleAssetClassified = (assetCls) => {
        const { basicInfo } = this.state;
        basicInfo.name = assetCls.name;
        basicInfo.classify = assetCls.classify;
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
                <Input value={basicInfo.name} readOnly />
            </Form.Item>
            <Form.Item label="终端标识">
                <TextArea value={basicInfo.uuid} autoSize={{ minRows: 2, maxRows: 3 }} readOnly />
            </Form.Item>
            {/* <Form.Item label="分类">
                <Input value={basicInfo.classify} />
            </Form.Item> */}
            <Form.Item label="IP地址">
                <Input value={basicInfo.ip} readOnly />
            </Form.Item>
            <Form.Item label="操作系统">
                <Input value={ getOSName(basicInfo.os_type) } readOnly />
            </Form.Item>
            <Form.Item label="系统版本">
                <Input value={basicInfo.os_ver} readOnly />
            </Form.Item>
            <Form.Item label="公钥">
                <TextArea value={basicInfo.public_key} autoSize={{ minRows: 2, maxRows: 6 }} readOnly />
            </Form.Item>
        </Form>);
    }
}
