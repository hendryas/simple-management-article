const articleRoute = require('express').Router();
const { ArticleController } = require('../controllers');

articleRoute.get('/', ArticleController.getDataArticles);
articleRoute.post('/create', ArticleController.create);
articleRoute.put('/update/:id', ArticleController.update);
articleRoute.delete('/delete/:id', ArticleController.delete);
articleRoute.get('/:id', ArticleController.getArticleById);

module.exports = articleRoute;