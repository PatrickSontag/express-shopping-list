const express = require("express");
const router = new express.Router();
const items = require('../fakeDb');


/** GET /items: get list of items */

router.get("/", function(req, res) {
  console.log("items");
  return res.json( items );
});


router.post("/", function (req, res) {
    const newItem = { name: req.body.name, price: req.body.price };
    items.push(newItem);
    console.log(items);
    res.status(201).json({"added": newItem });
})

router.get("/:name", function(req, res) {
  const getItem = items.find(item => item.name === req.params.name)
  return res.json(getItem);
});

/** DELETE /items/[id]: delete item, return status */

router.delete("/:id", function(req, res) {
  const idx = items.findIndex(u => u.id === +req.params.id);
  items.splice(idx, 1);
  return res.json({ message: "Deleted" });
});


module.exports = router;
