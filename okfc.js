let okfc = {
    trim(str, type) {
        switch (type) {
            //去除所有空格
            //trim("   123ab",1) result:123ab
            case 1:
                return str.replace(/\s+/g, "");
            //去除前后空格
            //trim(" 123 ab ") result:123 ab
            case 2:
                return str.replace(/(^\s*)|(\s*$)/g, "")
            //去除前空格
            //trim(" 123ab ") result:123ab
            case 3:
                return str.replace(/(^\s*)/g, "")
        }
    },
    chaneCase(str, type) {
        function ToggleCase(str) {
            let itemText = ""
            str.split("").forEach(element => {
                if (/^[a-z]]+/.test(element)) {
                    itemText += item.toUpperCase
                } else if (/^[A-Z]+/.test(element)) {
                    itemText += item.toLowerCase
                } else {
                    itemText += item
                }
            });
            return itemText
        }

        switch (type) {
            //首字母大写
            case 1:
                return str.replace(/\b\w+\b/g, function (item) {
                    return item.substring(0, 1).toUpperCase() + item.substring(1).toLowerCase()
                })
            //
        }
    },
    //字符串循环复制
    repeatStr(str, count) {
        return str.repeat(count)
    },
    //字符全部替换
    replaceAll(str, AFindText, ARepText) {
        let ragRegExp = new RegExp(AFindText, "g")
        return str.replace(ragRegExp, ARepText)
    },
    //获取对象组数的某些项
    //let arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
    //getOptionArray(arr,'a,c')
    //result:[{a:1,c:9},{a:2,c:5},{a:5,c:underfind},{a:4,c:5},{a:4,c:7}]
    getOptionArray(arr, keys) {
        let newArr = []
        if (!keys) {
            return arr
        }
        let _keys = keys.split(','),
            newArrOne = {}
        //获取某一项的值
        if (_keys.length === 1) {
            for (let i = 0; i < _keys.length; i++) {
                newArr.push(arr[i][_keys])
            }
            return newArr
        }
        for (let i = 0, len = arr.length; i < len; i++) {
            newArrOne = {}
            for (let j = 0, len1 = _keys.length; j < len1; j++) {
                newArrOne[_keys[j]] = arr[i][_keys[j]]
            }
            newArr.push(newArrOne)
        }
    },
    //排除数组某些项
    //let arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
    //filterOptionArray(arr,'a')
    //result：[{b:2,c:9},{b:3,c:5},{b:9},{b:2,c:5},{b:5,c:7}]
    //filterOptionArray(arr,'a,c')
    //result：[{b:2},{b:3},{b:9},{b:2},{b:5}]
    filterOptionArray(arr, keys) {
        let newArr = []
        let _keys = keys.split(','),
            newArrOne = {}
        for (let i = 0, len = arr.length; i < len; i++) {
            newArrOne = {}
            for (let key in arr[i]) {
                if (_keys.indexOf(key) === -1) {
                    newArrOne[key] = arr[i][key]
                }
            }
            newArr.push(newArrOne)
        }
        return newArr;
    },
    //对象数组的排序
    //let arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
    //arraySort(arr,'a,b')a是第一排序条件，b是第二排序条件
    //result：[{"a":1,"b":2,"c":9},{"a":2,"b":3,"c":5},{"a":4,"b":2,"c":5},{"a":4,"b":5,"c":7},{"a":5,"b":9}]
    arraySort(arr, sortText) {
        if (!sortText) {
            return arr
        }
        let _sortText = sortText.split(',').reverse(),
            _arr = arr.slice(0);
        for (let i = 0, len = _sortText.length; i < len; i++) {
            _arr.sort((n1, n2) => {
                return n1[_sortText[i]] - n2[_sortText[i]]
            })
        }
        return _arr;
    },
    //数组扁平化，就是将多层嵌套数组变为一层数组
    steamroller(arr) {
        let newArr = [],
            _this = this;
        for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                newArr.push.apply(newArr, _this.steamroller(arr[i]))
            } else {
                newArr.push(arr[i])
            }
        }
        return newArr;
    },
    //适配rem(随着根元素的大小而改变)
    getFontSize(_client) {
        let doc = document,
            win = window;
        let docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
        recalc = function () {
            let clientWidth = docEl.clientWidth
            if (!clientWidth) return;

            if (clientWidth > _client) {
                clientWidth = _client
            }
            docEl.style.fontSize = 100 * (clientWidth / _client) + 'px'
        }
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false)
    },
    //到某一个时间的倒计时
    //getEndTime('2017/7/22 16:0:0')
    //result："剩余时间6天 2小时 28 分钟20 秒"
    getEndTime(endTime) {
        let startDate = new Date();
        let endDate = new Date(endTime)
        let t = endDate.getTime() - startDate.getTime()
        let d = 0,
            h = 0,
            m = 0,
            s = 0;
        if (t >= 0) {
            d = Math.floor(t / 1000 / 3600 / 24)
            h = Math.floor(t / 1000 / 60 / 60 % 24)
            m = Math.floor(t / 1000 / 60 % 60)
            s = Math.floor(t / 1000 % 60)
        }
        return {d, h, m, s}
    },
    //获取随机颜色
    randomColor() {
        return '#' + Math.random().toString(16).substring(2).substr(0, 6)
    },
    //随机返回一个范围的数字
    randomNumber(n1, n2) {
        if (arguments.length > 2) {
            return Math.round(n1 + Math.random() * (n2 - n1))
        } else if (arguments.length === 1) {
            return Math.round(Math.random() * n1)
        } else {
            return Math.round(Math.random() * 255)
        }
    },
    //根据对象设置url
    setUrlPrmt(obj) {
        let _rs = []
        for (let p in obj) {
            if (obj[p] != null && obk[p] != '') {
                _rs.push(p + '=' + obj[p])
            }
        }
        return _rs.join('&')
    },
    //获取url参数
    //getUrlPrmt('segmentfault.com/write?draftId=122000011938')
    //result：Object{draftId: "122000011938"}
    getUrlPrmt(url) {
        url = url ? url : window.location.href
        let _pa = url.substring(url.indexOf('?') + 1),
            _arrS = _pa.split('&'),
            _rs = {}
        for (let i = 0, _len = _arrS.length; i < _len; i++) {
            let pos = _arrS[i].indexOf('=')
            if (pos == -1) {
                continue
            }
            let name = _arrS[i].substring(0, pos),
                value = window.decodeURIComponent(_arrS[i].substring(pos + 1))
            _rs[name] = value
        }
        return _rs
    },
    //现金额大写转换函数
    //upDigit(168752632)
    //result："人民币壹亿陆仟捌佰柒拾伍万贰仟陆佰叁拾贰元整"
    //upDigit(1682)
    //result："人民币壹仟陆佰捌拾贰元整"
    //upDigit(-1693)
    //result："欠人民币壹仟陆佰玖拾叁元整"
    upDigit(n) {
        let fraction = ['角', '分', '厘'];
        let digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        let unit = [
            ['元', '万', '亿'],
            ['', '拾', '佰', '仟']
        ];
        let head = n < 0 ? '欠人民币' : '人民币';
        n = Math.abs(n);
        let s = '';
        for (let i = 0; i < fraction.length; i++) {
            s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
        }
        s = s || '整';
        n = Math.floor(n);
        for (let i = 0; i < unit[0].length && n > 0; i++) {
            let p = '';
            for (let j = 0; j < unit[1].length && n > 0; j++) {
                p = digit[n % 10] + unit[1][j] + p;
                n = Math.floor(n / 10);
            }
            s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
            //s = p + unit[0][i] + s;
        }
        return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
    },
    //清除对象中值为空的属性
    //filterParams({a:"",b:null,c:"010",d:123})
    //Object {c: "010", d: 123}
    filterParams(obj) {
        let _newPar = {};
        for (let key in obj) {
            if ((obj[key] === 0 || obj[key] === false || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
                _newPar[key] = obj[key];
            }
        }
        return _newPar;
    },
    //数据类型判断
    //ecDo.istype([],'array')
    //true
    //ecDo.istype([])
    //'[object Array]'
    istype(o, type) {
        switch (type.toLowerCase()) {
            case 'string':
                return Object.prototype.toString.call(o) === '[object String]';
            case 'number':
                return Object.prototype.toString.call(o) === '[object Number]';
            case 'boolean':
                return Object.prototype.toString.call(o) === '[object Boolean]';
            case 'undefined':
                return Object.prototype.toString.call(o) === '[object Undefined]';
            case 'null':
                return Object.prototype.toString.call(o) === '[object Null]';
            case 'function':
                return Object.prototype.toString.call(o) === '[object Function]';
            case 'array':
                return Object.prototype.toString.call(o) === '[object Array]';
            case 'object':
                return Object.prototype.toString.call(o) === '[object Object]';
            case 'nan':
                return isNaN(o);
            case 'elements':
                return Object.prototype.toString.call(o).indexOf('HTML') !== -1
            default:
                return Object.prototype.toString.call(o)
        }
    },
    //手机类型判断
    browerInfo(type) {
        switch (type) {
            case 'android':
                return navigator.userAgent.toLowerCase.indexOf('android') !== -1
            case 'iphone':
                return navigator.userAgent.toLowerCase.indexOf('iphone') !== -1
            case 'ipad':
                return navigator.userAgent.toLowerCase().indexOf('ipad') !== -1
            case 'weixin':
                return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
            default:
                return navigator.userAgent.toLowerCase()
        }
    },
    //函数节流，阻止频繁调用
    delayFn(fn, delay, mustDelay) {
        let timer = null
        let t_start
        return function () {
            let context = this,
                args = arguments
            let t_cur = +new Data()
            clearTimeout(timer)
            if (!t_start) {
                t_start = t_cur
            }
            if (t_cur - t_start > mustDelay) {
                fn.apply(context, args)
                t_start = t_cur
            } else {
                timer = setTimeout(() => {
                    fn.apply(context, args)
                }, delay)
            }
        }
    },
    //设置cookie
    setCookie(name, value, iDay) {
        let oDate = new Date()
        oDate.setDate(oDate.getDate() + iDay)
        document.cookie = name + "=" + value + ';expires=' + oDate;
    },
    //获取cookie
    getCookie(name) {
        let arr = document.cookie.split('; '),
            arr2
        for (let i = 0; i < arr.length; i++) {
            arr2 = arr[i].split('=')
            if (arr2[0] == name) {
                return arr2[1]
            }
        }
        return ''
    },
    //删除cookie
    removeCookie(name) {
        this.setCookie(name, 1, -1)
    },
    //检测对象是否有哪个类名
    hasClass(obj, classStr) {
        let reg = new RegExp('(^|\\s)' + classStr + '(\\s|$)')
        return reg.test(obj.className)
    },
    //添加类名
    addClass(el, classNmae) {
        if (this.hasClass(el, classNmae)) {
            return
        }
        el.className += ' ' + classNmae
    },
    //删除类名
    removeClass(el, classStr) {
        let reg
        if (this.hasClass(el, className)) {
            reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
            el.className = el.className.replace(reg, '')
        }
    },
    //替换类名
    replaceClassName(el, newName, oldName) {
        this.removeClass(el, oldName)
        this.addClass(el, newName)
    },
    //设置样式
    css(el, json) {
        for (let attr in json) {
            obj.style[attr] = json[attr]
        }
    },
    //显示隐藏
    show(obj) {
        let blockArr = ['div', 'li', 'ul', 'ol', 'dl', 'table', 'article', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'hr', 'header', 'footer', 'details', 'summary', 'section', 'aside', '']
        if (blockArr.indexOf(obj.tagName.toLocaleLowerCase()) === -1) {
            obj.style.display = 'inline';
        } else {
            obj.style.display = 'block';
        }
    },
    hide(obj) {
        obj.style.display = "none";
    },

}