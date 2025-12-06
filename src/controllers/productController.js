import productService from '../services/productService.js';

class ProductController {
  async index(req, res) {
    try {
      const { q, page = 1, limit = 20, category, attributes } = req.query;

      const pageNum = parseInt(page) || 1;
      const limitNum = parseInt(limit) || 20;

      if (pageNum < 1) {
        return res.status(400).json({
          success: false,
          message: 'Page number must be greater than 0',
        });
      }

      if (limitNum < 1 || limitNum > 100) {
        return res.status(400).json({
          success: false,
          message: 'Limit must be between 1 and 100',
        });
      }


      const searchResults = await productService.search(q ? q.trim() : '', pageNum, limitNum, { category, attributes });

      return res.status(200).json({
        success: true,
        count: searchResults.results.length,
        total: searchResults.total,
        page: searchResults.page,
        limit: searchResults.limit,
        data: searchResults.results,
      });
    } catch (error) {
      console.error('Search error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }
}

export default new ProductController();