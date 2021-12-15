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
      order: [["id", "DSC"]],
    });
    res.status(200).json({
      message: "Success! Category data retrieved!",
      data: categoryData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
 
});

router.post('/', (req, res) => {
  
});

router.put('/:id', (req, res) => {
  
});

router.delete('/:id', (req, res) => {
  
});

module.exports = router;