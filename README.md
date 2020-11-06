
## createjsx
createjs的一些工具方法  
**注意：**   
此工具库只适用于基于createjs库的开发。  
使用此库前，必须保证有createjs环境：  
①html页面引入createjs  
②或者import createjs  
`import createjs from 'createjs-libs'`  
https://www.npmjs.com/package/createjs-libs  

### install
`npm i createjsx`

### import整个组件工具包  
`import * as cjsx from 'createjsx'`

#### 组件  
`DragWidget`   
`TabButton`  
`ButtonHelper`  
`CustomVideoPlayer`  
`HitTest`  
`MsgEvent`  
`ScrollBar`  

#### Use  
`
const widget = new cjsx.DragWidget();  
widget.init(mc);  
`


### import单个组件
`import {TabButton} from 'createjsx'`
