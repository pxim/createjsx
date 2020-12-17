/*
 * @Description: 元素和元素之间的碰撞检测
 * @Author: 彭祥 (Email:px.i@foxmail.com QQ:245803627)
 * @Date: 2020-10-27 16:54
 * @LastEditors: PengXiang
 * @LastEditTime: 2020-10-27 16:54
 */

/**
 * 元素和元素之间的碰撞检测
 * @param obj1
 * @param obj2
 * @returns {boolean|*}
 */
export const hitTestObject = function(obj1,obj2) {
    if(!obj1 || !obj2){return false;}
    //var rect = new createjs.Rectangle(0, 0, 100, 100);
    var rect1 = obj1.getBounds();
    var rect2 = obj2.getBounds();
    rect1.x = obj1.x;
    rect1.y = obj1.y;
    rect2.x = obj2.x;
    rect2.y = obj2.y;
    return rect1.intersects(rect2);
};

export const collisionTest = function(ele1, ele2) {
    var w1 = ele1.getBounds().width;
    var h1 = ele1.getBounds().height;
    var w2 = ele2.getBounds().width;
    var h2 = ele2.getBounds().height;
    var x1 = ele1.x - w1 / 2;
    var x2 = ele1.x + w1 / 2;
    var y1 = ele1.y - h1 / 2;
    var y2 = ele1.y + h1 / 2;
    var x3 = ele2.x - w2 / 2;
    var x4 = ele2.x + w2 / 2;
    var y3 = ele2.y - h2 / 2;
    var y4 = ele2.y + h1 / 2;
    //x轴重叠检测
    var collX, collY
    // console.log(x1, x2, x3, x4)
    if ((x3 > x1 && x3 < x2) || (x4 > x1 && x4 < x2)) {
        collX = true;
    } else {
        collX = false;
    }
    if ((y3 > y1 && y3 < y2) || (y4 > y1 && y4 < y2)) {
        collY = true;
    } else {
        collY = false;
    }

    return collX && collY;
};

export const hitTest = function(obj1,obj2) {
    if(!obj1 || !obj2){return false;}
    //var rect = new createjs.Rectangle(0, 0, 100, 100);
    var rect1 = obj1.getBounds();
    var rect2 = obj2.getBounds();
    rect1.x = obj1.x;
    rect1.y = obj1.y;
    rect2.x = obj2.x;
    rect2.y = obj2.y;
    return obj1.hitTest(obj2.x, obj2.y);
};
