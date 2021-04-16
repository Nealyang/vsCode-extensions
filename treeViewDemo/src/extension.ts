import * as vscode from 'vscode';
import {TestView} from './testView';

export function activate(context: vscode.ExtensionContext) {
	vscode.window.showInformationMessage('插件启动成功！');
	new TestView(context);
	// context.subscriptions.push(disposable);
}


export function deactivate() {}
