const express = require("express");
const router = new express.Router();

const items = [];

/** GET /items: get list of items */

router.get("/", function(req, res) {
    console.log("ITEMS");
  return res.json(items);
});

/** DELETE /items/[id]: delete item, return status */

router.delete("/:id", function(req, res) {
  const idx = items.findIndex(u => u.id === +req.params.id);
  items.splice(idx, 1);
  return res.json({ message: "Deleted" });
});


module.exports = router;
