var router = require('express').Router()

// router.use('/', require('./home'));
router.use('/login', require('./login'))
router.use('/testing', require('./testing'))
router.use('/home', require('./home'))
router.use('/master', require('./master'))
router.use('/users', require('./users'))
router.use('/registrasi', require('./registrasi'))
router.use('/forgetpassword', require('./forgetpassword'))

router.use(function (err, req, res, next) {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function (errors, key) {
        errors[key] = err.errors[key].message
        return errors
      }, {})
    })
  }
  return next(err)
})

module.exports = router
