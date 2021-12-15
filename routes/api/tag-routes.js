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

router.get('/:id', async (req, res) => {
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

router.post('/', async (req, res) => {
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

router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({
      message: "Success! You have updated a tag!",
      data: tagData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(400).json({ message: "Unable to delete tag. No id found with product. Please try again!"});
    }
    res.status(200).json({
      message: "You have successfully deleted a tag!",
      data: tagData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;