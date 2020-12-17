import {MsgEvent} from "../components/MsgEvent";
import {hitTestObject} from "../components/HitTest";
import CheckPoint from "./CheckPoint";

/* An Canvas Type
 * @Description: 万用表（蓄电池）- 检测表笔
 * @Author: 彭祥 (Email:px.i@foxmail.com QQ:245803627)
 * @Date: 2020/3/10 16:49
 * @LastEditors: pengxiang
 * @LastEditTime: 2020/3/10 16:49
 */
export default class CheckPen {
    constructor() {
    }

    /*
     * @param self            表笔元件
     * @param isTop           拖动时是否置顶
     * @param checkPointAry   检测点数组
     */
    init(self, isTop, checkPointAry) {
        this.AnObj = self;
        this.name = this.AnObj.name;
        this.isTop = isTop || true;
        this.checkPointAry = checkPointAry || [];

        this.AnObj.gotoAndStop(0);
        this.AnObj.isUsed = false;
        this.AnObj["orgX"] = this.AnObj.x;
        this.AnObj["orgY"] = this.AnObj.y;
        this.AnObj.addEventListener("mousedown", this.onPenDown.bind(this));
        this.AnObj.addEventListener("pressup", this.onPenUp.bind(this));
    }

    onPenDown(event) {
        const target = event.currentTarget;
        target.cursor = 'none';
        target.gotoAndStop(0);
        if(this.isTop === true){this.AnObj.parent.setChildIndex(target, this.AnObj.parent.numChildren - 1);}
        target.addEventListener("pressmove", this.onPenMove.bind(this));
        this.checkHit(target);
    }
    onPenUp(event) {
        const target = event.currentTarget;
        target.removeEventListener("pressmove", this.onPenMove.bind(this));
        target.cursor = 'default';
        this.isHit = true;
        this.checkHit(target);
    }
    onPenMove(event) {
        const target = event.currentTarget;
        const point = this.AnObj.parent.globalToLocal(this.AnObj.parent.stage.mouseX, this.AnObj.parent.stage.mouseY);
        target.x = point.x;
        target.y = point.y;

        this.checkHit(target);

        this.AnObj.parent.dispatchEvent(new MsgEvent('check_pen_move', {penName:target.name}, false, false));
    }

    checkHit(target) {
        const CPointAry = this.checkPointAry;
        // const CPin = target.pin;//检测笔的笔尖
        const nowCheckPoint = CPointAry.find((item)=>{
            return hitTestObject(target, item) === true;
        });

        if(nowCheckPoint){
            if(nowCheckPoint.isUsed === false){
                nowCheckPoint.gotoAndStop(1);
                this.oldCheckPoint = nowCheckPoint;

                if(this.isHit === true){
                    this.setPenInfo(target, nowCheckPoint);
                    nowCheckPoint.isUsed = true;
                    nowCheckPoint.nPenName = target.name;
                    return false;
                }

            }else{
                if(this.isHit === true){
                    this.resetPenInfo(target);
                    if(target.name === nowCheckPoint.nPenName) {
                        nowCheckPoint.isUsed = false;
                        nowCheckPoint.nPenName = "";
                        return false;
                    }
                }else{
                    if(target.name === nowCheckPoint.nPenName) {
                        nowCheckPoint.isUsed = false;
                        nowCheckPoint.nPenName = "";
                        return false;
                    }
                }
            }
            console.log(nowCheckPoint.name);
            return false;
        }else {
            if(this.oldCheckPoint){
                this.oldCheckPoint.gotoAndStop(0);
                // this.AnObj.gotoAndStop(0);
                this.AnObj.parent.dispatchEvent(new MsgEvent('check_pen_nohit_point', {penName:target.name, pointName:''}, false, false));
            }

            if(this.isHit === true) {
                // if(this.oldCheckPoint){this.oldCheckPoint.isUsed = false;}
                this.resetPenInfo(target);
                if(this.oldCheckPoint && this.oldCheckPoint.isUsed === true && this.oldCheckPoint.nPenName === target.name) {
                    this.oldCheckPoint.isUsed = false;
                    this.oldCheckPoint.nPenName = "";
                    this.oldCheckPoint = null;
                }
            }
        }
    }

    /*当前拖动元件和检测区域 碰撞之后，设置当前拖动元件的相关属性*/
    setPenInfo(target, nCheckPoint) {
        target.x = nCheckPoint.x;
        target.y = nCheckPoint.y;
        target.isUsed = true;
        target.nPointName = nCheckPoint.name;
        target.gotoAndStop(1);
        this.isHit = false;
        console.log(target.name, 'check true');
        this.AnObj.parent.dispatchEvent(new MsgEvent('check_pen_hited_point', {penName:target.name, pointName:nCheckPoint.name}, false, false));
    }
    /*重置拖动元件的位置等相关属性*/
    resetPenInfo(target) {
        target.x = target.orgX;
        target.y = target.orgY;
        target.isUsed = false;
        target.nPointName = '';
        target.gotoAndStop(0);
        this.isHit = false;
        console.log(target.name, 'check false');
        this.AnObj.parent.dispatchEvent(new MsgEvent('check_pen_nohit_point', {penName:target.name, pointName:''}, false, false));
    }

    //设置检测点数组，返回检测点实例化CheckPoint的数组
    setCheckPointList(ary) {
        this.checkPointAry = ary || [];

        this.checkPointWgtAry = [];
        this.checkPointWgtAry = this.checkPointAry.map((item)=>{
            const pointWgt = new CheckPoint();
            pointWgt.init(item);
            return pointWgt;
        });
        return this.checkPointWgtAry;
    }
    reset(){
       this.resetPenInfo(this.AnObj);
    }
}
