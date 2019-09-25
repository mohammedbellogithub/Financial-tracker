const express = require("express");
const auth = require("../../middleware/auth");
const queryData = require("../../config/db");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const date = new Date();

// @route  POST /api/user/item
// @desc  Create Item
// @access Private
router.post(
  "/",
  auth,
  [
    check("title", "Title is required")
      .not()
      .isEmpty(),
    check("description", "A description of the item is needed")
      .not()
      .isEmpty(),
    check("price", "Please include a valid price").isNumeric()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, price } = req.body;

      await queryData(
        "INSERT INTO items(item_id, title, description,price ,date_created, user_id) values(uuid_generate_v4(),$1,$2,$3,$4,$5)",
        [title, description, price, date, req.user]
      );
      const item = await queryData("SELECT * FROM items WHERE user_id = $1", [
        req.user
      ]);
      res.json(item[item.length - 1]);
    } catch (error) {
      console.log(error);

      res.status(500).send("Server Error");
    }
  }
);

// @route  GET /api/users/item
// @desc  Get all user items
// @access Private

router.get("/", auth, async (req, res) => {
  try {
    const items = await queryData("SELECT * FROM items WHERE user_id = $1", [
      req.user
    ]);
    res.json(items);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

// @route  PuT /api/user/item/:id
// @desc  Update Item
// @access Private
router.put(
  "/:id",
  auth,
  [
    check("title", "Title is required")
      .not()
      .isEmpty(),
    check("description", "A description of the item is needed")
      .not()
      .isEmpty(),
    check("price", "Please include a valid price").isNumeric()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, price } = req.body;

      const item = await queryData(
        "SELECT * FROM items WHERE user_id = $1 AND item_id = $2",
        [req.user, req.params.id]
      );

      // Check If Item Exist
      if (item[0].length < 1) {
        return res.status(400).json({ msg: "Request Does Not Exist" });
      }

      await queryData(
        "UPDATE items SET title = $1, description = $2 ,price = $3 WHERE item_id = $4",
        [title, description, price, req.params.id]
      );

      const updatedItem = await queryData(
        "SELECT * FROM items WHERE item_id = $1",
        [req.params.id]
      );
      res.json(updatedItem[updatedItem.length - 1]);
    } catch (error) {
      console.log(error);

      res.status(500).send("Server Error");
    }
  }
);

// @route  GET /api/users/item/id
// @desc  Get user request by id
// @access Private

router.get("/:id", auth, async (req, res) => {
  try {
    const item = await queryData(
      "SELECT * FROM items WHERE user_id = $1 AND item_id = $2",
      [req.user, req.params.id]
    );
    res.json(item);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

// @route  DELETE api/user/item/:id
// @desc DELETE user request by Id
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    await queryData("DELETE FROM items WHERE item_id = $1", [req.user]);
    res.json({ msg: "Item Deleted" });
  } catch (error) {
    console.log(error.message);
  }
});
module.exports = router;
