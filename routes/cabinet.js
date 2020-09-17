/* eslint-disable max-len */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-unused-vars */
import express from 'express';

import User from '../models/user-models.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const dateOfBirth = await User.findOne(
      { _id: req.session.user._id },
      { dateOfBirth: 1 },
    );
    const dateOfBirthUser = dateOfBirth.dateOfBirth.toLocaleDateString();
    const user = await User.findOne({ _id: req.session.user._id });
    const arrFriends = user.friends;
    const findAllFriends = await User.find(
      { _id: { $in: arrFriends } },
      { password: 0, privateInfo: 0 },
    );

    res.render('cabinet', { dateOfBirthUser, findAllFriends });
  } catch (error) {
    res.send(error);
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id.toString();
  try {
    const user = await User.updateOne(
      { _id: req.session.user._id },
      { $pull: { friends: id } }
    );
    res.json({ delete: true });
  } catch (error) {
    res.json({ delete: false, error });
  }
});

export default router;
