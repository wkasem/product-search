import db from '../../config/database.js';

class Product {
  static async search(query, limit = 20, offset = 0, filters = {}) {
    const baseQuery = db('products');

    // Text Search
    if (query) {
      baseQuery.whereRaw('title &&& ?::pdb.fuzzy(2)', [query]);
    }

    // Category Filter
    if (filters.category) {
      baseQuery
        .join('product_category', 'products.id', 'product_category.product_id')
        .where('product_category.category_id', filters.category);
    }

    // Attributes Filter
    if (filters.attributes && filters.attributes.length > 0) {
      baseQuery
        .join('product_variants', 'products.id', 'product_variants.product_id')
        .join('product_variant_attribute_value', 'product_variants.id', 'product_variant_attribute_value.variant_id')
        .whereIn('product_variant_attribute_value.attribute_value_id', filters.attributes.toString().split(','));
    }

    return await baseQuery
      .select('products.*')
      .groupBy('products.id')
      .orderBy('sold_count', 'desc')
      .limit(limit)
      .offset(offset);
  }
}

export default Product;