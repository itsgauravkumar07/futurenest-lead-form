const express = require("express");

const {
sendConfirmationEmail,
} = require(
"../controllers/emailController"
);

const router = express.Router();

router.post(
"/send-confirmation",
sendConfirmationEmail
);

module.exports = router;
