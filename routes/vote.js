var express = require('express');
var router = express.Router();

/* GET vote candidat listing listing. */
router.get('/', function(req, res, next) {
    console.log("poulout");
    res.render("vote");
});

module.exports = router;
