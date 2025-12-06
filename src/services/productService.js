import Product from '../database/models/Product.js';

class ProductService {
     async search(query, page = 1, limit = 20, filters = {}) {
          let results = [];
          let total = 0;

          const offset = (page - 1) * limit;

          results = await Product.search(query, limit, offset, filters);

          total = results.length;
          return {
               total,
               results,
               page: parseInt(page),
               limit: parseInt(limit),
          };
     }
}

export default new ProductService();