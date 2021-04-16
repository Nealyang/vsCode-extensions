import * as vscode from 'vscode';
import {TestView} from './testView';
import { DepNodeProvider } from "./nodeDependencies";
import { FileExplorer } from './fileExplorer';

export function activate(context: vscode.ExtensionContext) {
	vscode.window.showInformationMessage('插件启动成功！');
	const nodeDependenciesProvider = new DepNodeProvider(vscode.workspace.rootPath || '');
	vscode.window.registerTreeDataProvider('node_dependencies',nodeDependenciesProvider);
	vscode.commands.registerCommand('extension.openPackageOnNpm', moduleName => vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`https://www.npmjs.com/package/${moduleName}`)));
	new TestView(context);
	new FileExplorer(context);
	// context.subscriptions.push(disposable);
}


export function deactivate() {}
