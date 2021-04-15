import * as vscode from 'vscode';

function showProgress() {
  vscode.window.withProgress({
    location: vscode.ProgressLocation.Notification,
    title: "加载中...",
    cancellable: true
  }, (progress, token): any => {
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

    return new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
      }, 7000)
    })
  });
}

export default vscode.commands.registerCommand('progressDemo.progress', showProgress);