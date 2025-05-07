"use strict";
let IsMobile = void 0;
let IsIOS = void 0;
let IsFakeMac = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
function checkRunningEnvironment(IsTouchConfirmed=false){
    IsMobile = (IsTouchConfirmed || IsFakeMac) ? true : (/Android|iPhone|iPad/).test(navigator.userAgent);
    let SecondRegex = (IsTouchConfirmed || IsFakeMac) ? /iPhone|iPad|Mac/ : /iPhone|iPad/;
    IsIOS=!((/Android/).test(navigator.userAgent)) && (SecondRegex).test(navigator.userAgent);
}
checkRunningEnvironment();
sessionStorage.removeItem("First_Start");
const __cssNumberWhiteList__ = {
    'column-count': 1,
    'columns': 1,
    'font-weight': 1,
    'line-height': 1,
    'opacity': 1,
    'z-index': 1,
    'zoom': 1,
    'animation-iteration-count': 1,
};
const isNullish = (val) => (val === void 0 || val === null);
const $ = (id) => id && document.getElementById(id);
const $$ = (expression) => expression && document.querySelector(expression);
const $n = tag => document.createElement(tag);
const ClearChild = (...arr) => arr.forEach(ele => ele?.remove && ele.remove());
// 此函数是隐藏，同时清除元素占位
const SetBlock = (...arr) => arr.forEach(ele => (ele.style.display = "block"));
const SetNone = (...arr) => arr.forEach(ele => ele?.style && (ele.style.display = "none"));
const SetVisible = (...arr) => arr.forEach(ele => ele && (ele.style.visibility = "visible")),
    SetHidden = (...arr) => arr.forEach(ele => (ele.style.visibility = "hidden")),  //此函数是隐藏，但只是看不见，元素会占位
    SetAlpha = (ele, alpha) => (ele.style.opacity = alpha),
    innerText = (ele, str) => (ele.innerText = str);
const SetStyle = (ele, json) => {
    if (isNullish(ele)) {
        console.warn(`[PVZTR] Element does not exist!`);
        return;
    }
    const styleObject = ele.style;
    for (let key in json) {
        let value = json[key];
        value && (typeof value === "number") && !__cssNumberWhiteList__[key] && (
            value += "px"
        );
        styleObject.setProperty(key, value);
    }
    return ele;
};
const NewEle = function(id, tag, cssText, properties, wrap) { //创建新元素
    const ele = $n(tag);
    ele.id = id;
    !isNullish(cssText) && ele.setAttribute('style', cssText);
    Object.assign(ele, properties);
    wrap && wrap.appendChild(ele);
    return ele;
};
Reflect.defineProperty(Array.prototype, 'random', {  //从数组中随机抽取一个元素
    enumerable: false,
    value() {
        return this[Number.parseInt(Math.random() * this.length)];
    },
});
const NewImg = function(id, src, cssText, wrap, properties) { //创建新图片
    let _properties = {
        src
    };
    Object.assign(_properties, properties);
    return NewEle(id, 'img', cssText, _properties, wrap);
};
//采用Xorshift128算法生成随机数
Math.seededRandomV2 = (max = null, min = null) => {
    min > max && ([min, max] = [max, min]);
    let [state0, state1] = Math.seedV2;
    let s1 = BigInt(state0);
    let s0 = BigInt(state1);
    state0 = s0;
    s1 ^= s1 << 23n;
    s1 ^= s1 >> 17n;
    s1 ^= s0;
    s1 ^= s0 >> 26n;
    state1 = s1;
    Math.seedV2 = {
        val: [state0 % BigInt(1e150), state1 % BigInt(1e150)]
    };      //这里采用避免循环的设置
    let z = Number((state0 + state1) % BigInt(1e18)) / 1e18;
    if (max === null || min === null) {
        return z;
    } else {
        return z * (max - min) + min;
    }
};
Math._twoPI_ = Math.PI * 2;
{
    let __tmpSummon__ = null;
    let __summoned__ = 1;
    //生成高斯分布的随机数，mu为均值，sigma为方差
    Math.Grandom = (mu = 0, sigma = 1) => {
        if (__summoned__ ^= 1) {
            return __tmpSummon__ * sigma + mu;
        }
        let u1 = 1 - Math.random();
        let u2 = Math.random();
        let radius = Math.sqrt(-2 * Math.log(u1));
        let theta = Math._twoPI_ * u2;
        __tmpSummon__ = radius * Math.sin(theta);
        return radius * Math.cos(theta) * sigma + mu;
    };
};
Reflect.defineProperty(Math, 'seedV2', {  //查询对象中own属性数量
    configurable: false,
    get() {
        return this.val;
    },
    set(val) {
        if (val instanceof Array) {
            this.val = val;
            for (let i = 1; i <= 10; i++) {
                Math.seededRandomV2();
            }
        } else {
            this.val = val.val;
        }
    }
});
Math.seedV2 = [3, 2];

const oEffects = {
    /* Animate调用说明（请确保修改属性是css3所兼容的！）
    ele：需要生成动画的元素
    properties：需要生成动画的样式，必传。例如：{'width': '300px'}
    duration: 过渡时间（秒）（默认0.4s）。可传入字符串fast (0.2s)或slow (0.6s)。
    ease: 缓动函数，默认linear，即匀速运动
    callback: 动画完成后的回调函数
    delay: 动画延迟执行的时间（秒）（默认无延迟）
    */
    StopAllAnims(ele,toCancel=false){//stop代指是不是终止而不是完成动画
        ele.getAnimations().map(anim=>{
            if(toCancel){
                anim.cancel();
            }else{
                anim.finish();
            }
        });
    },
    //NOTE: Also be wary of the polyfill version of oEffects.Animate in add-ons/polyfillGame.js
    //NOTE: clip-path does NOT work with effectType 'animation' for some reason
    Animate(ele, properties, duration = 0.4, ease = 'linear', callback, delay = 0, iterationCount = 1, effectType = 'animation') {
        if(!ele){
            console.warn('Element does not exist!');
            return;
        }
        let cssValues = {};
        let cssProperties = [];
        let cssList = ['-name', '-property', '-duration', '-delay', '-timing-function'];
        typeof duration === 'string' && (duration = {
            fast: 0.2,
            slow: 0.6
        } [duration]);
        /* 生成css代码 */
        if (typeof properties === 'string') {
            cssValues['animation-name'] = properties;
            cssValues['animation-duration'] = duration + 's';
            cssValues['animation-delay'] = delay + 's';
            cssValues['animation-timing-function'] = ease;
            cssValues['animation-iteration-count'] = iterationCount;
            cssValues['animation-fill-mode'] = 'none';
            effectType = 'animation';
            cssList = cssList.map(key => effectType + key);
            /* 设置动画完成监听 */
            ele.addEventListener(effectType + 'end', function _callback(event) {
                if (event.target !== event.currentTarget) return; //规避冒泡
                ele.removeEventListener(effectType + 'end', _callback); //避免多个属性同时改变时重复触发回调！
                for (let index of cssList) ele.style[index] = ''; //还原动画配置属性
                callback && callback(ele); //触发传入回调
            });
            /* 触发动画 */
            ele.clientLeft; //触发页面的回流，使得动画的样式设置上去时可以立即执行
            SetStyle(ele, cssValues);
        } else {
            if (effectType === 'transition') {
                const PropertiesBackup = {};
                for (let index in properties) {
                    let value = properties[index];
                    value && (typeof value === "number") && !__cssNumberWhiteList__[index] && (
                        value += "px",
                            console.trace(`[PVZTR] It is not recommended to set style without unit. ${index}:${value}`)
                    );
                    //自定义样式
                    cssValues[index] = properties[index];
                    // 备份修改前的内联样式属性
                    PropertiesBackup[index] = ele.style[index];
                    //记录需要为哪些样式调用动画
                    cssProperties.push(index);
                    if (ele.style[index] === value + "" && callback) {
                        console.warn(`Attempt to animate an element with the same target "${index}" value as its current "${index}" value and with a callback included. Please make sure that it works properly on mobile devices.`);
                        callback(ele);
                    }
                }
                cssValues['transition-property'] = cssProperties.join(', ');
                let traverse = {
                    "duration": [duration, "s, ", "s"],
                    "delay": [delay, "s, ", "s"],
                    "timing-function": [ease, ", ", ""]
                };
                for (let i in traverse) {
                    if (!traverse[i]) return;
                    if (typeof traverse[i][0] != 'object') {
                        cssValues['transition-' + i] = traverse[i][0] + traverse[i][2];
                    } else {
                        cssValues['transition-' + i] = traverse[i][0]?.join(traverse[i][1]) + traverse[i][2];
                    }
                }
                cssList = cssList.map(key => effectType + key);
                /* 设置动画完成监听 */
                const finishAnim = () => {
                    // 还原动画配置属性
                    for (let index of cssList) ele.style[index] = '';
                    // 删除自定义的操作方法
                    delete ele.__jng_cancelAnim__;
                    delete ele.__jng_finishAnim__;
                    //触发传入回调
                    callback && callback(ele);
                };
                ele.addEventListener(effectType + 'end', function _callback(event) {
                    // 规避冒泡/捕获
                    if (event.target !== event.currentTarget) return;
                    //避免多个属性同时改变时重复触发回调！
                    ele.removeEventListener(effectType + 'end', _callback);
                    // 调用通用回调
                    finishAnim();
                });
                /* 设置取消动画操作 */
                Object.defineProperty(ele, '__jng_cancelAnim__', {
                    value: function() {
                        // 清除动画配置属性
                        for (let index of cssList) {
                            this.style[index] = '';
                        }
                        // 恢复被修改的css样式
                        for (let styleName in PropertiesBackup) {
                            this.style[styleName] = PropertiesBackup[styleName];
                        }
                        // 删除自定义的操作方法
                        delete this.__jng_cancelAnim__;
                        delete this.__jng_finishAnim__;
                    },
                    enumerable: false,
                    configurable: true,
                });
                Object.defineProperty(ele, '__jng_finishAnim__', {
                    value: function() {
                        // 直接设置元素为最终的样式状态
                        typeof duration !== 'string' && SetStyle(this, properties);
                        // 调用通用回调
                        finishAnim();
                    },
                    enumerable: false,
                    configurable: true,
                });
                /* 触发动画 */
                ele.clientLeft; //触发页面的回流，使得动画的样式设置上去时可以立即执行
                SetStyle(ele, cssValues);
            } else {

                effectType = 'animation';
                for (let key in properties) {
                    let value = properties[key];
                    value && (typeof value === "number") && !__cssNumberWhiteList__[key] && (
                        value += "px",
                            console.trace(`[PVZTR] It is not recommended to set style without unit. ${key}:${value}`)
                    );
                    properties[key] = value;
                    if (ele.style[key] === value + "" && callback) {
                        console.warn(`Attempt to animate an element with the same target "${key}" value as its current "${key}" value and with a callback included. Please make sure that it works properly on mobile devices.`);
                    }
                }
                let anim = ele.animate([properties],{
                    easing:ease||"linear",
                    duration:duration*1000,
                    delay:delay*1000,
                    iterations:iterationCount,
                });
                anim.onfinish = function(){
                    anim.onfinish=null;
                    SetStyle(ele,properties);
                    callback && callback(ele); //触发传入回调
                };
            }
        }
        return ele;
    },
    animatePromise(ele, properties, {duration, easing, delay, iterationCount, effectType}) {
        return new Promise((resolve) => {
            oEffects.Animate(ele, properties, duration, easing, resolve, delay, iterationCount, effectType);
        });
    },
    //自定义淡入
    fadeTo: (ele, opacity, duration, callback)=>oEffects.Animate(ele, {opacity: opacity}, duration, undefined, callback),
    //从无到有淡入
    fadeIn: (ele, duration, callback)=>oEffects.fadeTo(ele, 1, duration, callback),
    //从有到无淡出
    fadeOut: (ele, duration, callback, delay)=>oEffects.fadeTo(ele, 0, duration, callback, delay),
}