import {BaseClosePane} from "./BaseClosePane";
import {ScrollBar} from "../components/ScrollBar";
import {getHMSTime} from "devlibx";

/*
 * @Description: 操作记录面板，实训记录面板（An Canvas Type）- 目前用于ZDDLH5模板-ZDDLAn
 * @Author: 彭祥 (Email:245803627@qq.com)
 * @Date: 2020/3/16 10:23
 * @LastEditors: pengxiang
 * @LastEditTime: 2020/3/16 10:23
 */
export class ORecordPane extends BaseClosePane {
    constructor() {
        super();
    }
    init(self) {
        super.init(self);

        this.AnObj.scrollPage.txt.text = '' + '\n' + '\n';

        this.scrollBarWidget  = new ScrollBar();
        this.scrollBarWidget.init(this.AnObj.scrollBar, this.AnObj.scrollPage);

        // const str = '   1.1点击电路图；';
        // for(let i=0;i<300;i++){
        //     this.AnObj.scrollPage.txt.text = this.AnObj.scrollPage.txt.text + str + i + '\n';
        // }
        // // console.log(this.AnObj.scrollPage.txt.text);
        // this.scrollBarWidget.init(this.AnObj.scrollBar, this.AnObj.scrollPage);

        this.AnObj.parent.parent.addEventListener('add_record_msg', this.onAddMsg.bind(this));
    }

    onAddMsg(event) {
        this.addMsg(event.data);
    }
    addMsg(str) {
        this.AnObj.scrollPage.txt.text = this.AnObj.scrollPage.txt.text + '  ' + getHMSTime()  + '   ' + str + '\n';

        this.scrollBarWidget.init(this.AnObj.scrollBar, this.AnObj.scrollPage);
    }
}
