import * as vscode from 'vscode';

export class TestView {
  constructor(context: vscode.ExtensionContext) {
    const view = vscode.window.createTreeView('id_1',{
      treeDataProvider:aNodeWithIdTreeDataProvider(),
      showCollapseAll:false
    });
    context.subscriptions.push(view);
  }
}

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
}

function aNodeWithIdTreeDataProvider(): vscode.TreeDataProvider<any> {
  return {
    getChildren: (ele): any[] => {
      const arr : any[]= [];
      const curTree = ele || tree;
      for(let item in curTree){
        const activeItem = curTree[item];
        if(typeof activeItem !== "object"){
          arr.push(`${item}:${activeItem}`);
        }else{
          Object.defineProperty(activeItem,'__key__',{
            get(){
              return item;
            },
            enumerable:false
          })
          arr.push(activeItem);
        }
      }
      console.log('getChildren:::','入参：',ele,'，出参：',arr);
      return arr;
    },
    getTreeItem:(ele):vscode.TreeItem=>{
      let treeItem:vscode.TreeItem = {};
      console.log('getTreeItem:',ele);

      if(typeof ele === "string"){
        treeItem = {
          label:ele,
          collapsibleState:vscode.TreeItemCollapsibleState.None,
          tooltip:'单纯的字符串'
        }
      }else{
        treeItem = {
          label:ele.__key__,
          collapsibleState:vscode.TreeItemCollapsibleState.Collapsed,
          tooltip:'可展开'
        }
      }
      return treeItem;
    }
  }
}