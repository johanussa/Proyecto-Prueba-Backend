const express = require('express');
const router = express.Router();

router.get('/categories/:idCategory/products/:idProduct', (req, res) => {
  const { idCategory, idProduct } = req.params;
  res.json({
    idCategory,
    idProduct
  });
});

module.exports = router;