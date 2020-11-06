import {EventDispatcher} from "devlibx";

//使用帮参考
//this.scaleWidget = new cjsx.ScaleWidget();
//this.scaleWidget.init(this.AnObj.scalePane);
//this.scaleWidget.addEventListener("scaleChange", this.onScaleChange.bind(this)); //携带缩放倍数值

/*
 * @Description: 缩放组件（有放大按钮，缩小按钮，倍数显示文字，按住按钮可以一直放大或者缩小） 参考模板 DLT
 * @Author: 彭祥 (Email:px.i@foxmail.com QQ:245803627)
 * @Date: 2020-10-28 09:46
 * @LastEditors: PengXiang
 * @LastEditTime: 2020-10-28 09:46
 *
 */
export class ScaleWidget {
    constructor() {
        this.onDownHighBtn = this.onDownHighBtn.bind(this);
        this.onUpHighBtn = this.onUpHighBtn.bind(this);
        this.onDownLowBtn = this.onDownLowBtn.bind(this);
        this.onUpLowBtn = this.onUpLowBtn.bind(this);
        this.onWheel = this.onWheel.bind(this);
        this.onTick1 = this.onTick1.bind(this);
        this.onTick2 = this.onTick2.bind(this);

        this.enable = false;
    }

    /**
     * 初始化函数，默认1倍大小（1倍大小 = 100缩放值）
     * @param self   缩放面板mc
     * @param minNum 最小缩放值；默认100
     * @param maxNum 最大缩放值；默认500
     * @param speedNum 按下放大、缩小按钮后，每次增加或减少的数值差；默认1
     * @param wheelSpeedNum PC端使用滚动后，每次增加或减少的数值差；默认10
     */
    init(self, minNum, maxNum, speedNum, wheelSpeedNum) {
        this.AnObj = self;
        this.name = this.AnObj.name;

        this.nowNum = 100;
        this.minNum = minNum || 100;
        this.maxNum = maxNum || 500;
        this.speedNum = speedNum || 1;
        this.wheelSpeedNum = wheelSpeedNum || 10;

        this.AnObj.highBtn.addEventListener('mousedown', this.onDownHighBtn);
        this.AnObj.highBtn.addEventListener('pressup', this.onUpHighBtn);
        this.AnObj.highBtn.addEventListener('mouseout', this.onUpHighBtn);

        this.AnObj.lowBtn.addEventListener('mousedown', this.onDownLowBtn);
        this.AnObj.lowBtn.addEventListener('pressup', this.onUpLowBtn);
        this.AnObj.lowBtn.addEventListener('mouseout', this.onUpLowBtn);

        document.addEventListener('wheel', this.onWheel);

        this.AnObj.inputTxt.text = this.nowNum.toString();
    }

    onDownHighBtn(event) {
        if(this.nowNum > this.maxNum) {
            this.AnObj.inputTxt.text = String(this.maxNum);
        }

        if(this.nowNum < this.minNum) {
            this.AnObj.inputTxt.text = String(this.minNum);
        }
        this.nowNum = parseInt(this.AnObj.inputTxt.text);
        // createjs.Ticker.addEventListener("tick", this.onTick1);
        this.AnObj.addEventListener('tick', this.onTick1);
    }
    onUpHighBtn(e) {
        // createjs.Ticker.removeEventListener("tick", this.onTick1);
        this.AnObj.removeEventListener('tick', this.onTick1);
    }

    onDownLowBtn(e) {
        if(this.nowNum > this.maxNum) {
            this.AnObj.inputTxt.text = String(this.maxNum);
        }

        if(this.nowNum < this.minNum) {
            this.AnObj.inputTxt.text = String(this.minNum);
        }

        this.nowNum = parseInt(this.AnObj.inputTxt.text);
        // createjs.Ticker.addEventListener("tick", this.onTick2);
        this.AnObj.addEventListener('tick', this.onTick2);
    }
    onUpLowBtn(e) {
        // createjs.Ticker.removeEventListener("tick", this.onTick2);
        this.AnObj.removeEventListener('tick', this.onTick2);
    }

    onTick1(event) {
        if(event.paused){return false;}
        this.nowNum = this.nowNum + this.speedNum;
        if(this.nowNum > this.maxNum) {
            this.nowNum = this.maxNum;
        }
        this.AnObj.inputTxt.text = this.nowNum.toString();
        // this.dispatchEvent(new Event("scaleChange"));
        this.dispatchEvent( { type: 'scaleChange', message: 'button', data: this.nowNum } );
    }
    onTick2(event) {
        if(event.paused){return false;}
        this.nowNum = this.nowNum - this.speedNum;
        if(this.nowNum < this.minNum) {
            this.nowNum = this.minNum;
        }
        this.AnObj.inputTxt.text = this.nowNum.toString();
        // this.dispatchEvent(new Event("scaleChange"));
        this.dispatchEvent( { type: 'scaleChange', message: 'button', data: this.nowNum } );
    }


    onWheel(event) {
        // console.log('wheelDelta: ' + events.wheelDelta, 'detail: ' + events.detail, 'deltaY: ' + events.deltaY, 'deltaX: ' + events.deltaX, 'deltaZ: ' + events.deltaZ);
        let delta = event.deltaY;
        // let offNum = delta * 0.1;
        if(delta < 0) { //滚轮往上
            // offX = that.circuitMC.scaleX - 0.1;
            // offY = that.circuitMC.scaleY - 0.1;
            this.nowNum = this.nowNum - this.wheelSpeedNum;
            if(this.nowNum < this.minNum) {this.nowNum = this.minNum;}

        }else if(delta > 0) { //滚轮往下
            // offX = that.circuitMC.scaleX + 0.1;
            // offY = that.circuitMC.scaleY + 0.1;
            this.nowNum = this.nowNum + this.wheelSpeedNum;
            if(this.nowNum > this.maxNum) {this.nowNum = this.maxNum;}
        }

        // that.scalePane.inputTxt.text = (that.circuitMC.scaleX * 100).toFixed(0);
        this.AnObj.inputTxt.text = this.nowNum.toFixed(0);

        this.dispatchEvent( { type: 'scaleChange', message: 'wheel', data: this.nowNum } );
    }


    /**
     * 设置禁用此组件的交互，默认 true
     * @param bool true：允许  false：禁用
     */
    setEnabled(bool) {
        this.AnObj.mouseChildren = bool;
        this.AnObj.mouseEnabled = bool;

        if(bool === true){
            document.addEventListener('wheel', this.onWheel);
        }else{
            document.removeEventListener('wheel', this.onWheel);
        }
    }

    /**
     * 添加鼠标滚轮事件监听
     */
    onMouseWheel() {
        document.addEventListener('wheel', this.onWheel);
    }
    /**
     * 删除鼠标滚轮事件监听
     */
    offMouseWheel() {
        document.removeEventListener('wheel', this.onWheel);
    }

}

// 将 EventDispatcher.prototype 与自定义对象 prototype 进行混合
Object.assign( ScaleWidget.prototype, EventDispatcher.prototype );


