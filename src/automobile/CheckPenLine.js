/* An Canvas Type
 * @Description: 万用表 检测笔的连线
 * @Author: 彭祥 (Email:245803627@qq.com)
 * @Date: 2020/3/17 13:34
 * @LastEditors: pengxiang
 * @LastEditTime: 2020/3/17 13:34
 */
export default class CheckPenLine {
    constructor() {
        this.line = null;
        this._linePoint = null;
        this._linePoint2 = null;
        this._linePoint3 = null;
    }

    /**
     * 初始化设置
     * @param self         表笔mc
     * @param lineStroke   线条粗细
     * @param lineColor    线条颜色  #BE4E4E #515151
     * @param lineBendAmp1 线条 贝塞尔曲线第一个控制点y的弯曲幅度
     * @param lineBendAmp2 线条 贝塞尔曲线第二个控制点y的弯曲幅度
     */
    init(self, lineStroke, lineColor, lineBendAmp1, lineBendAmp2) {
        this.AnObj = self; //表笔mc
        this.name = this.AnObj.name;

        this.line = new createjs.Shape();
        this.line.mouseEnabled = false;
        this.AnObj.parent.addChild(this.line);

        this.lineStroke = lineStroke || 3;
        this.lineColor = lineColor || '#BE4E4E';
        this.lineBendAmp1 = lineBendAmp1 || 3;
        this.lineBendAmp2 = lineBendAmp2 || -2;

        const linePt = this.convertLinePointCoord();
        // this.startX = this.AnObj.x - this.AnObj.regX;
        // this.startY = this.AnObj.y;
        this.startX = linePt.x;
        this.startY = linePt.y;

    }
    //转换连线点坐标
    convertLinePointCoord() {
        const linePoint = this.AnObj.linePoint;
        const pt1 = this.AnObj.localToGlobal(linePoint.x, linePoint.y); //pointParent.localToGlobal(new Point(point.x,point.y));
        const pt2 = this.AnObj.parent.globalToLocal(pt1.x, pt1.y); //local.globalToLocal(new Point(globalPoint.x,globalPoint.y));
        return pt2;
    }
    drawLine() {
        const g = this.line.graphics;
        const nowPt = this.convertLinePointCoord();

        // g.setStrokeStyle(3).beginStroke("#ff0000").moveTo(this.startX, this.startY).lineTo(this.AnObj.x - this.AnObj.regX, this.AnObj.y);
        // g.setStrokeStyle(this.lineStroke).beginStroke(this.lineColor).moveTo(this.startX, this.startY).lineTo(nowPt.x, nowPt.y);
        const difPtX = nowPt.x - this.startX;
        const difPtY = nowPt.y - this.startY;
        const pt1 = new createjs.Point(this.startX + difPtX*0.3, this.startY + difPtY * this.lineBendAmp1);
        const pt2 = new createjs.Point(this.startX + difPtX*0.6, this.startY + difPtY * this.lineBendAmp2);
        g.clear();
        g.setStrokeStyle(this.lineStroke).beginStroke(this.lineColor).moveTo(this.startX, this.startY).bezierCurveTo(pt1.x, pt1.y, pt2.x, pt2.y, nowPt.x, nowPt.y);
    }

    clearLine() {
        this.line.graphics.clear();
    }

    drawLine1() {
        var _loc_1 = null;
        var _loc_2 = null;
        var _loc_3 = null;
        const g = this.line.graphics;
        this.line.graphics.clear();
        // this.line.graphics.lineStyle(this._lineThick, this._lineColor);
        // this.line.graphics.lineStyle(3, this._lineColor);
        // this.line.graphics.beginFill(this._lineColor);
        g.setStrokeStyle(3);
        g.beginStroke(this._lineColor);
        // g.beginFill("red");
        // g.drawCircle(0,0,30);
        _loc_2 = new createjs.Point(this.startX + this._linePoint.x, this.startY + this._linePoint.y);
        if (this.AnObj.currentFrame === 0)
        {
            _loc_3 = new createjs.Point(this.AnObj.x + this._linePoint.x, this.AnObj.y + this._linePoint.y);
        }
        else
        {
            _loc_3 = new createjs.Point(this.AnObj.x + this._linePoint2.x, this.AnObj.y + this._linePoint2.y);
        }
        this.line.graphics.moveTo(_loc_2.x, _loc_2.y);
        if (_loc_2.x === _loc_3.x && _loc_2.y === _loc_3.y)
        {
            return;
        }
        if (_loc_3.y - _loc_2.y >= -20)
        {
            this.line.graphics.curveTo(_loc_2.x, _loc_2.y - 40, (_loc_3.x - _loc_2.x) / 4 + _loc_2.x, _loc_2.y - 40);
            this.line.graphics.curveTo((_loc_3.x - _loc_2.x) / 2 + _loc_2.x, _loc_2.y - 40, (_loc_3.x - _loc_2.x) / 2 + _loc_2.x, _loc_2.y);
            this.line.graphics.curveTo((_loc_3.x - _loc_2.x) / 2 + _loc_2.x, _loc_3.y - _loc_2.y + 40 + _loc_3.y, (_loc_3.x - _loc_2.x) * 3 / 4 + _loc_2.x, _loc_3.y - _loc_2.y + 40 + _loc_3.y);
            this.line.graphics.curveTo(_loc_3.x, _loc_3.y - _loc_2.y + 40 + _loc_3.y, _loc_3.x, _loc_3.y);
        }
        else if (Math.abs(_loc_3.x - _loc_2.x) < 20)
        {
            _loc_1 = this.caculatePoint(_loc_2.x, _loc_2.y, _loc_3.x, _loc_3.y, "1");
            this.line.graphics.curveTo(_loc_1.x, _loc_1.y, _loc_3.x, _loc_3.y);
        }
        else
        {
            _loc_1 = this.caculatePoint(_loc_2.x, _loc_2.y, (_loc_3.x + _loc_2.x) / 2, (_loc_3.y + _loc_2.y) / 2, "1");
            this.line.graphics.curveTo(_loc_1.x, _loc_1.y, (_loc_3.x + _loc_2.x) / 2, (_loc_3.y + _loc_2.y) / 2);
            _loc_1 = this.caculatePoint((_loc_3.x + _loc_2.x) / 2, (_loc_3.y + _loc_2.y) / 2, _loc_3.x, _loc_3.y, "2");
            this.line.graphics.curveTo(_loc_1.x, _loc_1.y, _loc_3.x, _loc_3.y);
        }
        return;
    }

    /**
     *
     * @param param1 Number
     * @param param2 Number
     * @param param3 Number
     * @param param4 Number
     * @param param5 String
     * @returns {*}
     */
    caculatePoint(param1, param2, param3, param4, param5) {
        var _loc_6 = new createjs.Point();
        switch(param5)
        {
            case "1":
            {
                _loc_6.x = param1;
                _loc_6.y = param4;
                break;
            }
            case "2":
            {
                _loc_6.x = param3;
                _loc_6.y = param2;
            }
            default:
            {
                break;
            }
        }
        return _loc_6;
    }
}
