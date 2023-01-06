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
  res.status(201).json({"added": newItem });
})

router.get("/:name", function(req, res) {
  const getItem = items.find(item => item.name === req.params.name)
  return res.json(getItem);
});

router.patch("/:name", function(req, res) {
  let itemIndex;
  for (let [i, value] of items.entries()) {
    if (value.name === req.params.name) {
      console.log(i);
      itemIndex = i;
    }
  }
  const patchItem = items[itemIndex];
  patchItem.name = req.body.name;
  patchItem.price = req.body.price;
  return res.json({"updated":patchItem});
});

router.delete("/:name", function(req, res) {
  const itemIndex = items.findIndex(i => i.name === req.params.name);
  items.splice(itemIndex, 1);
  return res.json({message: "Deleted"});
});


module.exports = router;
