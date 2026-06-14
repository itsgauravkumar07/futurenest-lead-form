require("dotenv").config();

const cloudinary = require("./src/config/cloundinary");

cloudinary.api.ping()
  .then((result) => {
    console.log("SUCCESS");
    console.log(result);
  })
  .catch((error) => {
    console.log("ERROR");
    console.log(error);
  });