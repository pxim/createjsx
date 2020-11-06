import {BaseClosePane} from "./BaseClosePane";
import {ScaleABar} from "../components/ScaleABar";
import {DragWidget} from '../components/DragWidget';

/*
 * @Description: 缩放拖动 图片、MC等元素的面板，目前仅支持1-2-3倍之间的缩放（An Canvas Type）- 目前用于ZDDLH5模板-ZDDLAn
 * @Author: 彭祥 (Email:245803627@qq.com)
 * @Date: 2020/3/16 10:47
 * @LastEditors: pengxiang
 * @LastEditTime: 2020/3/16 10:47
 */
export class OScaleMapPane extends BaseClosePane {
    constructor() {
        super();
    }
    init(self) {
        super.init(self);
        // this.AnObj = self;

        // cjsObj.DragWidget.init(this.AnObj.scaleMC);
        this.dragWidget = new DragWidget();
        this.dragWidget.init(this.AnObj.scaleMC);
        this.dragWidget.stopDrag();


        const scaleWidget = new ScaleABar();
        scaleWidget.init(this.AnObj.scaleBar);

        this.AnObj.scaleMC['origTransform'] = [this.AnObj.scaleMC.x, this.AnObj.scaleMC.y, this.AnObj.scaleMC.scaleX, this.AnObj.scaleMC.scaleY, this.AnObj.scaleMC.rotation, this.AnObj.scaleMC.skewX, this.AnObj.scaleMC.skewY, this.AnObj.scaleMC.regX, this.AnObj.scaleMC.regY];
        this.AnObj.addEventListener("scaleChange", this.onScaleChange.bind(this));
    }

    onScaleChange(event) {
        const scaleVal = event.data;

        this.AnObj.scaleMC.scaleX = scaleVal;
        this.AnObj.scaleMC.scaleY = scaleVal;

        const origTransform = this.AnObj.scaleMC['origTransform'];
        this.AnObj.scaleMC.setTransform(origTransform[0], origTransform[1], scaleVal, scaleVal, origTransform[4], origTransform[5], origTransform[6], origTransform[7], origTransform[8]);

        if(scaleVal <= 1) {
            this.dragWidget.stopDrag();
        }else{
            this.dragWidget.startDrag();
        }
    }
}
