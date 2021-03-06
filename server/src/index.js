const express = require("express");
const cors = require("cors");
const connect = require('./config/db')
const routes = require('./Routes/routes')
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 8000;

app.use('/blogs', routes);

app.listen(PORT, async () => {
  await connect();
  console.log(`listening on port ${PORT}`);
});
