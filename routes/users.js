var express = require('express');
var router = express.Router();
var { User } = require('../models') //models폴더의 index.js에서 가져오기

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/create', async (req, res, next) => {
  let result = await User.create({ userid: 'boraming', userpw: '000000', username: '전보람' });
  res.json(result);
})

module.exports = router;
