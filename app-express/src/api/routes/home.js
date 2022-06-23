const express = require('express');
const router = express.Router();
const  { endpoint } = require('../../config')


router.get('/', function(req, res){
    res.status(200).json({
        linkLabel: 'See express api here', 
        endpoint: endpoint,
        otherRessources :  {
            authors : endpoint + '/authors',
            authorsList :  endpoint + '/authors/list',
            authorsId :  endpoint + '/authors/14'
        }
    });
});

module.exports = router;