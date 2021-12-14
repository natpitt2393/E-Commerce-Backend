//requiring access to express npm, the routes folder and to sequelize
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection')

const app = express();
const PORT = process.env.PORT || 3001;

//middleware to parse code
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);


// We are connecting to the database through sequelize and connecting to the port as well
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`App listening on port ${PORT}!`));
});
