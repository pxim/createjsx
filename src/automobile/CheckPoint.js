/*
 * @Description: 万用表（蓄电池）- 检测点 (An Canvas)
 * @Author: 彭祥 (Email:px.i@foxmail.com QQ:245803627)
 * @Date: 2020/3/10 16:47
 * @LastEditors: pengxiang
 * @LastEditTime: 2020/3/10 16:47
 */
export default class CheckPoint {
    constructor() {
    }
    init(self) {
        this.AnObj = self;
        this.name = this.AnObj.name;

        this.reset();
    }
    setChecked(bool) {
        this.AnObj.isUsed = bool;
    }

    reset() {
        this.AnObj.isUsed = false;
        this.AnObj.nPenName = '';
        this.AnObj.gotoAndStop(0);
    }
}
