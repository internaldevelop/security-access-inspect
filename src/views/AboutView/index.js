import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Card, Row, Col, Divider, message } from 'antd'

import SystemImage from '../../resources/image/shield-ok-icon.png'
import { Button } from '@material-ui/core';
import HttpRequest from '../../utils/HttpRequest';
import { GetSystemType, GetSystemName } from "../../global/environment"

const styles = theme => ({
    gridStyle: {
        width: '25%',
        textAlign: 'center',
    },
});
const gridStyle = {
    width: '90%',
    textAlign: 'center',
    marginLeft: '5%',
    marginBottom: 8
};

class AboutView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sysInfoReady: true,
            sysInfo: this.GetSystemInfo(),
        }
    }

    GetSystemInfo() {
        let sysInfo = {
            sysName: '电网嵌入式终端安全接入与监测系统',
            desc: '电网嵌入式终端安全接入与检测模块，具备设备接入认证、实时监测、流量审计等安全功能，并在配电网监控系统或变电站自动化监控系统中进行试点应用。',
            sysVer: '1.0.1.97',
            copyright: 'Copyright ©2019-2022 中国电科院',
            status: '运行中',
            overview: '(1) 研究嵌入式终端接入身份认证技术，研制电网嵌入式终端安全接入模块，实现电网嵌入式终端安全接入身份认证。\n' +
                '(2) 研究电网嵌入式终端运行状态检测技术，主要包括研究应用层通' +
                '信流量状态、内存使用状态、CPU使用状态等运行状态。\n' +
                '(3) 针对电网嵌入式终端设备通信安全，研究嵌入式终端通信流量监控与审计技术，研制电网嵌入式终端检测模块，具备实时监测、流量' +
                '审计等安全功能，并在配电网监控系统或变电站自动化监控系统中进行试点应用。',
        }
        return sysInfo;
    }

    render() {
        const { sysInfo, sysInfoReady } = this.state;
        if (!sysInfoReady) {
            return (<div><Button onClick={this.GetSystemInfo.bind(this)}>刷新</Button></div>);
        } else {
            return (
                <div>
                    <Row type="flex" justify="space-between">
                        <Col span={8} offset={8}>
                            <Card
                                style={{ width: 500, margin: 8 }}
                                cover={<span style={{ textAlign: 'center' }}><img alt="systemicon" style={{ width: '40%', height: '40%' }} src={SystemImage} /></span>}
                            >
                                <Card.Grid style={gridStyle}>
                                    <span style={{ color: 'blue', fontSize: '24px' }}>{sysInfo.sysName} <br /></span>
                                    <span style={{ textAlign: 'left' }}>{sysInfo.desc} <br /></span>
                                    <Divider dashed />
                                    {"系统版本: " + sysInfo.sysVer} <br />
                                    {"版权：" + sysInfo.copyright}
                                </Card.Grid>
                                <Card.Grid style={gridStyle}>{"系统状态: " + sysInfo.status}</Card.Grid>
                                <Card.Grid style={gridStyle}>{"系统概况: " + sysInfo.overview}</Card.Grid>
                            </Card>
                        </Col>
                    </Row>
                </div>
            );
        }
    }
}

AboutView.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(AboutView);