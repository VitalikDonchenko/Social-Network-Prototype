import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import FileStoreGeneral from 'session-file-store';
import path from 'path';

import indexRouter from './routes/index.js';
import registrationRouter from './routes/registration.js';
import logoutRouter from './routes/logout.js';
import loginRouter from './routes/login.js';
import usersRouter from './routes/users.js';
import cabinetRouter from './routes/cabinet.js';

const FileStore = FileStoreGeneral(session);

const app = express();

mongoose.connect('mongodb://localhost:27017/Social-Network-Prototype', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    store: new FileStore(),
    key: 'user_sid',
    secret: 'anything here',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 6000000,
    },
  }),
);

app.use((req, res, next) => {
  if (req.session.user) {
    res.locals.user = req.session.user;
  }
  next();
});

app.use('/', indexRouter);
app.use('/registration', registrationRouter);
app.use('/logout', logoutRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/cabinet', cabinetRouter);

app.listen(process.env.PORT ?? 3000);
