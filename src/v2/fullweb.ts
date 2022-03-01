import express from 'express'
import { Connection, Request } from 'tedious';
import { createOpenConnection } from '../lib/createOpenConnection';

const router = express.Router()

router.get('/', function (req: express.Request, res: express.Response, next: express.NextFunction) {
  const result = getData()
  console.log("🚀 ~ file: fullweb.ts ~ line 9 ~ result", result)
  next()
});

/**
 * 1時間毎のログインしているユーザー数を取得
 */
export const getData = async () => {
  let result: any[] = []
  let con: Connection = await createOpenConnection();
  try {
    result = await execQuery(con)
  } catch (error) {
    console.log("🚀 ~ file: loginUserStatus.ts ~ line 52 ~ getRealTimeLoginUser ~ error", error)
  } finally {
    con.close()
  }
  return result
}

/**
 * ログイン数を取得して返す。
 * @param con コネクション
 * @returns ログイン数
 */
export const execQuery = (con: Connection): Promise<any[]> => {
  const sql = `select [time], [NumberOfLoginUser] from hLogin`;
  const p: Promise<any[]> = new Promise(function (resolve, reject) {
    const request = new Request(sql, (err: any, rowsCount: any, rows: any) => {
      if (err) {
        reject(err)
        return
      }
      let result: any[] = [];
      if (rowsCount > 0) {
        rows.forEach((row: any) => {
          const loginUser = row[0].value
          const time = row[1].value
          result.push({ numberOfLoginUser: time, now: loginUser })
        });
      }
      resolve(result)
    })
    con.execSql(request)
  });
  return p
}

export default router
