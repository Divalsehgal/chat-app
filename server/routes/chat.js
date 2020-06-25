const express = require("express");
const router = express.Router();
const { Chat } = require("../models/Chat");

router.get("/getchat", (req, res) => {
  Chat.find()
    .populate("sender")
    .exec((err, chat) => {
      if (err) return res.status(400).json(err);
      else return res.status(200).json(chat);
    });
});

module.exports = router;
