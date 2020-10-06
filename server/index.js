require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

// app.get('/api/health-check', (req, res, next) => {
//   db.query('select \'successfully connected\' as "message"')
//     .then(result => res.json(result.rows[0]))
//     .catch(err => next(err));
// });

// User can see list of connection requests

app.get('/api/fren-requests/:recipientId', (req, res, next) => {
  const recipientId = parseInt(req.params.recipientId, 10);

  if (recipientId < 0 || isNaN(recipientId)) {
    throw (new ClientError('Recipient ID must be valid', 400));
  }

  const sql = `
    select "u"."dogName" as "requesterName",
           "u"."imageUrl" as "requesterImage"
      from "frenRequests" as "fr"
      join "users" as "u" on "u"."userId" = "fr"."senderId"
     where "fr"."recipientId" = $1
  `;

  const params = [recipientId];

  db.query(sql, params)
    .then(result => {
      if (result.rows.length === 0) {
        next(new ClientError(`Id ${recipientId} returned no messages`, 404));
      } else {
        res.status(200).json(result.rows);
      }
    })
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
