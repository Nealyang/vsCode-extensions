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
exports.TestView = void 0;
const vscode = __webpack_require__(1);
class TestView {
    constructor(context) {
        const view = vscode.window.createTreeView('id_1', {
            treeDataProvider: aNodeWithIdTreeDataProvider(),
            showCollapseAll: false
        });
        context.subscriptions.push(view);
    }
}
exports.TestView = TestView;
const tree = {
    '全栈前端': {
        '作者': "Nealyang",
        '宠物': {
            '名字': '橘子',
            '品种': '橘猫',
            '年龄': 1,
        }
    },
    '测试分组': {
        '第二级': "啦啦啦啦",
        '第三级': {
            '1': '4',
            '2': '5',
            '3': 6,
        }
    },
    '3': '单独的字符串'
};
function aNodeWithIdTreeDataProvider() {
    return {
        getChildren: (ele) => {
            const arr = [];
            const curTree = ele || tree;
            for (let item in curTree) {
                const activeItem = curTree[item];
                if (typeof activeItem !== "object") {
                    arr.push(`${item}:${activeItem}`);
                }
                else {
                    Object.defineProperty(activeItem, '__key__', {
                        get() {
                            return item;
                        },
                        enumerable: false
                    });
                    arr.push(activeItem);
                }
            }
            console.log('getChildren:::', '入参：', ele, '，出参：', arr);
            return arr;
        },
        getTreeItem: (ele) => {
            let treeItem = {};
            console.log('getTreeItem:', ele);
            if (typeof ele === "string") {
                treeItem = {
                    label: ele,
                    collapsibleState: vscode.TreeItemCollapsibleState.None,
                    tooltip: '单纯的字符串'
                };
            }
            else {
                treeItem = {
                    label: ele.__key__,
                    collapsibleState: vscode.TreeItemCollapsibleState.Collapsed,
                    tooltip: '可展开'
                };
            }
            return treeItem;
        }
    };
}


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Dependency = exports.DepNodeProvider = void 0;
const vscode = __webpack_require__(1);
const fs = __webpack_require__(4);
const path = __webpack_require__(5);
class DepNodeProvider {
    constructor(workspaceRoot) {
        this.workspaceRoot = workspaceRoot;
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (!this.workspaceRoot) {
            vscode.window.showInformationMessage('No dependency in empty workspace');
            return Promise.resolve([]);
        }
        if (element) {
            return Promise.resolve(this.getDepsInPackageJson(path.join(this.workspaceRoot, 'node_modules', element.label, 'package.json')));
        }
        else {
            const packageJsonPath = path.join(this.workspaceRoot, 'package.json');
            if (this.pathExists(packageJsonPath)) {
                return Promise.resolve(this.getDepsInPackageJson(packageJsonPath));
            }
            else {
                vscode.window.showInformationMessage('workSpace has no package.json');
                return Promise.resolve([]);
            }
        }
    }
    getDepsInPackageJson(packageJsonPath) {
        if (this.pathExists(packageJsonPath)) {
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
            const toDep = (moduleName, version) => {
                if (this.pathExists(path.join(this.workspaceRoot, 'node_modules', moduleName))) {
                    return new Dependency(moduleName, version, vscode.TreeItemCollapsibleState.Collapsed);
                }
                else {
                    return new Dependency(moduleName, version, vscode.TreeItemCollapsibleState.None, {
                        command: "extension.openPackageOnNpm",
                        title: '',
                        arguments: [moduleName]
                    });
                }
            };
            const deps = packageJson.dependencies ? Object.keys(packageJson.dependencies).map(dep => toDep(dep, packageJson.dependencies[dep])) : [];
            const devDeps = packageJson.devDependencies
                ? Object.keys(packageJson.devDependencies).map(dep => toDep(dep, packageJson.devDependencies[dep]))
                : [];
            return deps.concat(devDeps);
        }
        else {
            return [];
        }
    }
    pathExists(p) {
        try {
            fs.accessSync(p);
        }
        catch (error) {
            return false;
        }
        return true;
    }
}
exports.DepNodeProvider = DepNodeProvider;
class Dependency extends vscode.TreeItem {
    constructor(label, version, collapsibleState, command) {
        super(label, collapsibleState);
        this.label = label;
        this.version = version;
        this.collapsibleState = collapsibleState;
        this.command = command;
        this.iconPath = {
            light: path.join(__filename, '..', '..', 'resources', 'light', 'dependency.svg'),
            dark: path.join(__filename, '..', '..', 'resources', 'dark', 'dependency.svg')
        };
        this.contextValue = 'dependency';
        this.tooltip = `${this.label}-${this.version}`;
        this.description = this.version;
    }
}
exports.Dependency = Dependency;


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("fs");;

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("path");;

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
const testView_1 = __webpack_require__(2);
const nodeDependencies_1 = __webpack_require__(3);
function activate(context) {
    vscode.window.showInformationMessage('插件启动成功！');
    const nodeDependenciesProvider = new nodeDependencies_1.DepNodeProvider(vscode.workspace.rootPath || '');
    vscode.window.registerTreeDataProvider('node_dependencies', nodeDependenciesProvider);
    vscode.commands.registerCommand('extension.openPackageOnNpm', moduleName => vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`https://www.npmjs.com/package/${moduleName}`)));
    new testView_1.TestView(context);
    // context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map