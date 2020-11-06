/*
 * @Description: 自定义视频播放器控件的组件（基于Canvas的）；
 * @Author: 彭祥 (Email:245803627@qq.com)
 * @Date: 2018/9/25 14:15
 * @LastEditors: pengxiang
 * @LastEditTime: 2019/2/28 14:15
 */
//************************************************************************************************//
// 此组件使用方法
// init(el, false, _this);
//************************************************************************************************//
import {getBrowser} from 'devlibx';
import {convertTime} from 'devlibx';

export function CustomVideoPlayer() {
    function CustomVideoPlayer() {
        var _this = _super.call(this) || this;
        return _this;
    }

    var proto = CustomVideoPlayer.prototype;
    var that;
    var defaultVideo, defaultVideoName = '', isPlayerUsed = false; //当前视频播放器是否在被使用
    var progressTime; //记录播放进度的计时器
    /*
     * 创建自定义的视频播放器
     * @param video         视频元素
     * @param self          控制栏所在Canvas元素的绘图区域（exportRoot）
     * @constructor
     */
    proto.init = function(videoName, self) {
        that = self;
        isPlayerUsed = true;
        defaultVideoName = videoName;
        defaultVideo = document.getElementById(videoName);
        defaultVideo.addEventListener('ended', onVideoMCEnd); //停止
        defaultVideo.addEventListener('play', onVideoMCPlay); //播放
        defaultVideo.addEventListener('pause', onVideoMCPause); //暂停
        defaultVideo.addEventListener('durationchange', onVideoMCDurationChange); //当媒介长度改变时运行的脚本，意思是视频路径更改-有效路径 时 触发；
        defaultVideo.addEventListener('loadedmetadata', onVideoMCLoadedmetadata); //当元数据（比如分辨率和时长）被加载时运行的脚本。
        defaultVideo.addEventListener('timeupdate', onVideoMCTimeupdate); //当播放位置改变时（比如当用户快进到媒介中一个不同的位置时）运行的脚本。
        // el.play();

        initControlBar();
    };

    function onVideoMCPlay(event) {
        that.playStopBtn.gotoAndStop(1);
        if(progressTime){window.clearInterval(progressTime); progressTime = null;}
        progressTime = window.setInterval(onProgressInterval, 50);
        window.postMessage(JSON.stringify({type:'slide_page_play'}), "*");
    }
    function onVideoMCPause(event) {
        that.playStopBtn.gotoAndStop(0);
        if(progressTime) {window.clearInterval(progressTime); progressTime = null;}
        window.postMessage(JSON.stringify({type:'slide_page_pause'}), "*");
    }
    function onVideoMCEnd(event) {
        if(progressTime) {window.clearInterval(progressTime); progressTime = null;}
        that.playStopBtn.gotoAndStop(0);
        window.postMessage(JSON.stringify({type:'slide_page_completed'}), "*");
    }
    function onVideoMCDurationChange(event) {
        defaultVideo.muted = false;
    }
    function onVideoMCLoadedmetadata(event) {
        var _video = event.currentTarget;
        setTotalTimeTxt(_video.duration);
    }
    function onVideoMCTimeupdate(event) {
        var _video = event.currentTarget;
        updateCurrentTimeTxt(_video.currentTime);
    }

    function onProgressInterval() {
        var per = defaultVideo.currentTime/defaultVideo.duration;
        if(per){
            updateProgressBarWidth(per);
            // console.log(_video.currentTime,_video.duration,_video.currentTime/_video.duration);
        }
    }


//———————————————————————————————————————canvas video 控制栏 开始——————————————————————————————————————————————————————//

    function initControlBar() {
        that.progressBar.trackMC.scaleX = 0;
        that.progressBar.pointBtn['origX'] = that.progressBar.pointBtn.x;
        if(that.playStopBtn){that.playStopBtn.addEventListener('mousedown', onPlayAndStopBtnClick);}
        if(that.replayBtn){ that.replayBtn.addEventListener('mousedown', onReplayBtnClick); }
        if(that.muteBtn){ that.muteBtn.addEventListener('mousedown', onMuteBtnClick); }

        var browserInfo = getBrowser();
        var BrowserType = browserInfo.browser;
        //注：Chrome下视频的路径必须是https的绝对路径（比如 http://www.w3school.com.cn/example/html5/mov_bbb.mp4），才能实现拖动进度条刷新视频时间这个功能，本公司并没有这个资源，因此暂时屏蔽Chrome下的此功能；
        if(BrowserType !== "Chrome"){
            that.progressBar.barBtn.addEventListener('mousedown', onProgressBtnClick);
            that.progressBar.pointBtn.addEventListener("mousedown", onPointBtnDown);
            that.progressBar.pointBtn.addEventListener("pressup", onPointBtnUp);
        }
        // alert("browser:"+browserInfo.browser+" version:"+browserInfo.version);
    }

    function onPlayAndStopBtnClick(event) {
        var target = event.currentTarget;
        if(target.currentFrame === 0) {
            defaultVideo.play();
            onVideoMCPlay();
        }else if(target.currentFrame === 1) {
            defaultVideo.pause();
        }
    }
    function onReplayBtnClick(event) {
        proto.reload();
    }
    function onMuteBtnClick(event) {
        var target = event.currentTarget;
        if(target.currentFrame === 0){
            target.gotoAndStop(1);
            defaultVideo.muted = true;
            // window.postMessage(JSON.stringify({type:'slide_page_mute_sound', data:true}), "*");
        }else if(target.currentFrame === 1) {
            target.gotoAndStop(0);
            defaultVideo.muted = false;
            // window.postMessage(JSON.stringify({type:'slide_page_mute_sound', data:false}), "*");
        }
    }


    function onProgressBtnClick(event) {
        updateProgressBarInfo();
    }
    function onPointBtnDown(event) {
        var target = event.currentTarget;
        that.setChildIndex(target, that.numChildren - 1);
        target.addEventListener("pressmove",onPointBtnMove);
        defaultVideo.pause();
    }
    function onPointBtnUp(event) {
        var target = event.currentTarget;
        target.removeEventListener("pressmove",onPointBtnMove);
        that.setChildIndex(target, that.numChildren - 1);
    }
    function onPointBtnMove(event) {
        var target = event.currentTarget;
        // var point = that.globalToLocal(that.stage.mouseX, that.stage.mouseY);
        // target.x = point.x - 40.5;
        // target.y = point.y - 47.5;
        // target.x = point.x;
        updateProgressBarInfo();
    }


    //更新进度条信息（进度条长度，进度条圆点按钮X坐标，视频播放进度，时间文本）
    function updateProgressBarInfo() {
        defaultVideo.pause();
        //更新进度条长度（pointBtn+trackMC）
        var point = that.globalToLocal(that.stage.mouseX, that.stage.mouseY);
        var x1 = point.x - that.x - that.progressBar.x - that.progressBar.trackMC.x;
        var per = x1 / that.progressBar.bgMC.getTransformedBounds().width;
        if(per >=0 && per <= 1){
            updateProgressBarWidth(per);
        }
        // console.log(point.x,x1,per);
        //更新视频播放进度
        var _ct = defaultVideo.duration * per;
        defaultVideo.currentTime = _ct;
        //更新时间
        // updateCurrentTimeTxt(_ct);
    }
    // 更新进度条宽度
    function updateProgressBarWidth(val) {
        that.progressBar.trackMC.scaleX = val;
        updateProgressPointBtnX();
    }
    //更新进度条圆点按钮X坐标
    function updateProgressPointBtnX() {
        var _bgW = that.progressBar.trackMC.getTransformedBounds().width;
        var _orgX = that.progressBar.trackMC.x;
        that.progressBar.pointBtn.x = _orgX + _bgW;
    }
    //更新当前时间
    function updateCurrentTimeTxt(val) {
        that.timeMC.currentTimeTxt.text = convertTime(val);
    }
    //设置视频总时间
    function setTotalTimeTxt(val) {
        if(val){that.timeMC.totalTimeTxt.text = convertTime(val);}
    }

    /*重置视频播放控件，控制栏恢复初始状态*/
    function resetControlBar() {
        if(progressTime) {window.clearInterval(progressTime); progressTime = null;}
        that.playStopBtn.gotoAndStop(0);
        that.progressBar.trackMC.scaleX = 0;
        // updateProgressPointBtnX();
        that.progressBar.pointBtn.x = that.progressBar.pointBtn['origX'];
        updateCurrentTimeTxt(0);
    }

    /*重置并且停用播放控件*/
    proto.clear = function () {
        if(isPlayerUsed !== true){return false;}
        isPlayerUsed = false;

        resetControlBar();
        if(that.playStopBtn){that.playStopBtn.removeEventListener('mousedown', onPlayAndStopBtnClick);}
        if(that.replayBtn){ that.replayBtn.removeEventListener('mousedown', onReplayBtnClick); }
        if(that.muteBtn){ that.muteBtn.removeEventListener('mousedown', onMuteBtnClick); }
    };

    /*重载视频，视频控制也跟着重置*/
    proto.reload = function () {
        resetControlBar();
        defaultVideo.load();
    };

//———————————————————————————————————————canvas video 控制栏 结束——————————————————————————————————————————————————————//

    return proto;
};

