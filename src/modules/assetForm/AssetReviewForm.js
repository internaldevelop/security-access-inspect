import React from 'react'
import { Card, Radio, Form, Button, Input, Modal } from 'antd'
import MAntdCard from '../../rlib/props/MAntdCard';
import MEvent from '../../rlib/utils/MEvent';
import { AssetClass } from '../../modules/assetForm/AssetStatus'
import RestReq from '../../utils/RestReq';

export default class AssetReviewForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assetName: '未知',
            assetClass: AssetClass.NOT_ASSIGN,
            assetUuid: '',
        }

        this.onClickAssetClass3 = this.onClickAssetClass3.bind(this);
        this.onClickAssetClass4 = this.onClickAssetClass4.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.saveAssetClass = this.saveAssetClass.bind(this);
        this.saveAssetClassCB = this.saveAssetClassCB.bind(this);
    }

    componentDidMount() {
        // 注册事件
        MEvent.register('my_select_asset_basic_info', this.handleSelectAsset);
    }

    componentWillUnmount() {
        // 注销事件
        MEvent.unregister('my_select_asset_basic_info', this.handleSelectAsset);
    }

    handleSelectAsset = (basicInfo) => {
        console.log(basicInfo);
        this.setState({ assetName: basicInfo.name, assetClass: basicInfo.classify, assetUuid: basicInfo.uuid });
    }

    saveAssetClassCB(response) {
        if (response.code !== 'ERROR_OK') {
            Modal.error({ title: '', content: '对终端授信分类失败，请检查资产状态是否异常'});
            // return;
        }

        // 将新的资产名和分类，发送事件给其它组件以更新数据
        const { assetUuid, assetClass, assetName } = this.state;
        let assetCls = { uuid: assetUuid, name: assetName, classify: assetClass };
        MEvent.send('my_asset_classified', assetCls);
    }

    saveAssetClass() {
        const { assetUuid, assetClass, assetName } = this.state;
        // RestReq.asyncGet(this.saveAssetClassCB, '/embed-terminal/authenticate/to-review', { asset_uuid: assetUuid, classify: assetClass,  }, { token: false });
        RestReq.asyncGet(this.saveAssetClassCB, '/embed-terminal/authenticate/to-review',
            { asset_uuid: assetUuid, classify: '' + assetClass, asset_name: assetName },
            { alwaysCallBack: true }
        );
    }

    getExtra() {
        return (<div>
            <Button style={{ backgroundColor: '#fff7e6', color: '#610b00' }} onClick={this.saveAssetClass}>保存</Button>
        </div>);
    }

    // 回调形式示例一：箭头函数 + 渲染时binding，每次渲染时创建新的函数，影响性能
    // 改善的方式是：在constructor建立绑定，this.handleClick = this.handleClick.bind(this);
    onClickAssetClass = (assetClass) => (event) => {
        this.setState({ assetClass });
    }

    // 回调形式示例二：渲染时binding
    onClickAssetClass2(assetClass) {
        this.setState({ assetClass });
    }

    // 回调形式示例三：采用对象自身的属性作为参数 
    onClickAssetClass3(event) {
        // console.log(event);
        let assetClass = parseInt(event.target.value);
        this.setState({ assetClass });
    }

    // 回调形式示例四：使用数据属性传递参数 
    // data-assetCls={...} 传递的参数，存储在 event.target.dataset.assetcls 中(注意实际存储的是全小写)
    onClickAssetClass4(event) {
        // console.log(event);
        let assetClass = parseInt(event.target.dataset.assetcls);
        this.setState({ assetClass });
    }

    onChangeName(event) {
        // console.log(event);
        // let assetClass = parseInt(event.target.dataset.assetcls);
        let assetName = event.target.value;
        this.setState({ assetName });
    }

    render() {
        const { assetName, assetClass } = this.state;

        return (<Card title={'终端审核'} headStyle={MAntdCard.headerStyle('emphasis')}
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
                    <Input value={assetName} onChange={this.onChangeName} />
                </Form.Item>
                <Form.Item label="审核">
                    <Radio.Group value={assetClass} buttonStyle="solid">
                        {/* 回调形式一：参考 onClickAssetClass 注释 */}
                        {/* <Radio.Button value={AssetClass.WHITE_LIST} onClick={this.onClickAssetClass(AssetClass.WHITE_LIST).bind(this)}>白名单</Radio.Button>
                        <Radio.Button value={AssetClass.BLACK_LIST} onClick={this.onClickAssetClass(AssetClass.BLACK_LIST).bind(this)}>黑名单</Radio.Button>
                        <Radio.Button value={AssetClass.NOT_ASSIGN} onClick={this.onClickAssetClass(AssetClass.NOT_ASSIGN).bind(this)}>待审核</Radio.Button> */}

                        {/* 回调形式二：参考 onClickAssetClass2 注释 */}
                        {/* <Radio.Button value={AssetClass.WHITE_LIST} onClick={() => this.onClickAssetClass2(AssetClass.WHITE_LIST)}>白名单</Radio.Button>
                        <Radio.Button value={AssetClass.BLACK_LIST} onClick={() => this.onClickAssetClass2(AssetClass.BLACK_LIST)}>黑名单</Radio.Button>
                        <Radio.Button value={AssetClass.NOT_ASSIGN} onClick={() => this.onClickAssetClass2(AssetClass.NOT_ASSIGN)}>待审核</Radio.Button> */}

                        {/* 回调形式三：参考 onClickAssetClass3 注释 */}
                        {/* <Radio.Button value={AssetClass.WHITE_LIST} onClick={this.onClickAssetClass3}>白名单</Radio.Button>
                        <Radio.Button value={AssetClass.BLACK_LIST} onClick={this.onClickAssetClass3}>黑名单</Radio.Button>
                        <Radio.Button value={AssetClass.NOT_ASSIGN} onClick={this.onClickAssetClass3}>待审核</Radio.Button> */}

                        {/* 回调形式四：参考 onClickAssetClass4 注释 */}
                        <Radio.Button value={AssetClass.WHITE_LIST} data-assetCls={AssetClass.WHITE_LIST} onClick={this.onClickAssetClass4}>白名单</Radio.Button>
                        <Radio.Button value={AssetClass.BLACK_LIST} data-assetCls={AssetClass.BLACK_LIST} onClick={this.onClickAssetClass4}>黑名单</Radio.Button>
                        <Radio.Button value={AssetClass.NOT_ASSIGN} data-assetCls={AssetClass.NOT_ASSIGN} onClick={this.onClickAssetClass4}>待审核</Radio.Button>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Card>);
    }
}
