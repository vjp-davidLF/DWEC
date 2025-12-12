/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/styles.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/styles.css ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `/* src/css/styles.css */\r\n/* ============================================\r\n   ESTILOS PARA MINI-MARKET\r\n   ============================================ */\r\n\r\n/* RESET BÁSICO */\r\n* {\r\n    margin: 0;\r\n    padding: 0;\r\n    box-sizing: border-box;\r\n}\r\n\r\nbody {\r\n    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\r\n    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\r\n    color: #222;\r\n    line-height: 1.6;\r\n    padding: 20px;\r\n    min-height: 100vh;\r\n}\r\n\r\n/* HEADER SIMPLE Y ELEGANTE */\r\nheader {\r\n    background: linear-gradient(135deg, #FF6B6B 0%, #FF8E72 100%);\r\n    color: white;\r\n    padding: 25px;\r\n    border-radius: 12px;\r\n    margin-bottom: 40px;\r\n    box-shadow: 0 8px 16px rgba(0,0,0,0.2);\r\n}\r\n\r\nheader h1 {\r\n    font-size: 36px;\r\n    margin-bottom: 20px;\r\n    text-align: center;\r\n    font-weight: bold;\r\n    text-shadow: 2px 2px 4px rgba(0,0,0,0.2);\r\n}\r\n\r\nnav ul {\r\n    display: flex;\r\n    justify-content: center;\r\n    list-style: none;\r\n    flex-wrap: wrap;\r\n    gap: 25px;\r\n}\r\n\r\nnav a {\r\n    color: white;\r\n    text-decoration: none;\r\n    padding: 10px 18px;\r\n    border-radius: 6px;\r\n    transition: all 0.3s;\r\n    font-weight: 500;\r\n    font-size: 16px;\r\n}\r\n\r\nnav a:hover {\r\n    background: rgba(255,255,255,0.3);\r\n    transform: scale(1.05);\r\n}\r\n\r\n/* Submenú simple */\r\nnav ul li ul {\r\n    display: none;\r\n    position: absolute;\r\n    background: white;\r\n    border-radius: 8px;\r\n    box-shadow: 0 8px 16px rgba(0,0,0,0.2);\r\n    min-width: 180px;\r\n    padding: 10px 0;\r\n    z-index: 100;\r\n}\r\n\r\nnav ul li:hover ul {\r\n    display: block;\r\n}\r\n\r\nnav ul li ul a {\r\n    color: #FF6B6B;\r\n    display: block;\r\n    padding: 12px 20px;\r\n    font-weight: 500;\r\n}\r\n\r\nnav ul li ul a:hover {\r\n    background: #FFE5E5;\r\n}\r\n\r\n/* Contador del carrito */\r\n#contador-cesta {\r\n    background: #FFD93D;\r\n    color: #222;\r\n    padding: 4px 10px;\r\n    border-radius: 15px;\r\n    font-size: 14px;\r\n    margin-left: 5px;\r\n    font-weight: bold;\r\n}\r\n\r\n/* CONTENEDOR DE PRODUCTOS */\r\n#productos {\r\n    max-width: 1200px;\r\n    margin: 0 auto;\r\n}\r\n\r\n/* CONTENEDOR DE PRODUCTOS */\r\n#productos {\r\n    max-width: 1200px;\r\n    margin: 0 auto;\r\n}\r\n\r\n#productos > h2 {\r\n    color: white;\r\n    margin-bottom: 30px;\r\n    padding-bottom: 15px;\r\n    border-bottom: 3px solid #FFD93D;\r\n    font-size: 28px;\r\n    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);\r\n}\r\n\r\n/* TARJETAS DE PRODUCTO */\r\n#productos > div {\r\n    background: white;\r\n    border-radius: 12px;\r\n    padding: 20px;\r\n    margin-bottom: 25px;\r\n    box-shadow: 0 8px 20px rgba(0,0,0,0.15);\r\n    transition: transform 0.3s, box-shadow 0.3s;\r\n    border-left: 5px solid #FF6B6B;\r\n}\r\n\r\n#productos > div:hover {\r\n    transform: translateY(-8px);\r\n    box-shadow: 0 12px 28px rgba(0,0,0,0.25);\r\n}\r\n\r\n#productos h3 {\r\n    color: #FF6B6B;\r\n    margin-bottom: 12px;\r\n    font-size: 22px;\r\n    font-weight: bold;\r\n}\r\n\r\n#productos img {\r\n    width: 100%;\r\n    max-width: 300px;\r\n    height: 200px;\r\n    object-fit: cover;\r\n    border-radius: 8px;\r\n    margin: 15px 0;\r\n    border: 3px solid #FF6B6B;\r\n    box-shadow: 0 4px 8px rgba(0,0,0,0.1);\r\n}\r\n\r\n#productos p {\r\n    margin: 12px 0;\r\n    color: #444;\r\n    line-height: 1.6;\r\n}\r\n\r\n#productos strong {\r\n    color: #FFD93D;\r\n    font-size: 24px;\r\n    display: block;\r\n    margin-top: 10px;\r\n}\r\n\r\n/* BOTONES */\r\nbutton.comprar, button.eliminar {\r\n    border: none;\r\n    padding: 12px 24px;\r\n    border-radius: 6px;\r\n    cursor: pointer;\r\n    font-size: 16px;\r\n    margin-top: 15px;\r\n    transition: all 0.3s;\r\n    font-weight: bold;\r\n    text-transform: uppercase;\r\n}\r\n\r\nbutton.comprar {\r\n    background: linear-gradient(135deg, #FF6B6B 0%, #FF8E72 100%);\r\n    color: white;\r\n}\r\n\r\nbutton.comprar:hover {\r\n    transform: scale(1.05);\r\n    box-shadow: 0 6px 12px rgba(255,107,107,0.4);\r\n}\r\n\r\nbutton.eliminar {\r\n    background: #FF4757;\r\n    color: white;\r\n}\r\n\r\nbutton.eliminar:hover {\r\n    background: #FF3838;\r\n    transform: scale(1.05);\r\n}\r\n\r\n/* TABLA DE LA CESTA */\r\n#tabla-cesta {\r\n    width: 100%;\r\n    border-collapse: collapse;\r\n    margin-top: 30px;\r\n    background: white;\r\n    border-radius: 12px;\r\n    overflow: hidden;\r\n    box-shadow: 0 8px 20px rgba(0,0,0,0.15);\r\n}\r\n\r\n#tabla-cesta th {\r\n    background: linear-gradient(135deg, #FF6B6B 0%, #FF8E72 100%);\r\n    color: white;\r\n    padding: 18px;\r\n    text-align: left;\r\n    font-weight: bold;\r\n    font-size: 16px;\r\n}\r\n\r\n#tabla-cesta td {\r\n    padding: 15px 18px;\r\n    border-bottom: 1px solid #eee;\r\n    color: #333;\r\n}\r\n\r\n#tabla-cesta tr:hover {\r\n    background: #FFF5F5;\r\n}\r\n\r\n/* PRECIO TOTAL */\r\n#precio-total {\r\n    font-size: 26px;\r\n    font-weight: bold;\r\n    color: white;\r\n    margin-top: 30px;\r\n    padding: 20px 25px;\r\n    background: linear-gradient(135deg, #FFD93D 0%, #FF6B6B 100%);\r\n    border-radius: 10px;\r\n    display: inline-block;\r\n    box-shadow: 0 8px 16px rgba(0,0,0,0.2);\r\n    text-shadow: 1px 1px 2px rgba(0,0,0,0.2);\r\n}\r\n\r\n/* LÍNEA SEPARADORA */\r\nhr {\r\n    border: none;\r\n    height: 1px;\r\n    background: #eee;\r\n    margin: 20px 0;\r\n}\r\n\r\n/* RESPONSIVE BÁSICO */\r\n@media (max-width: 768px) {\r\n    body {\r\n        padding: 10px;\r\n    }\r\n    \r\n    nav ul {\r\n        flex-direction: column;\r\n        align-items: center;\r\n        gap: 10px;\r\n    }\r\n    \r\n    #productos > div {\r\n        padding: 15px;\r\n    }\r\n}`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://mini-market/./src/css/styles.css?./node_modules/css-loader/dist/cjs.js\n}");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("{\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://mini-market/./node_modules/css-loader/dist/runtime/api.js?\n}");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("{\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://mini-market/./node_modules/css-loader/dist/runtime/noSourceMaps.js?\n}");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("{\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://mini-market/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?\n}");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("{\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://mini-market/./node_modules/style-loader/dist/runtime/insertBySelector.js?\n}");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("{\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://mini-market/./node_modules/style-loader/dist/runtime/insertStyleElement.js?\n}");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("{\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://mini-market/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?\n}");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("{\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://mini-market/./node_modules/style-loader/dist/runtime/styleDomAPI.js?\n}");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("{\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://mini-market/./node_modules/style-loader/dist/runtime/styleTagTransform.js?\n}");

/***/ }),

/***/ "./src/css/styles.css":
/*!****************************!*\
  !*** ./src/css/styles.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./styles.css */ \"./node_modules/css-loader/dist/cjs.js!./src/css/styles.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\noptions.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://mini-market/./src/css/styles.css?\n}");

/***/ }),

/***/ "./src/js/api.js":
/*!***********************!*\
  !*** ./src/js/api.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fetchProductos: () => (/* binding */ fetchProductos)\n/* harmony export */ });\n\r\n\r\nconst API_BASE = 'http://localhost:3001';\r\n\r\n/**\r\n * Obtiene productos de una categoría desde el servidor.\r\n * @param {string} categoria - Nombre de la categoría ('electronica', 'muebles', 'decoracion').\r\n * @returns {Promise<Array>} Lista de productos.\r\n */\r\nasync function fetchProductos(categoria) {\r\n    try {\r\n        const respuesta = await fetch(`${API_BASE}/${categoria}`);\r\n        if (!respuesta.ok) throw new Error('Error al obtener productos');\r\n        const productos = await respuesta.json();\r\n        return productos;\r\n    } catch (error) {\r\n        console.error('Error:', error);\r\n        return [];\r\n    }\r\n}\n\n//# sourceURL=webpack://mini-market/./src/js/api.js?\n}");

/***/ }),

/***/ "./src/js/carrito.js":
/*!***************************!*\
  !*** ./src/js/carrito.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   actualizarContadorCarrito: () => (/* binding */ actualizarContadorCarrito),\n/* harmony export */   \"añadirAlCarrito\": () => (/* binding */ añadirAlCarrito),\n/* harmony export */   calcularPrecioTotal: () => (/* binding */ calcularPrecioTotal),\n/* harmony export */   eliminarDelCarrito: () => (/* binding */ eliminarDelCarrito),\n/* harmony export */   obtenerCarrito: () => (/* binding */ obtenerCarrito),\n/* harmony export */   obtenerTotalProductos: () => (/* binding */ obtenerTotalProductos)\n/* harmony export */ });\n\r\n\r\nconst CARRITO_KEY = 'mini-market-carrito';\r\n\r\n\r\n\r\n/**\r\n * Obtiene todos los productos del carrito desde localStorage.\r\n * @returns {Array} Lista de productos en el carrito.\r\n */\r\nfunction obtenerCarrito() {\r\n    const carritoJSON = localStorage.getItem(CARRITO_KEY);\r\n    return carritoJSON ? JSON.parse(carritoJSON) : [];\r\n}\r\n\r\n/**\r\n * Guarda el carrito completo en localStorage.\r\n * @param {Array} carrito - Lista de productos.\r\n */\r\nfunction guardarCarrito(carrito) {\r\n    localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));\r\n}\r\n\r\n/**\r\n * Añade un producto al carrito.\r\n * @param {Object} producto - Producto a añadir.\r\n */\r\nfunction añadirAlCarrito(producto) {\r\n    const carrito = obtenerCarrito();\r\n    carrito.push(producto);\r\n    guardarCarrito(carrito);\r\n    actualizarContadorCarrito();\r\n}\r\n\r\n/**\r\n * Elimina un producto del carrito por su índice.\r\n * @param {number} indice - Índice del producto a eliminar.\r\n */\r\nfunction eliminarDelCarrito(indice) {\r\n    const carrito = obtenerCarrito();\r\n    carrito.splice(indice, 1);\r\n    guardarCarrito(carrito);\r\n    actualizarContadorCarrito();\r\n}\r\n\r\n/**\r\n * Obtiene el número total de productos en el carrito.\r\n * @returns {number} Cantidad de productos.\r\n */\r\nfunction obtenerTotalProductos() {\r\n    return obtenerCarrito().length;\r\n}\r\n\r\n/**\r\n * Actualiza el contador del carrito en el header.\r\n */\r\nfunction actualizarContadorCarrito() {\r\n    const contador = document.getElementById('contador-cesta');\r\n    if (contador) {\r\n        contador.textContent = obtenerTotalProductos();\r\n    }\r\n}\r\n\r\n/**\r\n * Calcula el precio total de todos los productos en el carrito.\r\n * @returns {number} Precio total.\r\n */\r\nfunction calcularPrecioTotal() {\r\n    const carrito = obtenerCarrito();\r\n    return carrito.reduce((total, producto) => total + parseFloat(producto.precio), 0);\r\n}\n\n//# sourceURL=webpack://mini-market/./src/js/carrito.js?\n}");

/***/ }),

/***/ "./src/js/electronica.js":
/*!*******************************!*\
  !*** ./src/js/electronica.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _header_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header.js */ \"./src/js/header.js\");\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api.js */ \"./src/js/api.js\");\n/* harmony import */ var _carrito_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./carrito.js */ \"./src/js/carrito.js\");\n/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../css/styles.css */ \"./src/css/styles.css\");\n\r\n\r\n\r\n\r\n\r\n\r\ndocument.addEventListener('DOMContentLoaded', async () => {\r\n    // 1. Cargar header\r\n    (0,_header_js__WEBPACK_IMPORTED_MODULE_0__.cargarHeader)();\r\n    \r\n    // 2. Obtener productos de electrónica\r\n    const productos = await (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.fetchProductos)('electronica');\r\n    const contenedor = document.getElementById('productos');\r\n    \r\n    // 3. Mostrar productos\r\n    if (productos.length > 0) {\r\n        contenedor.innerHTML = '<h2>Productos de Electrónica</h2>';\r\n        productos.forEach(producto => {\r\n            const div = document.createElement('div');\r\n            div.innerHTML = `\r\n                <h3>${producto.titulo}</h3>\r\n                <img src=\"${producto.foto}\" width=\"200\" alt=\"${producto.titulo}\">\r\n                <p>${producto.descripcion}</p>\r\n                <p><strong>Precio: ${producto.precio}€</strong></p>\r\n                <button class=\"comprar\" data-id=\"${producto.id}\">Añadir al carrito</button>\r\n                <hr>\r\n            `;\r\n            contenedor.appendChild(div);\r\n        });\r\n        \r\n        // 4. Añadir event listeners a los botones\r\n        document.querySelectorAll('.comprar').forEach(boton => {\r\n            boton.addEventListener('click', (e) => {\r\n                const id = e.target.dataset.id;\r\n                const producto = productos.find(p => p.id == id);\r\n                if (producto) {\r\n                    (0,_carrito_js__WEBPACK_IMPORTED_MODULE_2__[\"añadirAlCarrito\"])(producto);\r\n                    alert(`${producto.titulo} añadido al carrito.`);\r\n                }\r\n            });\r\n        });\r\n    } else {\r\n        contenedor.innerHTML = '<p>No hay productos de electrónica disponibles.</p>';\r\n    }\r\n    \r\n    // 5. Actualizar contador del carrito\r\n    (0,_carrito_js__WEBPACK_IMPORTED_MODULE_2__.actualizarContadorCarrito)();\r\n});\n\n//# sourceURL=webpack://mini-market/./src/js/electronica.js?\n}");

/***/ }),

/***/ "./src/js/header.js":
/*!**************************!*\
  !*** ./src/js/header.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   cargarHeader: () => (/* binding */ cargarHeader)\n/* harmony export */ });\n// src/js/header.js\r\n\r\nfunction cargarHeader() {\r\n    const headerHTML = `\r\n        <header style=\"background-color: #f8f9fa; padding: 1rem; border-bottom: 1px solid #ddd;\">\r\n            <h1>Mini-Market</h1>\r\n            <nav>\r\n                <ul style=\"display: flex; list-style: none; gap: 1rem; padding: 0;\">\r\n                    <li><a href=\"index.html\">Inicio</a></li>\r\n                    <li>\r\n                        <a href=\"#\">Categorías</a>\r\n                        <ul>\r\n                            <li><a href=\"electronica.html\">Electrónica</a></li>\r\n                            <li><a href=\"muebles.html\">Muebles</a></li>\r\n                            <li><a href=\"decoracion.html\">Decoración</a></li>\r\n                        </ul>\r\n                    </li>\r\n                    <li><a href=\"cesta.html\">Cesta de la compra (<span id=\"contador-cesta\">0</span>)</a></li>\r\n                </ul>\r\n            </nav>\r\n        </header>\r\n    `;\r\n\r\n    const headerContainer = document.getElementById('header');\r\n    if (headerContainer) {\r\n        headerContainer.innerHTML = headerHTML;\r\n    }\r\n}\n\n//# sourceURL=webpack://mini-market/./src/js/header.js?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/electronica.js");
/******/ 	
/******/ })()
;