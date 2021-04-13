import * as vscode from 'vscode';
import { commentLine } from './commentLine';
import definitionProvider from "./definitionProvider";


export function activate(context: vscode.ExtensionContext) {

	vscode.window.showInformationMessage('启动');


	let disposable = vscode.commands.registerCommand('execCommand.helloWorld', () => {

		vscode.window.showInformationMessage('Hello World from execCommand!');
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(commentLine);
	context.subscriptions.push(definitionProvider);
}


export function deactivate() { }
