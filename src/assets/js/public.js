/*
 * @Author: one-dragon
 * @Date: 2018-11-14 11:00:02
 * @Last Modified by: one-dragon
 * @Last Modified time: 2019-01-19 10:46:20
 * description: 封装公共方法
 */

import axios from 'axios';
import { Loading, MessageBox } from 'element-ui';
// import { TrackUtils } from '~/assets/js/event_track';
import md5 from 'blueimp-md5';
// ajax请求封装
// axios.defaults.baseURL = process.env.HOST ? 'http://' + process.env.HOST + ':' + process.env.PORT : '';
axios.defaults.headers.common['Token'] = sessionStorage.getItem('token') || ''; // 设置请求头token
let loadingInstance = null;
const defaultParams = { isLoading: true, isSuccessPrompt: false, isFailPrompt: true };
class $v {
    // { isLoading: true, isSuccessPrompt: false, isFailPrompt: true }
    static get(url, json, success, error, dataParams) {
        // 定义dataParams参数内容
        dataParams = Object.assign({}, defaultParams, dataParams);
        // 判断传参
        let config = {};
        if (typeof json == 'object') {
            if (json.params) {
                config = json;
            } else {
                config.params = json;
            }
            config.params = $v.commonParam({
                method: 'get',
                data: config.params
            });
        }
        if (typeof (json) == 'function') {
            // error = error || success;
            if(typeof (error) == 'object') {
                dataParams = Object.assign({}, dataParams, error);
            }
            error = success || error;
            success = json;
            config.params = $v.commonParam({
                method: 'get',
                data: config.params
            });
        }
        if(typeof (error) == 'object') {
            dataParams = Object.assign({}, dataParams, error);
            error = false;
        }
        // 判断是否加载loading
        if(dataParams.isLoading) {
            loadingInstance = Loading.service({
                fullscreen: true,
                text: typeof (dataParams.isLoading) == 'string' ? dataParams.isLoading : ''
            });
        }
        // 发送请求
        return axios.get(url, config).then((d) => {
            let data = d.data;
            // 调用处理结果函数
            $v.resultHandle(data, success, error, dataParams, url);
        }).catch((catchError) => {
            $v.errorHandle(error, dataParams, url, catchError);
        })
    }
    static delete(url, json, success, error, dataParams) {
        // 定义dataParams参数内容
        dataParams = Object.assign({}, defaultParams, dataParams);
        // 判断传参
        let config = {};
        if (typeof json == 'object') {
            if (json.params) {
                config = json;
            } else {
                config.params = json;
            }
            config.params = $v.commonParam({
                method: 'get',
                data: config.params
            });
        }
        if (typeof (json) == 'function') {
            // error = error || success;
            if(typeof (error) == 'object') {
                dataParams = Object.assign({}, dataParams, error);
            }
            error = success || error;
            success = json;
            config.params = $v.commonParam({
                method: 'get',
                data: config.params
            });
        }
        if(typeof (error) == 'object') {
            dataParams = Object.assign({}, dataParams, error);
            error = false;
        }
        // 判断是否加载loading
        if(dataParams.isLoading) {
            loadingInstance = Loading.service({
                fullscreen: true,
                text: typeof (dataParams.isLoading) == 'string' ? dataParams.isLoading : ''
            });
        }
        // 发送请求
        return axios.delete(url, config).then((d) => {
            let data = d.data;
            // 调用处理结果函数
            $v.resultHandle(data, success, error, dataParams, url);
        }).catch((catchError) => {
            $v.errorHandle(error, dataParams, url, catchError);
        })
    }
    static post(url, json, success, error, dataParams) {
        // 定义dataParams参数内容
        dataParams = Object.assign({}, defaultParams, dataParams);
        // 判断传参
        let data = {};
        let config = {};
        if (typeof (json) == 'object') {
            if (json.data) {
                data = json.data;
                delete json.data;
                config = json;
            } else {
                data = json;
            }
        }
        if (typeof (json) == 'function') {
            // error = error || success;
            if(typeof (error) == 'object') {
                dataParams = Object.assign({}, dataParams, error);
            }
            error = success || error;
            success = json;
        }
        if(typeof (error) == 'object') {
            dataParams = Object.assign({}, dataParams, error);
            error = false;
        }
        // 判断是否加载loading
        if(dataParams.isLoading) {
            loadingInstance = Loading.service({
                fullscreen: true,
                text: typeof (dataParams.isLoading) == 'string' ? dataParams.isLoading : ''
            });
        }
        // 发送请求
        return axios.post($v.commonParam({
            method: 'post',
            url: url
        }), $v.commonParam({
            method: 'post',
            data: data
        }), config).then((d) => {
            let data = d.data;
            // 调用处理结果函数
            $v.resultHandle(data, success, error, dataParams, url)
        }).catch((catchError) => {
            $v.errorHandle(error, dataParams, url, catchError);
        })
    }
    static put(url, json, success, error, dataParams) {
        // 定义dataParams参数内容
        dataParams = Object.assign({}, defaultParams, dataParams);
        // 判断传参
        let data = {};
        let config = {};
        if (typeof (json) == 'object') {
            if (json.data) {
                data = json.data;
                delete json.data;
                config = json;
            } else {
                data = json;
            }
        }
        if (typeof (json) == 'function') {
            // error = error || success;
            if(typeof (error) == 'object') {
                dataParams = Object.assign({}, dataParams, error);
            }
            error = success || error;
            success = json;
        }
        if(typeof (error) == 'object') {
            dataParams = Object.assign({}, dataParams, error);
            error = false;
        }
        // 判断是否加载loading
        if(dataParams.isLoading) {
            loadingInstance = Loading.service({
                fullscreen: true,
                text: typeof (dataParams.isLoading) == 'string' ? dataParams.isLoading : ''
            });
        }
        // 发送请求
        return axios.put($v.commonParam({
            method: 'post',
            url: url
        }), $v.commonParam({
            method: 'post',
            data: data
        }), config).then((d) => {
            let data = d.data;
            // 调用处理结果函数
            $v.resultHandle(data, success, error, dataParams, url)
        }).catch((catchError) => {
            $v.errorHandle(error, dataParams, url, catchError);
        })
    }
    // 设置出入公共参数
    static commonParam({ method, data, url }) {
        if (data) {
            let obj = data;
            if (method == 'get') {}
            /*
            if(method == 'get') {
                // get请求时，入参属性值为数组时转成字符传入，入参属性名为pageInfo时，转成点值传入
                for(let i in obj) {
                    if(obj[i].constructor == Array) {
                        obj[i] = String(obj[i]);
                    }
                }
                if(obj.pageInfo) {
                    for(let i in obj.pageInfo) {
                        obj[`pageInfo.${i}`] = obj.pageInfo[i];
                    }
                    delete obj.pageInfo;
                }
            }
            */
            // 生成MD5
            const key = md5(JSON.stringify(obj));
            obj.key = key;
            return obj;
        }
        if (url) {
            return url;
        }
    }
    // 处理ajax请求成功结果
    static resultHandle(data, success, error, dataParams, url) {
        try {
            loadingInstance.close();
            // IE或者Edge下清除loading
            if (CurrBrowser.getpc().broswer == 'IE' || CurrBrowser.getpc().broswer == 'Edge') {
                setTimeout(() => {
                    let elm = document.querySelector('.el-loading-mask.is-fullscreen');
                    if (elm) {
                        elm.parentNode.removeChild(elm);
                    }
                }, 2000)
            }
        } catch (e) {
            console.log('error:' + e);
            console.log(url);
        }

        // 返回成功
        success ? success(data) : '';

        // 默认成功基本---提示框数据
        let promptData = {
            title: '提示',
            message: '请求成功',
            moreMessage: '',
            type: 'success'
        }
        // 处理提示框提示
        if (dataParams.isSuccessPrompt) {
            return PromptBox.common(Object.assign({}, promptData, dataParams.isSuccessPrompt));
        }
    }
    // 处理ajax请求错误结果
    static errorHandle(error, dataParams, url, catchError) {
        // console.log(catchError.response.data);
        // console.log(catchError.response.status);
        // console.log(catchError.response.headers);
        // console.log(catchError.message);
        // console.log(catchError.response);
        try {
            loadingInstance.close();
            // IE或者Edge下清除loading
            if (CurrBrowser.getpc().broswer == 'IE' || CurrBrowser.getpc().broswer == 'Edge') {
                setTimeout(() => {
                    let elm = document.querySelector('.el-loading-mask.is-fullscreen');
                    if (elm) {
                        elm.parentNode.removeChild(elm);
                    }
                }, 2000)
            }
        } catch (e) {
            console.log('error: ' + e)
        }
        // 系统级别---错误提示数据
        let promptData = {
            title: '提示',
            message: '系统错误',
            moreMessage: `url: ${url} </br> message: ${catchError.message}`,
            res: catchError,
            type: 'error'
        }
        // 页面级别---代码错误提示
        if (catchError.message && catchError.response == undefined) {
            // 控制台输出具体错误内容
            console.error(catchError);
            promptData.message = '页面错误';
            return PromptBox.common(Object.assign({}, promptData));
        }
        // 接口级别---返回400错误提示
        if (catchError.response.status == 400 && typeof (catchError.response.data) == 'object') {
            let data = catchError.response.data;
            promptData.message = data.reason;
            promptData.moreMessage = `url: ${url} </br> code: ${data.code} </br> message: ${data.message}`;
        }
        // 处理提示框提示
        if (typeof (error) == 'function') {
            error(catchError, () => {
                if(dataParams.isFailPrompt) {
                    return PromptBox.common(Object.assign({}, promptData, dataParams.isFailPrompt));
                }
            })
        }
        if(!error) {
            if(dataParams.isFailPrompt) {
                return PromptBox.common(Object.assign({}, promptData, dataParams.isFailPrompt));
            }
        }else {
            console.log('error:' + catchError.message);
        }
    }
}


class PromptBox {
    static common({ title, message, moreMessage, type }) {
        // <button class="el-button el-button--primary el-button--small">更多 <i class="el-icon-caret-bottom"></i></button>
        return MessageBox({
            customClass: 'common_prompt_box_style',
            dangerouslyUseHTMLString: true,
            modal: false,
            // type,
            title: title,
            message: `
                <style>
                    .el-message-box__wrapper[aria-label="${title}"]{
                        background-color: rgba(0,0,0,.5);
                        z-index: 9999 !important;
                    }
                </style>
                <div class="msg_box">
                    <div class="el-message-box__status el-icon-${type}"></div>
                    <div class="msg_content">${message}</div>
                    <i class="switch_btn el-icon-arrow-down" style="${moreMessage ? '' : 'display: none;'}" onclick="
                        if(this.className.indexOf('el-icon-arrow-down') >= 0) {
                            this.className = 'switch_btn el-icon-arrow-up';
                            this.parentNode.nextElementSibling.style.height = 'auto';
                        }else {
                            this.className = 'switch_btn el-icon-arrow-down';
                            this.parentNode.nextElementSibling.style.height = 0;
                        }
                    "></i>
                </div>
                <div class="more_msg_box collapse-transition">${moreMessage}</div>
            `,
            showCancelButton: false,
            showConfirmButton: false
        }).catch(() => {})
    }
}


// 图片转为base64
class imgSrcTo {
    // img为传入img标签dom对象，getData为回调函数返回base64串
    static base64(img, getData) {
        let canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);
        getData(canvas.toDataURL())
    }
}


// 检测当前浏览器端
class CurrBrowser {
    static get() {
        var browser = {
            versions: (function () {
                var u = navigator.userAgent;
                // var app = navigator.appVersion;
                return { // 移动终端浏览器版本信息
                    trident: u.indexOf('Trident') > -1, // IE内核
                    presto: u.indexOf('Presto') > -1, // opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或uc浏览器
                    iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, // 是否iPad
                    webApp: u.indexOf('Safari') == -1 // 是否web应该程序，没有头部与底部
                };
            })(),
            language: (navigator.browserLanguage || navigator.language).toLowerCase()
        }
        if (browser.versions.mobile) { // 判断是否是移动设备打开。browser代码在下面
            // return 'mobile';
            var ua = navigator.userAgent.toLowerCase(); // 获取判断用的对象
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                // 在微信中打开
                return 'WX';
            }
            if (ua.match(/WeiBo/i) == 'weibo') {
                // 在新浪微博客户端打开
            }
            if (ua.match(/QQ/i) == 'qq') {
                // 在QQ空间打开
            }
            if (browser.versions.ios) {
                // 是否在IOS浏览器打开
                return 'WAP';
            }
            if (browser.versions.android) {
                // 是否在安卓浏览器打开
                return 'WAP';
            }
            return 'APP';
        } else {
            // 否则就是PC浏览器打开
            return 'PC';
        }
    }
    static getpc() {
        var sys = {};
        var ua = navigator.userAgent.toLowerCase();
        var s;
        (s = ua.match(/edge\/([\d.]+)/)) ? sys.edge = s[1] :
            (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1] :
                (s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
                    (s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
                        (s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] :
                            (s = ua.match(/opera.([\d.]+)/)) ? sys.opera = s[1] :
                                (s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;
        if (sys.edge) {
            return {
                broswer: 'Edge',
                version: sys.edge
            }
        };
        if (sys.ie) {
            return {
                broswer: 'IE',
                version: sys.ie
            }
        };
        if (sys.firefox) {
            return {
                broswer: 'Firefox',
                version: sys.firefox
            }
        };
        if (sys.chrome) {
            return {
                broswer: 'Chrome',
                version: sys.chrome
            }
        };
        if (sys.opera) {
            return {
                broswer: 'Opera',
                version: sys.opera
            }
        };
        if (sys.safari) {
            return {
                broswer: 'Safari',
                version: sys.safari
            }
        };
        return {
            broswer: '',
            version: '0'
        };
    }
}


// 根据年份、月份判断当前月的天数
let CountDay = (month, year) => {
    var dayNum = 0;
    switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
        dayNum = 31;
        break;
    case 4:
    case 6:
    case 9:
    case 11:
        dayNum = 30;
        break;
    case 2:
        if (/^\d+$/.test(year / 100)) {
            if (/^\d+$/.test(year / 400)) {
                dayNum = 29;
            } else {
                dayNum = 28;
            }
        } else {
            if (/^\d+$/.test(year / 4)) {
                dayNum = 29;
            } else {
                dayNum = 28;
            }
        }
        break;
    }
    return dayNum;
}


// 根据树结构查找对应数据
class TreeData {
    /*
     * data: 遍历的数据
     * labelVal: 匹配内容
     * label: 匹配内容的key字段
     * children: 子集的key字段
     * treeStr: 字段匹配内容的连接的字符串，不传则使用label为匹配
     * callback: 匹配成功后的回调函数
     * currTree: 匹配内容的连接的字符串
     * totalArr: 总数据
     * */
    static get({
        data,
        labelVal,
        label,
        children,
        treeStr,
        callback
    }, currTree = '', totalArr = []) {
        if (!data) {
            return;
        }
        if (totalArr.length == 0) {
            totalArr = data;
        }
        data.map((item) => {
            if (item[label] == labelVal) {
                // 当前最顶层父级所有数据
                let currTotalObj = {};
                // 当前最顶层父级匹配的内容
                let tree = '';
                if (currTree == '') {
                    tree = String(item[treeStr || label]);
                } else {
                    tree = currTree;
                }
                totalArr.map((item2) => {
                    if (item2[treeStr || label] == tree.split('$&&$')[0]) {
                        currTotalObj = item2;
                    }
                })
                // 成功后返回数据: 当前对应的对象、当前同级的所有数据（数组返回）、当前最顶层父级所有数据、匹配内容的连接的字符串
                callback ? callback(item, data, currTotalObj, currTree + item[treeStr || label]) : '';
            } else {
                let trees = currTree + item[treeStr || label] + '$&&$';
                TreeData.get({
                    data: item[children],
                    labelVal,
                    label,
                    children,
                    treeStr,
                    callback
                }, trees, totalArr);
            }
        })
    }
}


// 获取url中的参数
class GetUrlPara {
    static get(name) {
        // 构造一个含有目标参数的正则表达式对象
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        // 匹配目标参数
        let r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        // 返回参数值
        return null;
    }
}


// 日期转换
class DateFormat {
    // 获取标准时间格式: Fri Jan 18 2019 17:38:16 GMT+0800 (中国标准时间)
    static getStandardTime(val) {
        let date;
        if (typeof val == 'string') {
            val = val.replace(/-/g, '/');
            date = new Date(val);
        }
        if (typeof val == 'number') {
            date = new Date(val);
        }
        if (typeof val == 'object') {
            date = val;
        }
        return date;
    }
    // 获取日期格式: yyyy-mm-dd
    static get(val) {
        val = DateFormat.getStandardTime(val);
        let y = val.getFullYear();
        let m = ('0' + (val.getMonth() + 1)).substr(-2);
        let d = ('0' + val.getDate()).substr(-2);
        return `${y}-${m}-${d}`;
    }
    // 获取日期时间格式: yyyy-mm-dd hh:mm:ss
    static getFull(val) {
        let date = DateFormat.get(val);
        // 获取小时数(0-23)
        let hou = ('0' + val.getHours()).substr(-2);
        // 获取分钟数(0-59)
        let min = ('0' + val.getMinutes()).substr(-2);
        // 获取秒数(0-59)
        let sec = ('0' + val.getSeconds()).substr(-2);
        return `${date} ${hou}:${min}:${sec}`
    }
    // 获取指定日份的日期时间格式: yyyy-mm-dd hh:mm:ss
    static getSpecifiedDay(date, num) {
        date = DateFormat.getStandardTime(date);
        date.setDate(date.getDate() + num);
        return DateFormat.getFull(date);
    }
    // 获取指定月份的日期时间格式: yyyy-mm-dd hh:mm:ss
    static getSpecifiedMonth(date, num) {
        date = DateFormat.getStandardTime(date);
        date.setMonth(date.getMonth() + num);
        return DateFormat.getFull(date);
    }
}

// sessionStorage操作
class Session {
    static set(name, val) {
        sessionStorage.setItem(name, val);
    }
    static get(name) {
        return sessionStorage.getItem(name);
    }
    static remove(name) {
        sessionStorage.removeItem(name);
    }
    static clear() {
        sessionStorage.clear();
    }
}

// localStorage操作
class Local {
    static set(name, val) {
        localStorage.setItem(name, val);
    }
    static get(name) {
        return localStorage.getItem(name);
    }
    static remove(name) {
        localStorage.removeItem(name);
    }
    static clear() {
        localStorage.clear();
    }
}


// 右侧内容区滚动条回滚到顶部
class ScrollbarTo {
    static top(num) {
        let bar = ScrollbarTo.getScrollBar();
        bar.scrollTop = num || 0;
    }
    static getScrollBar() {
        return window.document.querySelector('.content_r .default_layout_scrollbar > .el-scrollbar__wrap');
    }
}


// 滚动条滑动缓冲动画效果 -- elem(滚动目标元素), direction('top'/'left'), num(滚动距离) 必传参数 -- speed(滚动速度), cb(滚动完成回调函数) 选填参数
let scrollAnimate = function (elem, direction, num, speed, cb) {
    if (!elem || !direction || !String(num)) { return false; }
    // 首字母大写
    direction = direction.toLowerCase().replace(/\b[a-z]/g, word => word.toUpperCase());
    // 判断选填入参
    if (typeof speed == 'function') {
        cb = speed;
        speed = null;
    }
    let timer;
    let speeds = speed || 4;
    let isAdd = true; // 默认向右、向下滑动
    // 向左、向上滑动
    if (num < elem[`scroll${direction}`]) {
        isAdd = false;
    }
    timer = setInterval(() => {
        // 通过元素的当前srcoll值，获取下次滚动距离，产生缓冲动画
        let speed = Math.ceil((!isAdd ? elem[`scroll${direction}`] : (num - elem[`scroll${direction}`])) / speeds);
        // 获取元素下次滚动的scroll值
        let count = elem[`scroll${direction}`] + (isAdd ? speed : -speed);
        // 判断下次滚动的scroll值是否超过目标值(num值)
        if ((isAdd && count >= num) || (!isAdd && count <= num)) {
            elem[`scroll${direction}`] = num;
            clearInterval(timer);
            cb ? cb() : '';
            return;
        }
        elem[`scroll${direction}`] += (isAdd ? speed : -speed);
        if (elem[`scroll${direction}`] == num) {
            clearInterval(timer);
            cb ? cb() : '';
        }
    }, 30)
}

// 操作对象的一些公共方法
class Obj {
    // 设置对象属性
    // 把对象 { a: 2 } 设置成 { a: { aa: 1 } } => Obj.set(obj, 'a.aa', 1)
    static set(obj, sKey, val) {
        if (!sKey || obj.toString() != '[object Object]') return;
        let tempObj = obj;
        let keyArr = sKey.split('.');
        let len = keyArr.length - 1;
        for (let i = 0; i <= len; ++i) {
            let key = keyArr[i];
            if (i == len) {
                tempObj[key] = val;
            } else {
                if (key in tempObj) {
                    tempObj = tempObj[key] = tempObj[key].toString() == '[object Object]' ? tempObj[key] : {};
                } else {
                    tempObj = tempObj[key] = {};
                }
            }
        }
    }
    // 通过 对象obj 和 字符串'a.b.c'， 判断是否能获取最终结果, 其中is为是否跟踪到最后一个
    // { a: { aa: 1 } } => isGet(obj, 'a.aa') => { o: obj, k: 'aa', v: 1, is: true }
    // { a: { aa: 1 } } => isGet(obj, 'a.aa.aaa') => { o: obj, k: 'aa', v: 1, is: false }
    static isGet(obj, sKey) {
        if (!sKey || obj.toString() != '[object Object]') {
            return { o: obj, k: null, v: null, is: false }
        }
        let keyArr = sKey.split('.');
        let tempObj = obj;
        let is = true;
        let i = 0;
        for (let len = keyArr.length; i < len; ++i) {
            let key = keyArr[i];
            if (tempObj.toString() == '[object Object]' && key in tempObj) {
                tempObj = tempObj[key];
            } else {
                is = false;
                break;
            }
        }
        return {
            // i: i - 1,
            // t: tempObj,
            // v: tempObj ? tempObj.toString() == '[object Object]' ? tempObj[keyArr[i - 1]] : tempObj : null,
            o: obj,
            k: keyArr[i - 1],
            v: tempObj,
            is
        }
    }
}

// 操作数组的一些公共方法
class Arr {

}

export {
    $v,
    PromptBox,
    CurrBrowser,
    CountDay,
    TreeData,
    GetUrlPara,
    DateFormat,
    Session,
    Local,
    imgSrcTo,
    ScrollbarTo,
    scrollAnimate,
    Obj,
    Arr
}