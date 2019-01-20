const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      if (req.user.isAdmin && req.user.isDev) {
        const users = await User.findAll({
          // explicitly select only the id and email fields - even though
          // users' passwords are encrypted, it won't help if we just
          // send everything to anyone who asks!
          attributes: ['id', 'email']
        })
        res.json(users)
      } else {
        res.sendStatus(403)
      }
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/consent', async (req, res, next) => {
  try {
    const updatedUser = await User.update(
      {
        hasConsent: true
      },
      {
        where: {
          id: req.session.userId
        },
        returning: true,
        plain: true
      }
    )

    res.json(updatedUser[1])
  } catch (err) {
    next(err)
  }
})
