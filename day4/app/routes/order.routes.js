module.exports = (app) => {
    const orders = require('../controllers/order.controller.js');

    // Create a new Note
    app.post('/orders', orders.create);

    // Retrieve all orders
    app.get('/orders', orders.findAll);

    // Delete a Note with noteId
    app.delete('/orders/:orderId', orders.delete);
}
