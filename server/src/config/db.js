const mongoose = require("mongoose");

const connect = () => {
  mongoose.connect("mongodb+srv://blogweb-react:react@cluster1.zgjna.mongodb.net/blogs?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log("Successfully connected to database");
  })
  .catch((error) => {
    console.log("database connection failed. exiting now...");
    console.error(error);
    process.exit(1);
  });
};

module.exports = connect;
