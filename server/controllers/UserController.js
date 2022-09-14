const { user } = require('../models');
const { encryptPwd, decryptPwd } = require('../helpers/bcrypt');

class UserController {
    static async getDataUsers(req, res) {
        try {
            let result = await user.findAll();
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async register(req, res) {
        try {
            const { nama, umur, username, password } = req.body;
            // console.log(password);
            let result = await user.create({
                nama, umur, username, password
            })
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async login(req, res) {
        try {
            const { username, password } = req.body;
            let findDataUser = await user.findOne({
                where: {
                    username
                }
            })
            if (findDataUser) {
                if (decryptPwd(password, findDataUser.password)) {
                    res.status(200).json(findDataUser);
                } else {
                    res.status(403).json({
                        message: 'Password salah!'
                    })
                }
                // req.session.findDataUser
            } else {
                res.status(404).json({
                    message: 'Username tidak ditemukan!'
                })
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async update(req, res) {
        try {
            const id = +req.params.id
            const { nama, umur, username, password } = req.body;
            let result = await user.update({
                nama, umur, username, password: encryptPwd(password)
            }, {
                where: {
                    id
                }
            })
            if (result[0] == 1) {
                res.status(201).json({
                    message: `Username dengan ID: ${id} berhasil di update!`
                })
            } else if (result[0] == 0) {
                res.status(404).json({
                    message: `Username dengan ID: ${id} tidak dapat ditemukan!`
                })
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async delete(req, res) {
        try {
            const id = +req.params.id;
            let result = await user.destroy({
                where: { id }
            })
            result === 1 ?
                res.status(200).json({
                    message: `Username dengan ID ${id} berhasil di hapus!`
                }) :
                res.status(404).json({
                    message: `Username dengan ID ${id} tidak ditemukan!`
                })
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async getUserById(req, res) {
        try {
            const id = +req.params.id;
            let result = await user.findByPk(id);

            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    message: `Username dengan ID: ${id} tidak ditemukan!`
                })
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = UserController;