/*
 * @Description: 优化型，可以带参数的Event
 * @Author: 彭祥 (Email:px.i@foxmail.com QQ:245803627)
 * @Date: 2020-10-27 16:57
 * @LastEditors: PengXiang
 * @LastEditTime: 2020-10-27 16:57
 */
export const MsgEvent = function (type, data, bubbles, cancelable) {
    const msgEvent = new createjs.Event(type, bubbles || false, cancelable || false);
    msgEvent.data = data;
    return msgEvent;
};
