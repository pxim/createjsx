import {MsgEvent} from "./MsgEvent";

/*
 * @Description: 缩放控件A（从1-2-3倍之间切换，有文字显示倍数）（An Canvas Type）
 * @Author: 彭祥 (Email:245803627@qq.com)
 * @Date: 2018/2/28 17:54
 * @LastEditors: pengxiang
 * @LastEditTime: 2019/3/1 20:18
 */
export class ScaleABar {
    constructor() {
        this.nScaleIndex = 1;
        this.nScaleVal = 1;
    }
    init(self) {
        this.AnObj = self;
        this.AnObj.scaleBtn.cursor = 'pointer';
        this.AnObj.scaleBtn.addEventListener('mousedown', this.onScaleBtnDown.bind(this));
    }

    onScaleBtnDown(event) {
        let bIndex = 0;
        switch (this.nScaleIndex) {
            case 1 :
                this.nScaleIndex = 2;
                this.nScaleVal = 2;
                bIndex = 0;
                break;
            case 2 :
                this.nScaleIndex = 3;
                this.nScaleVal = 3;
                bIndex = 1;
                break;
            case 3 :
                this.nScaleIndex = 4;
                this.nScaleVal = 2;
                bIndex = 1;
                break;
            case 4 :
                this.nScaleIndex = 1;
                this.nScaleVal = 1;
                bIndex = 0;
                break;
        }

        const uStr = this.AnObj.scaleTxt.text.charAt(this.AnObj.scaleTxt.text.length - 1);
        this.AnObj.scaleTxt.text =  this.nScaleVal.toString() +  uStr;
        this.AnObj.scaleBtn.gotoAndStop(bIndex);

        this.AnObj.parent.dispatchEvent(new MsgEvent('scaleChange', this.nScaleVal, false, false));
    }
}
