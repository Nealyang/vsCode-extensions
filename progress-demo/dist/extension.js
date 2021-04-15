/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");;

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const vscode = __webpack_require__(1);
function showProgress() {
    vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: "加载中...",
        cancellable: true
    }, (progress, token) => {
        token.onCancellationRequested(() => {
            console.log('用户点击取消！');
        });
        progress.report({ increment: 0 });
        setTimeout(() => {
            progress.report({ increment: 10, message: "快了快了，已经 10% 了" });
        }, 1000);
        setTimeout(() => {
            progress.report({ increment: 20, message: "快了快了，已经 30% 了" });
        }, 2000);
        setTimeout(() => {
            progress.report({ increment: 10, message: "快了快了，已经 40% 了" });
        }, 3000);
        setTimeout(() => {
            progress.report({ increment: 20, message: "快了快了，已经 60% 了" });
        }, 4000);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 7000);
        });
    });
}
exports.default = vscode.commands.registerCommand('progressDemo.progress', showProgress);


/***/ })
/******/ 	]);
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
/******/ 			// no module.id needed
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const vscode = __webpack_require__(1);
const progress_1 = __webpack_require__(2);
function activate(context) {
    vscode.window.showInformationMessage('插件启动成功');
    context.subscriptions.push(progress_1.default);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map