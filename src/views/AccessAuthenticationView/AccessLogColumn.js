import React from 'react';
import EllipsisText from '../../components/widgets/EllipsisText';
import { Tag } from 'antd';

export const columns = [
  {
    title: '序号', width: 60, dataIndex: 'index', key: 'index',
  },
  {
    title: '终端名称', width: 180, dataIndex: 'name', key: 'name',
    render: content => <EllipsisText content={content} width={180} />,
  },
  {
    title: '终端IP', width: 120, dataIndex: 'ip', key: 'ip',
  },
  {
    title: '认证结果', width: 100, dataIndex: 'auth_result', key: 'auth_result',
    render: content => {
      let color = '#389e0d';
      let tag = '认证成功';
      if (content === 2) {
        color = '#ff4d4f';
        tag = '验签失败';
      } else if (content === 3) {
        color = '#d4380d';
        tag = '解密失败';
      } else if (content === 4) {
        color = '#d46b08';
        tag = '授信过期';
      }
      return (<span>
        <Tag color={color} key={tag}>{tag}</Tag>
      </span>);
    },
  },
  {
    title: '认证时间', width: 150, dataIndex: 'auth_time', key: 'auth_time',
    sorter: (a, b) => a.auth_time.localeCompare(b.auth_time, "zh"),
  },
];
