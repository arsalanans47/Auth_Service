const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

// const UserService = require('./services/user-service');

const app = express();

const prepareAndStartServer = () => {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));


  app.use('/api', apiRoutes);

  app.listen(PORT, async () => {
    console.log(`Server is running on port : ${PORT}`);
    
    // const service = new UserService();


    // const newToken = service.createToken({ email: "sample4@email.com", id: 4});
    // console.log("New token is ", newToken);
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbXBsZTRAZW1haWwuY29tIiwiaWQiOjQsImlhdCI6MTc3NDU0NTc3OSwiZXhwIjoxNzc0NTQ1ODA5fQ.WQQRXt9QNl1O6Q0Dopr_16hdutbIq-1MJSAvci5SviA";
    // const response = service.verifyToken(token);
    // console.log("Verified token is ", response);

  })
}

prepareAndStartServer();