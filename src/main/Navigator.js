import React from 'react'
import CustomMenu from "../components/menu/CustomMenu";
import { GetSystemType } from "../global/environment"

const hostMenus = [
    {
        title: '资产扫描',
        icon: 'control',
        key: '/home/assets-scan',
    },
    // {
    //     title: '设备授权',
    //     icon: 'control',
    //     key: '/home/equip-authorization',
    // },
    {
        title: '接入认证',
        icon: 'project',
        key: '/home/access-authentication',
    },
    {
        title: '实时监测',
        icon: 'line-chart',
        key: '/home/history-performance',
    },
    {
        title: '流量审计',
        icon: 'safety-certificate',
        key: '/home/flow-audit',
    },
    // {
    //     title: '指纹管理',
    //     icon: 'safety-certificate',
    //     key: '/home/fingerprint-management/',
    // },
    // {
    //     title: '系统管理',
    //     icon: 'setting',
    //     key: '/home/sysadmin',
    //     subs: [
    //         { key: '/home/sysadmin/users', title: '用户管理', icon: 'contacts', },
    //         { key: '/home/sysadmin/personal', title: '个人资料', icon: 'user', },
    //     ]
    // },
    {
        title: '关于',
        icon: 'info-circle-o',
        key: '/home/about'
    }
]


class Navigator extends React.Component {
    getMenus() {
        let sysType = GetSystemType();
        if (sysType === 0) {
            return hostMenus;
        }
    }

    render() {

        return (
            <div style={{ height: '100vh', overflowY: 'scroll' }}>
                <div style={styles.logo}></div>
                <CustomMenu menus={this.getMenus()} />
            </div>
        )
    }
}

const styles = {
    logo: {
        height: '32px',
        //background: 'rgba(255, 255, 255, .2)',
        margin: '16px'
    }
}

export default Navigator