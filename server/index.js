const express = require("express");
const mongoose = require("mongoose");
const plantRoutes = require("./routes/plantRoutes");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/plants", plantRoutes);
// Basic test route
const protect = require("./middleware/auth.middleware");
app.get('/', (req, res) => {
     res.send("Mini Plant Store API is running");
});

// Connect DB
mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
      console.log("MongoDB connected ✅");
      app.listen(process.env.PORT || 5000, () => {
         console.log(`Server running on port ${process.env.PORT || 5000}`);
      });
  })
  .catch((err) => console.log("DB Connection Error:", err));