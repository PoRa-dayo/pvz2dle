"use strict";
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