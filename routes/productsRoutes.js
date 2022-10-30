const express = require('express');
const router = express.Router();
const ProductsService = require('../services/productsService');
const validatorHandler = require('../middlewares/validatorHandler');

const {
  createProductSchema,
  updateProductSchema,
  deletProductSchema,
  getOneProductSchema,
} = require('../schemas/productSchema');

const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  if (products) { res.status(200).json(products); }
  else { res.status(404).send("Products NOT Found"); }
});

router.get('/:id',
  validatorHandler(getOneProductSchema, 'params'),  // Este middleware lo que hace es validar que los
  async (req, res, next) => {                       // datos que se envian, sean los correctos
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
});

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    if (newProduct) { res.status(201).json({ data: newProduct }); }
    else { res.status(400).json({ message: "El Producto NO pudo ser creado" }); }
});

router.patch('/:id',
  validatorHandler(getOneProductSchema, 'params'),  // Se valida el id que sea correcto
  validatorHandler(updateProductSchema, 'body'),    // Se valida que los datos ingresados sean correctos
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const productUpdate = await service.update(id, body);
      res.status(200).json({
        message: `El id ${id} Fue actualizado OK`,
        data: productUpdate
      });
    } catch (error) {
      next(error);
    }
});

router.delete('/:id',
  validatorHandler(deletProductSchema, 'params'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const productDelete = await service.delete(id);
      res.status(200).json(productDelete);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
});

module.exports = router;