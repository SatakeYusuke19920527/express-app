import { Connection } from 'tedious';

// DB接続情報
export const DBconfig = {
  
};

/**
 * DB connectionの作成
 * @returns open済のコネクション
 */
export const createOpenConnection = (): Promise<Connection> => {
  const con = new Connection(DBconfig)
  const p: Promise<Connection> = new Promise(function (resolve, reject) {
    con.on('connect', (err: any) => {
      if (err) {
        reject(err)
      } else {
        resolve(con)
      }
    });
    con.connect()
  });
  return p
}