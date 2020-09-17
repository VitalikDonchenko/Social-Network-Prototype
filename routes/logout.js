import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  if (req.session.user) {
    try {
      await req.session.destroy();
      res.clearCookie('user_sid');
      res.redirect('/');
    } catch (error) {
      req.setEncoding('Error', error);
    }
  }
});

export default router;
