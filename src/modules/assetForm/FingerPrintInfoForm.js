import React from 'react'
import { Card, InputNumber, Form, DatePicker, Switch, Input, Col, Tabs, Popconfirm } from 'antd'
import MAntdCard from '../../rlib/props/MAntdCard';
import { renderAssetInfo } from './AssetInfo';
import MEvent from '../../rlib/utils/MEvent';
import SimFingerPrint from '../simdata/SimFingerPrint';
import { Base64 } from 'js-base64';


const { TextArea } = Input;

export default class FingerPrintInfoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showConfig: false,
            fingerPrint: {},
            fpEncodeStr: '',
        }
    }

    componentDidMount() {
        // 注册事件
        MEvent.register('my_select_asset_fingerprint_info', this.handleSelectAsset);
    }

    componentWillUnmount() {
        // 注销事件
        MEvent.unregister('my_select_asset_fingerprint_info', this.handleSelectAsset);
    }

    handleSelectAsset = (fingerPrint) => {
        // console.log(fingerPrint);
        // if (global.simuData) {
        //     fingerPrint = SimFingerPrint.getFP('');
        // }
        let fpEncodeStr = Base64.encode(JSON.stringify(fingerPrint));
        this.setState({ fingerPrint: fingerPrint, fpEncodeStr: fpEncodeStr });
    }

    getExtra() {
        return (<div>
        </div>);
    }

    render() {
        const { fpEncodeStr, fingerPrint } = this.state;
        return (<Card title={'设备指纹'} headStyle={MAntdCard.headerStyle('info')}
            extra={this.getExtra()}
            style={{ height: '100%', margin: 8 }}>
                <TextArea value={fpEncodeStr} autoSize={{ minRows: 4, maxRows: 12 }} readOnly />
                { renderAssetInfo(fingerPrint) }
            {/* <Form
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
            </Form> */}
        </Card>);
    }
}
