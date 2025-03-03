const app = require('./app');
const connectDB = require('./config/dbConfig');
const {logger} = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
//log events
app.use(logger);
connectDB();

//error handler
app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});