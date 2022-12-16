const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/taskmanagerdb", {useNewUrlParser:true,useUnifiedTopology:true})
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });

  module.exports = mongoose;