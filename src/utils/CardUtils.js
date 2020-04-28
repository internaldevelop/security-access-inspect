
export function getCardHeaderStyle(mode){
    if (mode === 'main') {
        return {backgroundColor: '#0093be', color: 'white'};
    } else if (mode === 'emphasis') {
        return {backgroundColor: '#880e4f', color: 'white'};
    } else if (mode === 'info') {
        return {backgroundColor: '#00695C', color: 'white'};
    } else if (mode === 'notify') {
        return {backgroundColor: '#fff9c4', color: 'black'};
    }

    // 缺省情况下的卡片头部风格设置
    return {backgroundColor: '#0093be', color: 'white'};
}
