import express from 'express';
import debug from 'debug';
import logger from 'morgan';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import apis from './routes/index';

const debugged = debug('app');
config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api/v1', apis);


app.use((request, response, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
// app.use(errorHandler);

app.listen(port, () => {
  debugged(`Listening from port ${port}`);
});

export default app;
