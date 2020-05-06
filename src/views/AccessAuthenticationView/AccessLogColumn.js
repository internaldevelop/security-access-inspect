import React from 'react';
import EllipsisText from '../../components/widgets/EllipsisText';

export const columns = [
  {
    title: '序号', width: 60, dataIndex: 'index', key: 'index',
  },
  {
    title: '终端名称', width: 180, dataIndex: 'name', key: 'name',
    render: content => <EllipsisText content={content} width={180}/>,
  },
  {
    title: '终端IP', width: 120, dataIndex: 'ip', key: 'ip',
  },
  {
    title: '认证结果', width: 100, dataIndex: 'auth_result', key: 'auth_result',
  },
  {
    title: '认证时间', width: 150, dataIndex: 'auth_time', key: 'auth_time',
    sorter: (a, b) => a.create_time.localeCompare(b.create_time, "zh"),
  },
];
