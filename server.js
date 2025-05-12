const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.post("/execute", async (req, res) => {
  console.log("Received request:", req.body);
  try {
    const response = await axios.post("https://api.jdoodle.com/v1/execute", {
      clientId: process.env.JDOODLE_CLIENT_ID,
      clientSecret: process.env.JDOODLE_CLIENT_SECRET,
      script: req.body.script,
      language: req.body.language,
      versionIndex: "0",
      stdin: req.body.input || "",
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Execution failed", details: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
