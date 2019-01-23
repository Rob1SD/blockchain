var express = require('express');
var router = express.Router();

/* GET vote candidat listing listing. */
router.get('/candidats', function(req, res, next) {
    res.send('La liste des candidats');
});

module.exports = router;
