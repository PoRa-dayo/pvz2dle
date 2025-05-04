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
        // 为以后全面换用setProperty做准备
        if (IsDevEnvi && /[a-z]+[A-Z]+/.test(key)) {
            console.warn(`[PVZTR] It is not recommended to use camel style named style key values: ${key}`);
        }
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