import categoryService from '../services/categoryService.js';

class CategoryController {
     async index(req, res) {
          try {
               const categories = await categoryService.index();

               return res.status(200).json({
                    success: true,
                    data: categories,
               });
          } catch (error) {
               console.error('Get categories error:', error);
               return res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                    error: process.env.NODE_ENV === 'development' ? error.message : undefined,
               });
          }
     }

     async getAttributes(req, res) {
          try {
               const { category } = req.params;

               if (!category) {
                    return res.status(400).json({
                         success: false,
                         message: 'Category parameter is required',
                    });
               }

               const attributes = await categoryService.getAttributes(category);

               return res.status(200).json({
                    success: true,
                    data: attributes,
               });
          } catch (error) {
               console.error('Get category attributes error:', error);
               return res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                    error: process.env.NODE_ENV === 'development' ? error.message : undefined,
               });
          }
     }
}

export default new CategoryController();
