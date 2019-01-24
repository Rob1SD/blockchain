var express = require('express');
var cons = require('const.js')
var router = express.Router();

/* GET vote candidat listing listing. */
router.get('/', function(req, res, next) {
    console.log("poulout");
    console.log(global.test);
    res.render("vote");
});

module.exports = router;
