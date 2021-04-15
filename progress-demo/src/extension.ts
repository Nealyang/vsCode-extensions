import * as vscode from 'vscode';
import progressDemo from './progress';
export function activate(context: vscode.ExtensionContext) {

	vscode.window.showInformationMessage('插件启动成功');
	context.subscriptions.push(progressDemo);
}

export function deactivate() {}
