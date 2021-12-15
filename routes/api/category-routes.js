const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get ('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [
        {
          model: Product,
        },
      ],
      order: [["id", "ASC"]],
    });
    res.status(200).json({
      message: "Success! Category data retrieved!",
      data: categoryData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(400).json({ message: "Please try again. No category was found with this id! "});
    }
    res.status(200).json({
      message: "Success. Category with this id has been found!",
      data: categoryData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json({
      message: 'You have successfully added a new category!',
      data: categoryData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({
      message: 'You have successfully updated a tag!',
      data: categoryData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(400).json(
        { 
          message: "No category with this id. Please try again with valid id!" 
        });
    }
    res.status(200).json({
      message: 'You have successfully deleted this category!',
      data: categoryData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;