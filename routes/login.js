import express from 'express';
import bcrypt from 'bcrypt';

import User from '../models/user-models.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await User.findOne({ email });
    if (findUser && (await bcrypt.compare(password, findUser.password))) {
      req.session.user = findUser;
      res.redirect('/');
    } else {
      res.render('error', {
        error: 'Такого пользователь не существует, повторите попытку!',
      });
    }
  } catch (error) {
    res.send(error);
  }
});

export default router;
