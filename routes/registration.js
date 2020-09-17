import express from 'express';
import bcrypt from 'bcrypt';

import User from '../models/user-models.js';

const saltRounds = 10;
const router = express.Router();

router.get('/', (req, res) => {
  res.render('registration');
});

router.post('/', async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    avatar,
    dateOfBirth,
    privateInfo,
    password,
  } = req.body;

  const newUser = new User({
    firstName,
    lastName,
    email,
    avatar,
    dateOfBirth,
    privateInfo,
    password: await bcrypt.hash(password, saltRounds),
  });
  try {
    await newUser.save();
    req.session.user = newUser;
    res.redirect('/');
  } catch (error) {
    res.render('error', {
      error: 'Пользователь с таким email уже существует, повторите попытку',
    });
  }
});

export default router;
