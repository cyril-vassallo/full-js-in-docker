const express = require('express');
const router = express.Router();


/**
* GET request to /authors
 */
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'All authors'
    });
});


/**
* GET request to /list
 */
router.get('/list', (req, res, next) => {
    res.status(200).json({
        message: 'list baseUrl is: ' + req.baseUrl
    });
});


/**
 * GET request to /author/:id
 */
router.get('/:id', (req, res, next) => {
    res.status(200).json({
        message: `author with id: ${req.params.id} was fetch, you can change the id in the url, all values accepted`,
        id : req.params.id
    });
});


module.exports = router;
