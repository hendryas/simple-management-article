const { article } = require('../models');

class ArticleController {
    static async getDataArticles(req, res) {
        try {
            let result = await article.findAll();
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async create(req, res) {
        try {
            const { title, content, status_posting } = req.body;
            let result = await article.create({
                title, content, status_posting
            })
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async update(req, res) {
        try {
            const id = +req.params.id;
            const { title, content, status_posting } = req.body;
            let result = await article.update({
                title,
                content,
                status_posting
            }, {
                where: { id }
            })

            console.log(title);

            if (result == 1) {
                res.status(201).json({
                    message: `Artikel dengan ID: ${id} berhasil di update!`
                });
            } else {
                res.status(404).json({
                    message: `Artikel dengan ID: ${id} tidak ditemukan!`
                })
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async delete(req, res) {
        try {
            const id = +req.params.id;
            let result = await article.destroy({
                where: { id }
            })
            result === 1 ?
                res.status(200).json({
                    message: `Artikel dengan ID: ${id} berhasil di hapus!`
                }) :
                res.status(404).json({
                    message: `Artikel dengan ID: ${id} tidak ditemukan!`
                })
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async getArticleById(req, res) {
        try {
            const id = +req.params.id;
            let result = await article.findByPk(id);

            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    message: `Artikel dengan ID: ${id} tidak ditemukan!`
                })
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = ArticleController;