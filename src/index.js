import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './main/App';
import * as serviceWorker from './modules/auxliary/serviceWorker';
import { Provider } from 'mobx-react'
import { LocaleProvider, ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import store from './main/store'


ReactDOM.render(
    // <ConfigProvider csp={{ nonce: 'YourNonceCode' }}>
    <ConfigProvider >
        <Provider {...store}>
            <App />
        </Provider>
    </ConfigProvider>,
    // <LocaleProvider locale={zh_CN}>
    //     <Provider {...store}>
    //         <App />
    //     </Provider>
    // </LocaleProvider>,
    document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
