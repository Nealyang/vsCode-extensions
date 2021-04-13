import * as vscode from 'vscode';


// activate方法会在插件被激活的时候调用
export function activate(context: vscode.ExtensionContext) {

	// 这段代码只在插件被激活的时候执行
	console.log('插件被激活了！！!');

	//  command 已经在 package.json 中声明了
	// 通过 registerCommand 来注入命令的具体实现
	// 这里的命令必须是 package.json 中声明的那个
	let disposable = vscode.commands.registerCommand('helloWorld.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// 每一次代用你的按个 command 的时候，这里的代码都会被执行

		// 弹窗
		vscode.window.showInformationMessage('Hello World from helloWorld!');
	});

	// 有没有pubSub 的味道？ 订阅一下
	context.subscriptions.push(disposable);
}

// 插件被销毁的时候，会调用这个方法，清楚缓存、释放内存等
export function deactivate() {}
