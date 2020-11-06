/*
 * @Description: 滚动条组件（竖向滚动条完成；横向未完成，可参考竖向滚动条的写法；）
 * @Author: 彭祥 (Email:245803627@qq.com)
 * @Date: 2018/2/28 17:54
 * @LastEditors: pengxiang
 * @LastEditTime: 2019/3/1 20:18
 */
export function ScrollBar() {
    function ScrollBar() {
        var _this = _super.call(this) || this;
        return _this;
    }
    var proto = ScrollBar.prototype;
    var that, sPage;
    var sPageBound;
    var sBarBound;
    var nowPageY = 0;
    var timer;
    /*
     * @param self  滚动条元件
     * @param source 被滚动的页面元件
     */
    proto.init = function (self, source) {
        that = self;
        sPage = source;

        sPage.setTransform(0,0);
        sPageBound = sPage.getTransformedBounds();
        sBarBound = that.getTransformedBounds();
        initThumbPosition();

        that.arrowUp.addEventListener('mousedown', onArrowUpMouseDown);
        that.arrowUp.addEventListener('pressup', onArrowUpPressUp);
        that.arrowDown.addEventListener('mousedown', onArrowDownMouseDown);
        that.arrowDown.addEventListener('pressup', onArrowDownPressUp);
        that.thumb.addEventListener('mousedown', onThumbMouseDown);
        document.addEventListener('wheel', onWheel);
    };

    function onArrowUpMouseDown(event) {
        timer = window.setInterval(function () {
            if(nowPageY < 0){
                nowPageY = nowPageY + 1;
                // sPage.setTransform(sPageBound.x,nowPageY);
                sPage.y = nowPageY > 0 ? 0 : nowPageY;
                updateThumbPosition();
            }
        }, 50);
    }
    function onArrowUpPressUp(event) {
        if(timer != null){
            window.clearInterval(timer);
            timer = null;
        }
    }
    function onArrowDownMouseDown(event) {
        var _height = -(sPageBound.height - sBarBound.height);
        timer = window.setInterval(function () {
            if(nowPageY > _height){
                nowPageY = nowPageY - 1;
                sPage.y = nowPageY < _height ? _height : nowPageY;
                updateThumbPosition();
            }
        }, 50);
    }
    function onArrowDownPressUp(event) {
        if(timer != null){
            window.clearInterval(timer);
            timer = null;
        }
    }
    function onWheel(event) {
        // console.log('wheelDelta: ' + event.wheelDelta, 'detail: ' + event.detail, 'deltaY: ' + event.deltaY, 'deltaX: ' + event.deltaX, 'deltaZ: ' + event.deltaZ);
        if(event.deltaY < 0){ //滚轮往上
            if(nowPageY < 0){
                nowPageY = nowPageY + 30;
                sPage.y = nowPageY > 0 ? 0 : nowPageY;
                updateThumbPosition();
            }else{
                sPage.y = nowPageY = 0;
                updateThumbPosition();
            }
        }else if (event.deltaY > 0){ //滚轮往下
            var _height = -(sPageBound.height - sBarBound.height);
            if(nowPageY > _height){
                nowPageY = nowPageY - 30;
                sPage.y = nowPageY < _height ? _height : nowPageY;
                updateThumbPosition();
            }
        }
    }

    var thumbScrollOffset;
    function onThumbMouseDown(event) {
        var target = event.currentTarget;
        thumbScrollOffset = that.stage.mouseX - target.y;

        that.thumb.addEventListener('pressmove', onThumbPressMove);
        that.thumb.addEventListener('pressup', onThumbPressUp);
        document.addEventListener('mouseout', onThumbPressUp);
    }
    function onThumbPressMove(event) {
        var target = event.currentTarget;
        var point = that.globalToLocal(that.stage.mouseX, that.stage.mouseY);
        // var tempY = point.y - 26;
        var tempY = Math.round(point.y - that.thumb.regY);
        // var limitMinY = that.arrowUp.getTransformedBounds().height;
        // var limitMaxY = that.track.getTransformedBounds().height - that.arrowUp.getTransformedBounds().height - that.thumb.getTransformedBounds().height;
        var limitMinY = 0;
        var limitMaxY = that.track.getTransformedBounds().height - that.thumb.getTransformedBounds().height;

        if(tempY >= limitMinY && tempY <= limitMaxY) {
            // console.log(tempY,Math.floor(tempY));
            target.y = tempY;
            that.thumbIcon.y = target.y + (that.thumb.getTransformedBounds().height - that.thumbIcon.getTransformedBounds().height)/2;
            updatePagePosition();
        }
    }
    function onThumbPressUp(event) {
        that.thumb.removeEventListener('pressmove', onThumbPressMove);
        that.thumb.removeEventListener('pressup', onThumbPressUp);
        document.removeEventListener('mouseout', onThumbPressUp);
    }

    function initThumbPosition() {
        //滚动条
        var arrowUpBound = that.arrowUp.getTransformedBounds();
        // that.thumb.setTransform(0,arrowUpBound.height);
        that.thumb.setTransform(0, 0);

        updateThumbIconPosition();
    }
    //更新拖动条坐标（纵坐标y）
    function updateThumbPosition() {
        //thumb坐标
        var arrowUpBound = that.arrowUp.getTransformedBounds();

        var _height = sBarBound.height - sPageBound.height;
        var per = Math.abs(nowPageY) / Math.abs(_height);
        // var thumbY = arrowUpBound.height + (that.getTransformedBounds().height - that.thumb.getTransformedBounds().height - arrowUpBound.height*2) * per;
        var thumbY = (that.getTransformedBounds().height - that.thumb.getTransformedBounds().height) * per;
        that.thumb.setTransform(0, thumbY);

        updateThumbIconPosition();
    }
    //更新 thumbIcon坐标
    function updateThumbIconPosition() {
        //thumbIcon坐标
        var thumbBound = that.thumb.getTransformedBounds();
        var iconBound = that.thumbIcon.getTransformedBounds();
        // var _x = thumbBound.x + (thumbBound.width - iconBound.width)/2;
        var _y = thumbBound.y + (thumbBound.height - iconBound.height)/2;
        that.thumbIcon.setTransform(iconBound.x, _y);
    }
    //更新内容页坐标
    function updatePagePosition() {
        var _height = -(sPageBound.height - sBarBound.height);
        // var limitMaxY = that.track.getTransformedBounds().height - that.arrowUp.getTransformedBounds().height * 2 - that.thumb.getTransformedBounds().height;
        // var per = (that.thumb.y - that.arrowUp.getTransformedBounds().height) / limitMaxY;
        var limitMaxY = that.track.getTransformedBounds().height - that.thumb.getTransformedBounds().height;
        var per = (that.thumb.y) / limitMaxY;
        nowPageY = _height * per ;
        sPage.y = nowPageY;
        // console.log(nowPageY);
    }




    //设置 滚动条是否显示 false隐藏；true显示；
    function setScrollBarVisible(bool) {
        that.visible = bool;
    }


    return proto;
}



