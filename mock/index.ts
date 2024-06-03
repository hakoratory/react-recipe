import { handlers } from './handler';

// グローバル変数として worker を定義
export let worker: any;

// クライアントサイドで実行する場合のみ、mswをロードし、workerを設定する
if (typeof window !== 'undefined') {
  import('msw/browser')
    .then(({ setupWorker }) => {
      // MSWのworkerインスタンスを作成
      worker = setupWorker(...handlers);

      // 開発環境の場合にのみ、workerを起動する
      if (process.env.NODE_ENV === 'development') {
        console.log('fkjalfk')
        worker.start();
      }
    })
    .catch((error) => console.error('Failed to load MSW:', error));
}