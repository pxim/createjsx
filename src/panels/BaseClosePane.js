/*
 * @Description: 基础关闭面板工具类 (An Canvas)
 * @Author: 彭祥 (Email:px.i@foxmail.com QQ:245803627)
 * @Date: 2020/1/15 15:10
 * @LastEditors: pengxiang
 * @LastEditTime: 2020/1/15 15:10
 */
export class BaseClosePane {
    constructor() {
        // this.init(self);
    }
    init(self) {
        this.AnObj = self;
        this.name = this.AnObj.name;
        // this.AnObj.visible = true;

        if(this.AnObj.closeBtn) {
            this.AnObj.closeBtn.addEventListener('mousedown', this.onCloseBtnDown.bind(this));
        }
        this.AnObj.addEventListener('mousedown', ()=>{});
    }

    onCloseBtnDown(event) {
        this.AnObj.visible = false;
    }

    setVisible(bool) {
        this.AnObj.visible = bool;
    }
}
