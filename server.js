// server.js
import express from "express";
import cors from "cors";
import { attractions, guides, plans, requests } from "./data.js";
import { v4 as uuid } from "uuid";

const app = express();
app.use(cors());
app.use(express.json());

// =========================
// ROUTES
// =========================

// ✔ Get attractions by city
app.get("/api/attractions/:city", (req, res) => {
  const city = req.params.city.toLowerCase();
  res.json({ success: true, data: attractions[city] || [] });
});

// ✔ Get guides by city
app.get("/api/guides/:city", (req, res) => {
  const city = req.params.city.toLowerCase();
  res.json({ success: true, data: guides[city] || [] });
});

// ✔ Get itinerary by city
app.get("/api/itinerary/:city", (req, res) => {
  const city = req.params.city.toLowerCase();
  res.json({ success: true, data: plans[city] || {} });
});

// ✔ Store booking request
app.post("/api/request", (req, res) => {
  const id = uuid();
  const entry = { id, ...req.body, time: new Date().toISOString() };

  requests.push(entry);

  res.json({ success: true, message: "Request saved!", data: entry });
});

// ✔ View all requests (admin)
app.get("/api/requests", (req, res) => {
  res.json({ success: true, data: requests });
});

app.get("/", (req, res) => {
  res.send("LocalLink Backend Running 🚀");
});

// Server start
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Backend running at http://localhost:${PORT}`)
);
