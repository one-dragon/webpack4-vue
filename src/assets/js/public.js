import axios from 'axios';
import { Loading, MessageBox } from 'element-ui';
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
            if(method == 'get') {}
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
        // 如果报文没返回code，代表不是规范报文，直接调用成功回调
        if(!data.code) {
            success ? success(data) : '';
            return;
        }
        // 接口返回成功操作
        if(data.code == '0') {
            // 接口成功，是否显示提示框
            if(dataParams.isSuccessPrompt) {
                let obj = {
                    title: '',
                    message: data.msg || '',
                    moreMessage: data.error || '',
                    res: data
                }
                PromptBox.success(Object.assign({}, obj, dataParams.isSuccessPrompt));
            }
            // 返回成功回调函数
            success ? success(data) : '';
            return;
        }
        // 登录过期操作
        if(data.code == 'AUTH_ERROR') {
            try {
                sessionStorage.clear();
                location.href = 'login.html';
            } catch (e) {
                console.log('error: ' + e)
            }
            return;
        }
        // 接口返回错误操作
        if (typeof (error) == 'function') {
            error(data, () => {
                if(dataParams.isFailPrompt) {
                    let obj = {
                        title: '',
                        message: data.msg || '',
                        moreMessage: data.error || '',
                        res: data
                    }
                    return PromptBox.fail(Object.assign({}, obj, dataParams.isFailPrompt));
                }
            })
        }
        if(!error) {
            if(dataParams.isFailPrompt) {
                let obj = {
                    title: '',
                    message: data.msg || '',
                    moreMessage: data.error || '',
                    res: data
                }
                return PromptBox.fail(Object.assign({}, obj, dataParams.isFailPrompt));
            }
        }else {
            console.log(data);
        }
    }
    // 处理ajax请求错误结果
    static errorHandle(error, dataParams, url, catchError) {
        // console.log(catchError.response.data);
        // console.log(catchError.response.status);
        // console.log(catchError.response.headers);
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
        if (typeof (error) == 'function') {
            error(catchError, () => {
                if(dataParams.isFailPrompt) {
                    let obj = {
                        title: '',
                        message: '系统错误',
                        // moreMessage: '',
                        moreMessage: `
                                                  请求url地址: ${url}</br>
                                                  错误原因: ${catchError.message}
                        `,
                        res: catchError
                    }
                    return PromptBox.fail(Object.assign({}, obj, dataParams.isFailPrompt));
                }
            })
        }
        if(!error) {
            if(dataParams.isFailPrompt) {
                let obj = {
                    title: '',
                    message: '系统错误',
                    // moreMessage: '',
                    moreMessage: `
                                           请求url地址: ${url}</br>
                                           错误原因: ${catchError.message}
                    `,
                    res: catchError
                }
                return PromptBox.fail(Object.assign({}, obj, dataParams.isFailPrompt));
            }
        }else {
            console.log('error:' + catchError.message);
        }
    }
}

class PromptBox {
    static success({ title, message, moreMessage, res, type }) {
        type = 'success';
        return PromptBox.common({
            title: title || '提示',
            message: message || (res ? res.msg ? res.msg : '请求成功' : '请求成功'),
            moreMessage: moreMessage || '',
            type
        })
    }
    static fail({ title, message, moreMessage, res, type }) {
        type = 'error';
        return PromptBox.common({
            title: title || '提示',
            message: message || (res ? res.msg ? res.msg : '请求失败' : '请求失败'),
            moreMessage: moreMessage || '',
            type
        })
    }
    static common({ title, message, moreMessage, type }) {
        // <button class="el-button el-button--primary el-button--small">更多 <i class="el-icon-caret-bottom"></i></button>
        return MessageBox({
            customClass: 'common_prompt_box_style',
            dangerouslyUseHTMLString: true,
            // type,
            title: title,
            message: `
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


// 检测当前浏览器端
class CurrBrowser {
    static get(){
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
        if(browser.versions.mobile) { // 判断是否是移动设备打开。browser代码在下面
            // return 'mobile';
            var ua = navigator.userAgent.toLowerCase(); // 获取判断用的对象
            if(ua.match(/MicroMessenger/i) == 'micromessenger') {
                // 在微信中打开
                return 'WX';
            }
            if(ua.match(/WeiBo/i) == 'weibo') {
                // 在新浪微博客户端打开
            }
            if(ua.match(/QQ/i) == 'qq') {
                // 在QQ空间打开
            }
            if(browser.versions.ios) {
                // 是否在IOS浏览器打开
                return 'WAP';
            }
            if(browser.versions.android) {
                // 是否在安卓浏览器打开
                return 'WAP';
            }
            return 'APP';
        } else {
            // 否则就是PC浏览器打开
            return 'PC';
        }
    }
    static getpc(){
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
        if(sys.edge) { return { broswer: 'Edge', version: sys.edge } };
        if(sys.ie) { return { broswer: 'IE', version: sys.ie } };
        if(sys.firefox) { return { broswer: 'Firefox', version: sys.firefox } };
        if(sys.chrome) { return { broswer: 'Chrome', version: sys.chrome } };
        if(sys.opera) { return { broswer: 'Opera', version: sys.opera } };
        if(sys.safari) { return { broswer: 'Safari', version: sys.safari } };
        return { broswer: '', version: '0' };
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
        dayNum = 31; break;
    case 4:
    case 6:
    case 9:
    case 11:
        dayNum = 30; break;
    case 2:
        if(/^\d+$/.test(year / 100)) {
            if(/^\d+$/.test(year / 400)) {
                dayNum = 29;
            }else {
                dayNum = 28;
            }
        }else {
            if(/^\d+$/.test(year / 4)) {
                dayNum = 29;
            }else {
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
     * callback: 匹配成功后的回调函数
     * currTree: 匹配内容的连接的字符串
     * totalArr: 总数据
     * */
    static get({ data, labelVal, label, children, callback }, currTree = '', totalArr = []) {
        if (!data) {
            return;
        }
        if (totalArr.length == 0) {
            totalArr = data;
        }
        data.map((item) => {
            if(item[label] == labelVal) {
                // 当前最顶层父级所有数据
                let currTotalObj = {};
                // 当前最顶层父级匹配的内容
                let tree = '';
                if (currTree == '') {
                    tree = String(item[label]);
                } else {
                    tree = currTree;
                }
                totalArr.map((item2) => {
                    if (item2[label] == tree.split('$&&$')[0]) {
                        currTotalObj = item2;
                    }
                })
                // 成功后返回数据: 当前对应的对象、当前同级的所有数据（数组返回）、当前最顶层父级所有数据、匹配内容的连接的字符串
                callback ? callback(item, data, currTotalObj, currTree + item[label]) : '';
            }else {
                let trees = currTree + item[label] + '$&&$';
                TreeData.get({ data: item[children], labelVal, label, children, callback }, trees, totalArr);
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
    static get(val) {
        let y = val.getFullYear();
        let m = ('0' + (val.getMonth() + 1)).substr(-2);
        let d = ('0' + val.getDate()).substr(-2);
        return `${y}-${m}-${d}`;
    }
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
}


// sessionStorage操作
class Session {
    static set(name, val) {
        sessionStorage.setItem(name, val);
    }
    static get(name) {
        sessionStorage.getItem(name);
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
        localStorage.getItem(name);
    }
    static remove(name) {
        localStorage.removeItem(name);
    }
    static clear() {
        localStorage.clear();
    }
}


export {
    $v,
    CurrBrowser,
    CountDay,
    TreeData,
    GetUrlPara,
    DateFormat,
    Session,
    Local
}
