const express = require('express');
const router = express.Router();

router.get('/search', function (req, res){
    try {
        
    } catch (e) {
        console.log(e)
        res.status(500).json({message: e})
    }
})

module.exports = router;