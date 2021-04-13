import * as vscode from 'vscode';

export default  vscode.commands.registerCommand('execCommand.definitionProvider',async ()=>{
  const activeEditor = vscode.window.activeTextEditor;
  if(!activeEditor) return;
  console.log(activeEditor);

  const definitions = await vscode.commands.executeCommand<vscode.Location>('vscode.executeDefinitionProvider',activeEditor.document.uri,activeEditor.selection.active);
  console.error(definitions);

  // @ts-ignore
  for(const definition of definitions){
    console.log(definition);
  }
})