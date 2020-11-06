/* An Canvas Type
 * @Description: 万用表（蓄电池）- 检测点
 * @Author: 彭祥 (Email:245803627@qq.com)
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
