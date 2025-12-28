const express = require("express");
const cors = require("cors");
require("dotenv").config();
console.log("KEY:",
  process.env.OPENAI_API_KEY);
  
const OpenAI = require("openai");

const app = express();   // ✅ THIS LINE WAS MISSING
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Test route
app.get("/", (req, res) => {
  res.send("ATL AI Mentor backend is running");
});

// Ask route
app.post("/ask", async (req, res) => {
  try {
    const question = req.body.question;

    if (!question) {
      return res.json({ answer: "No question received." });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an ATL AI Mentor helping students with innovation projects." },
        { role: "user", content: question }
      ]
    });

    const reply = response.choices[0].message.content;

    res.json({ answer: reply });

  } catch (error) {
    console.error("openai error",
      error.message || error);
    res.json({ answer: "Mentor is temporarily unavailable." });
  }
});

// Start server
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
