// routes/auth.routes.js

const { Router } = require('express');
const router = new Router();

const mongoose = require('mongoose');
const User = require('../models/User.model');
/* 
const bcryptjs = require('bcryptjs');
const saltRounds = 10; */

/* const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');
 */


// GET route ==> to display the signup form to users
router.get('/signup', (req, res) => res.render('auth/signup'));

router.get('/login', (req, res) => res.render('auth/login'));




module.exports = router;
