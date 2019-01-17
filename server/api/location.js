const router = require('express').Router()
const ipstack = require('ipstack')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const clientIP = req.clientInfo.ip
    await ipstack(
      clientIP,
      '414afdef423bbe931fda241e31c86d0d',
      (err, response) => {
        try {
          res.json(response)
        } catch (error) {
          next(err)
        }
      }
    )
  } catch (err) {
    next(err)
  }
})
