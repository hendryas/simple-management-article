const route = require('express').Router();

route.get('/api', (req, res) => {
    res.status(200).json({
        message: 'Home Page'
    })
})

const userRoutes = require('./user');
const articleRoutes = require('./article');

route.use('/api/users', userRoutes);
route.use('/api/articles', articleRoutes);

module.exports = route;