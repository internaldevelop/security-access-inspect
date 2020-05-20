import React from 'react';
import authResultTag from '../../modules/antdComponents/AuthResultTag';
import MAntdTable from '../../rlib/props/MAntdTable';
import { Tag, Tooltip } from 'antd';

export function columns() {
  let colsList = [
    { title: '序号', width: 60, dataIndex: 'index' },
    { title: '终端名称', width: 160, dataIndex: 'name', myNoWrap: true, mySort: true },
    { title: '终端IP', width: 120, dataIndex: 'ip', myNoWrap: true, mySort: true },
    { title: '认证结果', width: 100, dataIndex: 'auth_result', mySort: true },
    { title: '原因', width: 100, dataIndex: 'result_cause', mySort: true },
    { title: '认证时间', width: 140, dataIndex: 'auth_time', myNoWrap: true, mySort: true },
  ];

  // 按照各列的定义构建列元素
  MAntdTable.buildColumns(colsList);

  // 认证结果设置标签组件
  _renderResultTag(colsList);

  return colsList;
}

function _renderResultTag(colsList) {
  let resultCol = MAntdTable.findColumn(colsList, 'auth_result');
  if (resultCol !== null) {
    resultCol['render'] = (content) => authResultTag(content);
  }

  resultCol = MAntdTable.findColumn(colsList, 'result_cause');
  if (resultCol !== null) {
    resultCol['render'] = (content) => authResultTag(content, true);
  }
}

