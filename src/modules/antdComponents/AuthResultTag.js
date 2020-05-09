import React from 'react';
import { Tag } from 'antd';
import MObjUtils from '../../rlib/utils/MObjUtils';

export default function authResultTag(authResult) {
    if (MObjUtils.isString(authResult)) {
        authResult = parseInt(authResult);
    }

    if (!MObjUtils.isNumber(authResult)) {
        return (<div></div>);
    }

    let color = '#d4380d';
    let tag = '未知状态';
    if (authResult === 2) {
        color = '#ff4d4f';
        tag = '验签失败';
    } else if (authResult === 3) {
        color = '#d4380d';
        tag = '解密失败';
    } else if (authResult === 4) {
        color = '#d46b08';
        tag = '授信过期';
    } else if (authResult === 1) {
        color = '#389e0d';
        tag = '认证成功';
    }
    return (<span>
        <Tag color={color} key={tag}>{tag}</Tag>
    </span>);
}
