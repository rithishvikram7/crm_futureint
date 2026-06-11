const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CRM Backend Running");
});
app.delete("/api/leads/:index", (req, res) => {
  const index = req.params.index;

  leads.splice(index, 1);

  res.json({
    message: "Lead Deleted"
  });
});
app.listen(5000, () => {
  console.log("Server Running");
});
const leads = [];

app.post("/api/leads", (req, res) => {
  leads.push(req.body);
  res.json({
    message: "Lead Added Successfully"
  });
});

app.get("/api/leads", (req, res) => {
  res.json(leads);
});