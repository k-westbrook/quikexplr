const router = require('express').Router()
const ipstack = require('ipstack')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const clientIP = req.clientInfo.ip
    await ipstack(
      '172.254.159.106',
      process.env.IPSTACK_KEY,
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

router.get('https://api.weather.gov/points/', async (req, res, next) => {
  console.log(res)
})
