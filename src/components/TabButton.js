import {EventDispatcher} from "devlibx";


/*
 * @Description: Tab按钮组件
 * @Author: 彭祥 (Email:px.i@foxmail.com QQ:245803627)
 * @Date: 2020-10-20 09:17
 * @LastEditors: PengXiang
 * @LastEditTime: 2020-10-20 09:17
 */
export class TabButton {
    constructor(btnAry) {
        this.tabBtnAry = btnAry || [];
        this.init();
    }
    init() {
        this.tabBtnAry.forEach((item)=>{
            // item.cursor = 'pointer';
            item.addEventListener('mousedown', this.onDownTabBtn.bind(this));
        });
    }

    onDownTabBtn(event) {
        // const target = event.currentTarget;
        this.setTabSelected(event.currentTarget);
    }

    /**
     * 设置当前选中的元素
     * @param el
     */
    setTabSelected(el) {
        if(!el){el={name:''}}
        this.setTabBtnState(el);
        // this.setTabPaneState(el);
        this.dispatchEvent( { type: 'selected', message: el.name } );
    }
    setTabBtnState(el) {
        this.tabBtnAry.forEach((item)=>{
            if(item.name === el.name) {
                item.gotoAndStop(1);
                item.mouseEnabled = false;
                item.mouseChildren = false;
            }else{
                item.gotoAndStop(0);
                item.mouseEnabled = true;
                item.mouseChildren = true;
            }
        })
    }
}

// 将 EventDispatcher.prototype 与自定义对象 prototype 进行混合
Object.assign( TabButton.prototype, EventDispatcher.prototype );
