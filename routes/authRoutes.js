const express = require('express')

const authControllers = require('../controllers/authControllers')
const router = express.Router ();

// METHOD - Get -----signup
router.get('/signup',authControllers.signup_get)

// METHOD Post    ----- signup

router.post('/signup',authControllers.signup_post)

// METHOD Get    ----- login
router.get('/login',authControllers.login_get)

// METHOD Post    ----- login
router.post('/login',authControllers.login_post)

module.exports = router;