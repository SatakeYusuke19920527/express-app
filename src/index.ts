import express from 'express'
const app: express.Express = express()
const usersRouter = require('./v1/index')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//CROS対応（というか完全無防備：本番環境ではだめ絶対）
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*")
  res.header("Access-Control-Allow-Headers", "*");
  next();
})

app.use("/v1/users", usersRouter)

app.listen(4000, () => {
  console.log("Start on port 4000.")
})