
# createjsx
## 介绍 / Intro
基于 createjs 和 adobe animate 扩展的一些工具和方法。   

因此使用此库前，必须保证有 createjs 环境：

1. html 页面引入 createjs  

2. js 里 引入 [createjs](https://www.npmjs.com/package/createjs-libs) 
   ```javascript
    import createjs from 'createjs-libs'
   ```

这两种方法，使用一种即可。


## 安装 / Install
```
npm i createjsx
```

## 引入 / Import

### import 整个包  

```javascript
import * as cjsx from 'createjsx'
```

### import 单个组件

```javascript
import {DragWidget} from 'createjsx'
```

## 使用 / Use  
```javascript
const widget = new cjsx.DragWidget();    
widget.init(mc);   
```

## 组件 / Component

| 组件               | 说明                 | 使用 | 备注 |
| ------------------ | -------------------- | ---- | ---- |
| `DragWidget `  | 拖拽组件             |      |      |
| `TabButton`    | Tab组件              |      |      |
| `ButtonHelper` | 悬浮按钮             |      |      |
| `CustomVideoPlayer` | 视频播放器           |      |      |
| `HitTest`      | 碰撞检测类           |      |      |
| `MsgEvent`     | 可以携带参数的事件类 |      |      |
| `ScrollBar`        | 滚动条               |      |      |
| `ScaleWidget`  | 缩放组件             |      |      |
|                    |                      |      |      |
|                    |                      |      |      |
|                    |                      |      |      |
|                    |                      |      |      |
|                    |                      |      |      |
|                    |                      |      |      |

