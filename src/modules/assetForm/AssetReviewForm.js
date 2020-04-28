import React from 'react'
import { Card, Radio, Form, Button, Switch, Input, Col, Tabs, Popconfirm } from 'antd'
import { getCardHeaderStyle } from '../../utils/CardUtils';
import { MyRegisterEvent, MyUnregisterEvent } from '../../global/environment/MySysEvent';
import { AssetClass, AssetStatus, getAssetClass, getCateIndex, getCateIndexByClass, getCateIndexByStatus } from '../../modules/assetForm/AssetStatus'

export default class AssetReviewForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assetName: '未知',
            assetClass: AssetClass.NOT_ASSIGN,
        }
    }

    componentDidMount() {
        // 注册事件
        MyRegisterEvent('my_select_asset', this.handleSelectAsset);
    }

    componentWillUnmount() {
        // 取消事件
        MyUnregisterEvent('my_select_asset', this.handleSelectAsset);
    }

    handleSelectAsset = (data) => {
        console.log(data);
        this.setState({ assetName: data.name, assetClass: data.assetClass });
    }

    saveAssetClass = () => {
    }

    getExtra() {
        return (<div>
            <Button style={{ backgroundColor: '#fff7e6', color: '#610b00' }}>保存</Button>
        </div>);
    }

    onClickAssetClass = (assetClass) => (event) => {
        this.setState({ assetClass });
    }

    render() {
        const { assetName, assetClass } = this.state;

        return (<Card title={'终端审核'} headStyle={getCardHeaderStyle('emphasis')}
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
                <Form.Item label="终端命名">
                    <Input value={assetName}/>
                </Form.Item>
                <Form.Item label="审核">
                    <Radio.Group value={assetClass} buttonStyle="solid">
                        <Radio.Button value={AssetClass.WHITE_LIST} onClick={this.onClickAssetClass(AssetClass.WHITE_LIST).bind(this)}>白名单</Radio.Button>
                        <Radio.Button value={AssetClass.BLACK_LIST} onClick={this.onClickAssetClass(AssetClass.BLACK_LIST).bind(this)}>黑名单</Radio.Button>
                        <Radio.Button value={AssetClass.NOT_ASSIGN} onClick={this.onClickAssetClass(AssetClass.NOT_ASSIGN).bind(this)}>待审核</Radio.Button>
                        {/* <Radio.Button value={AssetClass.WHITE_LIST} >白名单</Radio.Button>
                        <Radio.Button value={AssetClass.BLACK_LIST} >黑名单</Radio.Button>
                        <Radio.Button value={AssetClass.NOT_ASSIGN} >待审核</Radio.Button> */}
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Card>);
    }
}
