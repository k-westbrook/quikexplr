const router = require('express').Router()

module.exports = router

router.get('/ip', async (req, res, next) => {
  try {
    const a = req.ip
    res.json(a)
  } catch (err) {
    next(err)
  }
})
