/*
 * @Description: 拖动组件（随意拖动mc到任何位置） 参考模板 DLT
 * @Author: 彭祥 (Email:px.i@foxmail.com QQ:245803627)
 * @Date: 2020-10-27 16:52
 * @LastEditors: PengXiang
 * @LastEditTime: 2020-10-27 16:52
 */
export class DragWidget {
    constructor() {
        this.onMDown = this.onMDown.bind(this);
        this.onMUp = this.onMUp.bind(this);
        this.onMMove = this.onMMove.bind(this);
    }
    /**
     * 初始化函数，默认允许拖动
     * @param obj    拖动元件
     * @param isTop  拖动的时候是否置顶，设置为最上层；默认 false
     */
    init(obj, isTop) {
        // if(!obj){return false;}
        this.oldX = 0;
        this.oldY = 0;
        this.AnObj = obj;
        this.isTop = isTop || false;
        this.AnObj.addEventListener("mousedown", this.onMDown);
        this.AnObj.addEventListener("pressup", this.onMUp);
    }
    onMDown(event) {
        const target = event.currentTarget; // target.startDrag();
        if(this.isTop === true) {
            this.AnObj.parent.setChildIndex(target, this.AnObj.parent.numChildren - 1);
        }
        this.oldX = event.stageX;
        this.oldY = event.stageY;
        target.addEventListener("pressmove", this.onMMove);
    }
    onMUp(event) {
        const target = event.currentTarget; // target.stopDrag();
        target.removeEventListener("pressmove", this.onMMove);
        // that.setChildIndex(target, that.numChildren - 1);
    }
    onMMove(event){
        // const target = event.currentTarget;
        // const point = this.AnObj.globalToLocal(this.AnObj.stage.mouseX, this.AnObj.stage.mouseY);
        // target.x = point.x;
        // target.y = point.y;

        event.currentTarget.x += event.stageX - this.oldX;
        event.currentTarget.y += event.stageY - this.oldY;
        this.oldX = event.stageX;
        this.oldY = event.stageY;
    }

    /**
     * 停止拖动
     */
    stopDrag() {
        this.AnObj.removeEventListener("mousedown", this.onMDown);
        this.AnObj.removeEventListener("pressup", this.onMUp);
        this.AnObj.removeAllEventListeners();
    }
    /**
     * 开始拖动
     */
    startDrag() {
        this.AnObj.addEventListener("mousedown", this.onMDown);
        this.AnObj.addEventListener("pressup", this.onMUp);
    }
}
