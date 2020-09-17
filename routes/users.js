import express from 'express';

import User from '../models/user-models.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const thisUserId = req.session.user._id;
  const findThisUser = await User.find({ _id: thisUserId });
  const arrIdFriends = [...findThisUser[0].friends, thisUserId];
  const findUsers = await User.find({ _id: { $nin: arrIdFriends } });
  res.render('users', { findUsers });
});

router.post('/', async (req, res) => {
  const { _id } = req.body;
  try {
    const thisUser = await User.findOne({ _id: req.session.user._id });
    const newFriend = await User.findOne({ _id });
    thisUser.friends.push(newFriend._id.toString());
    await thisUser.save();
    res.json(true);
  } catch (error) {
    res.send(error);
  }
});

export default router;
