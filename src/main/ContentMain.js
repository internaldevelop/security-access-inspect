import React from 'react'
import { withRouter, Switch, Redirect } from 'react-router-dom'
import 'antd/dist/antd.css';
import PrivateRoute from './AppRouter/PrivateRoute'

import { GetSystemType } from "../global/environment"
import SystemLogsView from '../views/SystemLogsView'
import UsersManageView from '../views/UsersManageView'
import UserInfoView from '../views/UsersManageView/UserInfoView'
import AboutView from '../views/AboutView'
import PerformanceOverView from '../views/PerformanceOverView';
import VulnerManageInfoView from '../views/VulnerManageView/VulnerManageInfoView'
import VulnerStatisticsView from '../views/VulnerStatisticsView/VulnerStatisticsView'
import EquipAuthorizationView from '../views/EquipAuthorizationView';
import AccessAuthenticationView from '../views/AccessAuthenticationView';
import FingerprintManagementView from '../views/FingerprintManagementView';
import AssetsScanView from '../views/AssetsScanView';

@withRouter
class ContentMain extends React.Component {
  render() {
    return (
      <div style={{ padding: 16, position: 'relative' }}>
      {GetSystemType() === 0 && this.getHostSystemRoute()}  
      </div>
    )
  }

  getHostSystemRoute() {
    return (
      <Switch>
        <PrivateRoute exact path='/home/assets-scan' component={AssetsScanView} />
        <PrivateRoute exact path='/home/equip-authorization' component={EquipAuthorizationView} />
        <PrivateRoute exact path='/home/access-authentication' component={AccessAuthenticationView} />
        <PrivateRoute exact path='/home/fingerprint-management' component={FingerprintManagementView} />


        <PrivateRoute exact path='/home/log-manage/system-logs' component={SystemLogsView} />

        <PrivateRoute exact path='/home/sysadmin/users' component={UsersManageView} />
        <PrivateRoute exact path='/home/sysadmin/personal' component={UserInfoView} />

        <PrivateRoute exact path='/home/history-performance' component={PerformanceOverView} />

        <PrivateRoute exact path='/home/vulner-manage/info' component={VulnerManageInfoView} />
        <PrivateRoute exact path='/home/vulner-stat' component={VulnerStatisticsView} />

        <PrivateRoute exact path='/home/about' component={AboutView} />

        <Redirect exact from='/' to='/home' />
      </Switch>
    );
  }
}

export default ContentMain