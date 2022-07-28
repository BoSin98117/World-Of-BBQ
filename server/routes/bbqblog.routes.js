const BbqblogController = require('../controllers/bbqblog.controller');
const { authenticate } = require('../config/jwt.config');


module.exports = (app) => {
    app.get('/api/bbqblogs', BbqblogController.findAllBlogs);
    app.post('/api/bbqblogs', authenticate, BbqblogController.createNewBbqblog);
    app.get('api/bbqbyuser/:username', authenticate, BbqblogController.findAllBbqblogsByUser);
    app.get('/api/bbqblogs/:id', BbqblogController.findOneBbqblog);
    app.delete('/api/bbqblogs/:id', BbqblogController.deleteOneBbqblog);
    app.put('/api/bbqblogs/:id', BbqblogController.updateBbqblog);
}