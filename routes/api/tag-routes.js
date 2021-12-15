const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product,
        },
      ],
    });
    res.status(200).json({
      message: "Success! Tag data retrieved!",
      data: tagData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        { model: Product }
      ],
    });
    if (!tagData) {
      res.status(400).json({ message: "No tag found with this id!" });
    }
    res.status(200).json({
      message: "Success! Tag data retrieved!",
      data: tagData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json({
      message: "You have successfully created a new tag!",
      data: tagData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;