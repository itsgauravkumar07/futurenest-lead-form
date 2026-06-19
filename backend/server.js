require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./src/config/db");

const app = express();

const uploadRoutes = require("./src/routes/uploadRoutes");

const emailRoutes = require("./src/routes/emailRoutes");

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/buyers", require("./src/routes/buyerRoutes"));
app.use("/api/sellers", require("./src/routes/sellerRoutes"));
app.use("/api/landlords", require("./src/routes/landlordRoutes"));
app.use("/api/tenants", require("./src/routes/tenantRoutes"));

app.use("/api/email", emailRoutes);

//Upload routes
app.use("/api", uploadRoutes);

app.get("/", (req, res) => {
  res.send("Property Lead API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});