/*
 * @Description: 基数面板类 (An Canvas Type)
 * @Author: 彭祥 (Email:245803627@qq.com)
 * @Date: 2020/3/9 14:44
 * @LastEditors: pengxiang
 * @LastEditTime: 2020/3/9 14:44
 */
export class BasePanel {
    constructor() {
    }
    init(self) {
        this.AnObj = self;
        this.name = this.AnObj.name;
        this.AnObj.addEventListener('mousedown', ()=>{});
    }

    setVisible(bool) {
        this.AnObj.visible = bool;
    }
}
