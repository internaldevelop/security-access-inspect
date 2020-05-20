import React from 'react';
import { Tabs, Input } from 'antd';
import MEvent from '../../rlib/utils/MEvent';

const { TabPane } = Tabs;
const { TextArea } = Input;

export default class AuthDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authDetails: {},
        };

        this.handleTabChange = this.handleTabChange.bind(this);
    }

    componentDidMount() {
        // 注册事件
        MEvent.register('my_auth_details_info', this.handleAuthDetails);
    }

    componentWillUnmount() {
        // 注销事件
        MEvent.unregister('my_auth_details_info', this.handleAuthDetails);
    }

    handleAuthDetails = (authDetails) => {
        this.setState({ authDetails });
    }

    handleTabChange(key) {

    }

    render() {
        const { authDetails } = this.state;
        return (<Tabs defaultActiveKey="plain_text" onChange={this.handleTabChange}>
            <TabPane tab="明文" key="plain_text">
                <TextArea autoSize={{ minRows: 2, maxRows: 10 }} readOnly
                    value={authDetails.hasOwnProperty('plain_text') ? authDetails.plain_text : '无认证明文数据'}
                />
            </TabPane>
            <TabPane tab="密文" key="cipher_text">
                <TextArea autoSize={{ minRows: 2, maxRows: 6 }} readOnly
                    value={authDetails.hasOwnProperty('cipher_text') ? authDetails.cipher_text : '无认证密文数据'}
                />
            </TabPane>
            <TabPane tab="签名" key="signature">
                <TextArea autoSize={{ minRows: 2, maxRows: 6 }} readOnly
                    value={authDetails.hasOwnProperty('signature') ? authDetails.signature : '无签名数据'}
                />
            </TabPane>
            <TabPane tab="公钥" key="pub_key">
                <TextArea autoSize={{ minRows: 2, maxRows: 6 }} readOnly
                    value={authDetails.hasOwnProperty('pub_key') ? authDetails.pub_key : '无终端公钥数据'}
                />
            </TabPane>
        </Tabs>);
    }
}
