const express = require("express");
const router = new express.Router();
const items = require('../fakeDb');
const ExpressError = require('../expressError');


/** GET /items: get list of items */

router.get("/", function(req, res) {
  return res.json( items );
});


router.post("/", function (req, res) {
  const foundItem = { name: req.body.name, price: req.body.price };
  items.push(foundItem);
  res.status(201).json({"added": foundItem });
})

router.get("/:name", function(req, res) {
  const foundItem = items.find(item => item.name === req.params.name);
  if (foundItem === undefined) {
    throw new ExpressError("Item not found.", 404)
  }
  return res.json(foundItem);
});

router.patch("/:name", function(req, res) {
  let itemIndex;
  for (let [i, value] of items.entries()) {
    if (value.name === req.params.name) {
      itemIndex = i;
    }
  }
  if (itemIndex === undefined) {
    throw new ExpressError("Item not found.", 404)
  }
  const foundItem = items[itemIndex];
  foundItem.name = req.body.name;
  foundItem.price = req.body.price;
  return res.json({"updated":foundItem});
});

router.delete("/:name", function(req, res) {
  const itemIndex = items.findIndex(i => i.name === req.params.name);
  console.log("itemIndex: ", itemIndex);
  if (itemIndex === -1) {
    console.log("delete route error");
    throw new ExpressError("Item not found.", 404)
  }
  items.splice(itemIndex, 1);
  return res.json({message: "Deleted"});
});


module.exports = router;
