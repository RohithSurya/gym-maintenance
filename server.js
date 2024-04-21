const express = require("express");
const app = express();
const mongo = require("./mongo");

const organization = require("./api/organization/organization.routes");
const user = require("./api/user/user.routes");
const gym = require("./api/gym/gym.routes");

const PORT = 8080;
app.use(express.json());

app.use("/organization", organization);
app.use("/user", user);
app.use("/gym", gym);

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
  mongo.connectDB();
});
