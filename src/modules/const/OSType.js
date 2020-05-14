const _osNameList = ['未知操作系统', 'Centos', 'Ubuntu'];
export const OSType = {
    UNKNOWN: 0,      // 未知操作系统
    CENTOS: 1,      // Centos
    UBUNTU: 2,      // Ubuntu
};

export function getOSName(osType) {
    if ((osType >= _osNameList.length) || (osType < 0))
        return _osNameList[OSType.UNKNOWN];
        
    return _osNameList[osType];
}
