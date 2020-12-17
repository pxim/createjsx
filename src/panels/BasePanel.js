/*
 * @Description: 基数面板类 (An Canvas)
 * @Author: 彭祥 (Email:px.i@foxmail.com QQ:245803627)
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
