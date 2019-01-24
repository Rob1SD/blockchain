var express = require('express');
var cons = require('const.js')
var router = express.Router();

/* GET vote candidat listing listing. */
router.get('/', function(req, res, next) {
<<<<<<< HEAD
    console.log("poulout");
    console.log(global.test);
=======
>>>>>>> origin/master
    res.render("vote");
});

module.exports = router;
