const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService {

  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 20;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  async find() { return this.products; }
  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) { throw boom.notFound(`ID: ${id} NOT Found`); }
    if (product.isBlock) { throw boom.conflict(`Product ${id} is Block`); }
    return product;
  }
  async create(data) {

    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }
  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) { throw boom.notFound(`ID: ${id} NOT Found`); }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    }
    return this.products[index];
  }
  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) { throw boom.notFound(`ID: ${id} NOT Found`); }
    this.products.splice(index, 1);
    return { message: `id ${id} Deleted` };
  }
}

module.exports = ProductsService;