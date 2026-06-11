const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

router.post("/", async(req,res)=>{
    const lead = await Lead.create(req.body);
    res.json(lead);
});

router.get("/", async(req,res)=>{
    const leads = await Lead.find();
    res.json(leads);
});

router.delete("/:id", async(req,res)=>{
    await Lead.findByIdAndDelete(req.params.id);
    res.json({message:"Deleted"});
});
app.delete("/api/leads/:index", (req, res) => {
  const index = req.params.index;

  leads.splice(index, 1);

  res.json({
    message: "Lead Deleted"
  });
});
module.exports = router;