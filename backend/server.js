require('dotenv').config();
require('./config/dbconfig');
const app = require('./app');


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is listing on PORT ${port}`);
});
