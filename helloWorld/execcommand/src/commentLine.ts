import * as vscode from 'vscode';

export const commentLine = vscode.commands.registerCommand("execCommand.commentLine", () => {
  vscode.commands.executeCommand("editor.action.addCommentLine");
});