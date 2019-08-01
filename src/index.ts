import * as express from 'express';
import {Request, Response} from 'express';
import * as cors from 'cors';

const app = express();

const { PORT = 3000 } = process.env;

const server = require("http").Server(app);

app.get("/", (req: Request, res: Response) => {
  res.send({
      message: "Hello World!",
    });
});

app.use(cors());

// app.use(require("./routes"));

app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});
