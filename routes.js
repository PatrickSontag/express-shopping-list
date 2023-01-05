const express = require("express");
const router = new express.Router();

// const items = [
//     { id: 1, item: 'socks', price: 11.95 },
//     { id: 2, item: 'shirt', price: 28.89 },
//     { id: 3, item: 'hat', price: 25.15 }
// ];

/** GET /items: get list of items */

router.get("/", function(req, res) {
  return res.json({"items":items});
});

/** DELETE /items/[id]: delete item, return status */

router.delete("/:id", function(req, res) {
  const idx = items.findIndex(u => u.id === +req.params.id);
  items.splice(idx, 1);
  return res.json({ message: "Deleted" });
});


module.exports = router;
