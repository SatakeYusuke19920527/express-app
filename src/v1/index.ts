import express from 'express'
const router = express.Router();

type User = {
  id: number
  name: string
  email: string
};

const users: User[] = [
  { id: 1, name: "User1", email: "user1@test.local" },
  { id: 2, name: "User2", email: "user2@test.local" },
  { id: 3, name: "User3", email: "user3@test.local" }
]

router.get('/', function (req: express.Request, res: express.Response, next: express.NextFunction) {
  res.send(JSON.stringify(users))
  next()
});

router.get('/user3', function (req: express.Request, res: express.Response, next: express.NextFunction) {
  const result = users.filter(user => user.id === 3)
  const returnObj = JSON.stringify(result)
  res.send(JSON.stringify(returnObj))
  next()
});



module.exports = router;