/*
 * @Author: your name
 * @Date: 2020-03-19 09:38:11
 * @LastEditTime: 2020-03-19 13:03:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \landManagef:\study\AwesomeProject\app\utils\px2dp.js
 */
'use strict';

import { Dimensions } from 'react-native';

// device width/height
//const deviceWidthDp = Dimensions.get('window').width;
const deviceHeightDp = Dimensions.get('window').width;
// design width/height
const uiHeightPx = 1080;

export default function px2dp(uiElementPx) {
    //console.log(deviceWidthDp);
    //console.log(deviceHeightDp);
    return uiElementPx * deviceHeightDp / uiHeightPx;
}