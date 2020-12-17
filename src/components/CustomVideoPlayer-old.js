import  {getBrowser} from 'devlibx';

/*
 * @Description: 自定义视频播放器控件的组件（基于Canvas的）；
 * @Author: 彭祥 (Email:px.i@foxmail.com QQ:245803627)
 * @Date: 2018/9/25 14:15
 * @LastEditors: pengxiang
 * @LastEditTime: 2019/2/28 14:15
 *
 * 此组件使用方法 CreateCVideoPlayer(el, false, _this);
 */
export function CustomVideoPlayer() {
    function CustomVideoPlayer() {
    }

    var proto = CustomVideoPlayer.prototype;
    var that;
    var isVideoAutoPlay;
    var defaultVideo;
    /**
     * 创建自定义的视频播放器
     * @param video         视频元素
     * @param isAutoPlay    是否自动播放
     * @param self          控制栏所在Canvas元素的绘图区域（exportRoot）
     * @constructor
     */
    proto.CreateCVideoPlayer = function(videoName,isAutoPlay,self) {
        that = self;
        isVideoAutoPlay = isAutoPlay;
        defaultVideo = document.getElementById(videoName);
        defaultVideo.addEventListener('ended', onVideoMCEnd);
        defaultVideo.addEventListener('play', onVideoMCPlay);
        defaultVideo.addEventListener('pause', onVideoMCPause);
        defaultVideo.addEventListener('durationchange', onVideoMCDurationChange);
        defaultVideo.addEventListener('loadedmetadata', onVideoMCLoadedmetadata);
        defaultVideo.addEventListener('timeupdate', onVideoMCTimeupdate);
        // el.addEventListener('progress', onVideoMCProgress);
        // el.play();

        initVideoControlBar();
        if(isVideoAutoPlay === true) {
            defaultVideo.play();
        }
    };

    proto.Reload = function () {
        onReplayBtnClick();
    };
    proto.ResetControlBar = function () {
        resetControlBar();
    };

    function onVideoMCEnd(event) {
        if(progressTime != null && progressTime !== undefined) {
            window.clearInterval(progressTime);
        }
        that.controlBar.playAndStopBtn.gotoAndStop(0);

        // if(typeof SlidePlayCompleted !== "undefined") { SlidePlayCompleted(2); }
    }

    function onVideoMCPlay(event) {
        // that.controlBar.playAndStopBtn.gotoAndStop(1);
        // progressTime = window.setInterval(onProgressInterval, 50);
        handleVideoMCPlay();
    }
    function onVideoMCPause(event) {
        that.controlBar.playAndStopBtn.gotoAndStop(0);
        window.clearInterval(progressTime);
    }
    function onVideoMCDurationChange(event) {

    }
    function onVideoMCLoadedmetadata(event) {
        var _video = event.currentTarget;
        setTotalTimeTxt(_video.duration);
        // that.controlBar.totalTimeTxt.text = convertTime(_video.duration);
    }
    function onVideoMCTimeupdate(event) {
        var _video = event.currentTarget;
        updateCurrentTimeTxt(_video.currentTime);
        // console.log(_video.currentTime,_video.duration,_video.currentTime/_video.duration);
        // updateProgressBarWidth(_video.currentTime/_video.duration);

        setTotalTimeTxt(_video.duration);
        // that.controlBar.totalTimeTxt.text = convertTime(_video.duration);
    }

    var progressTime;
    function onProgressInterval() {
        // var _video = document.getElementById("videoMC");
        if(!defaultVideo.duration){return false;}
        var per = defaultVideo.currentTime/defaultVideo.duration;
        if(per){
            updateProgressBarWidth(per);
            // console.log(_video.currentTime,_video.duration,_video.currentTime/_video.duration);
        }
    }

    function updateProgressBarWidth(val) {
        that.controlBar.progressBarWidget.progressBar.scaleX = val;
        updateProgressPointBtnX();
    }

    /**
     *把秒转化为 29分31秒 格式
     * @param time 秒
     * @return  返回格式: 29:31
     */
    function convertTime(time) {
        var min = parseInt(time % 3600 / 60);
        var sec = parseInt(time % 60);

        return (min < 10 ? "0" + min : "" + min)
            + ":" + (sec < 10 ? "0" + sec : "" + sec);
    }

//———————————————————————————————————————canvas video 控制栏 开始——————————————————————————————————————————————————————//

    function initVideoControlBar() {
        that.controlBar.progressBarWidget.progressBar.scaleX = 0;
        if(isVideoAutoPlay === true){
            handleVideoMCPlay();
        }
        that.controlBar.playAndStopBtn.addEventListener('click', onPlayAndStopBtnClick);
        // that.controlBar.progressBarWidget.progressBtn.addEventListener('click', onProgressBtnClick);
        that.controlBar.replayBtn.addEventListener('click', onReplayBtnClick);

        var browserInfo = getBrowser();
        var BrowserType = browserInfo.browser;
        //注：Chrome下视频的路径必须是https的绝对路径（比如 http://www.w3school.com.cn/example/html5/mov_bbb.mp4），才能实现拖动进度条刷新视频时间这个功能，本公司并没有这个资源，因此暂时屏蔽Chrome下的此功能；
        // if(BrowserType !== "Chrome"){
            that.controlBar.progressBarWidget.progressBtn.addEventListener('click', onProgressBtnClick);
            that.controlBar.progressBarWidget.pointBtn.addEventListener("mousedown", onPointBtnDown);
            that.controlBar.progressBarWidget.pointBtn.addEventListener("pressup", onPointBtnUp);
        // }
        // alert("browser:"+browserInfo.browser+" version:"+browserInfo.version);
    }

    function handleVideoMCPlay() {
        that.controlBar.playAndStopBtn.gotoAndStop(1);
        if(progressTime != null && progressTime !== undefined){
            window.clearInterval(progressTime);
        }
        progressTime = window.setInterval(onProgressInterval, 50);
    }

    function onPlayAndStopBtnClick(event) {
        var target = event.currentTarget;
        // var _video = document.getElementById("videoMC");
        if(target.currentFrame === 0) {
            // target.gotoAndStop(1);
            defaultVideo.play();
            handleVideoMCPlay();
        }else if(target.currentFrame === 1) {
            // target.gotoAndStop(0);
            defaultVideo.pause();
        }
    }

    function onReplayBtnClick(event) {
        defaultVideo.load();
        resetControlBar();
    }
    function resetControlBar() {
        if(progressTime != null && progressTime !== undefined) {
            window.clearInterval(progressTime);
        }
        that.controlBar.playAndStopBtn.gotoAndStop(0);
        that.controlBar.progressBarWidget.progressBar.scaleX = 0;
        updateProgressPointBtnX();
        updateCurrentTimeTxt(0);
        if(isVideoAutoPlay === true){
            defaultVideo.play();
            handleVideoMCPlay();
        }
    }

    function onProgressBtnClick(event) {
        updateProgressBarInfo();
    }

//更新进度条信息（进度条长度，进度条圆点按钮X坐标，视频播放进度，时间文本）
    function updateProgressBarInfo() {
        // var _video = document.getElementById("videoMC");
        defaultVideo.pause();
        //更新进度条长度（pointBtn+progressBar）
        var point = that.globalToLocal(that.stage.mouseX, that.stage.mouseY);
        var x1 = point.x - that.controlBar.x - that.controlBar.progressBarWidget.x - that.controlBar.progressBarWidget.progressBar.x;
        var per = x1 / that.controlBar.progressBarWidget.progressBG.getTransformedBounds().width;
        if(per >=0 && per <= 1){
            updateProgressBarWidth(per);
        }
        // console.log(point.x,x1,per);
        //更新视频播放进度
        if(!defaultVideo.duration){return false;}
        var _ct = defaultVideo.duration * per;
        defaultVideo.currentTime = _ct;
        //更新时间
        // updateCurrentTimeTxt(_ct);
    }
//更新进度条圆点按钮X坐标
    function updateProgressPointBtnX() {
        var _bgW = that.controlBar.progressBarWidget.progressBar.getTransformedBounds().width;
        var _orgX = that.controlBar.progressBarWidget.progressBar.x;
        that.controlBar.progressBarWidget.pointBtn.x = _orgX + _bgW;
    }
//更新当前时间
    function updateCurrentTimeTxt(val) {
        that.controlBar.timeWidget.currentTimeTxt.text = convertTime(val);
    }
//设置视频总时间
    function setTotalTimeTxt(val) {
        if(val){
            that.controlBar.timeWidget.totalTimeTxt.text = convertTime(val);
        }
    }

    function onPointBtnDown(event) {
        var target = event.currentTarget;
        that.setChildIndex(target, that.numChildren - 1);
        target.addEventListener("pressmove",onPointBtnMove);

        // var _video = document.getElementById("videoMC");
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
//———————————————————————————————————————canvas video 控制栏 结束——————————————————————————————————————————————————————//


    return proto;
};

