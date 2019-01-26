
var express = require('express');
var router = express.Router();
var Comment = require('../models/comments');

var User = require('../models/users');
var jwt = require('jsonwebtoken');

/* load first page*/
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Main'
    });
});
/* get home */
router.get('/home', function (req, res, next) {
    res.render('index', {
        title: 'Main'
    });
});

/* GET feed page. */
router.get('/feed', function(req, res, next) {

    try {
        var jwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(jwtString[1]);
        if (profile) {
            res.render('feed');
        }
    }catch (err) {
            res.json({
                "status": "error",
                "body": [
                    "You are not logged in."
                ]
            });
        }
});

router.post('/addComment', function (req, res, next) {
    // Extract the request body which contains
    //the comments
    comment = new Comment(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;
        res.json({
            "id": savedComment._id,
            "comment": savedComment.comment
        });
    });
});
/**
 * Retrieves comments from the database
 */
router.get('/getComments', function (req,
    res, next) {
    Comment.find({}, function (err,
        comments) {
        if (err)
            res.send(err);
        res.json(comments);
    }).sort({
        'up_votes': -1
    }).limit(10);
});

/*Updates the comment by the Id*/
router.post('/upVoteComment/:id', function (req, res) {
      var id= req.params.id;
    Comment.findOneAndUpdate({_id: id}, {$inc: { up_votes : 1} }, {new: true}, function(err, response){
       if(err)
           throw err;
        
        res.json(response);
    });

});
/* downvotes Comments by their id */
router.post('/downVote/:id', function (req, res) {
      var id= req.params.id;
    Comment.findOneAndUpdate({_id: id}, {$inc: { down_votes : 1} }, {new: true}, function(err, response){
       if(err)
           throw err;
        
        res.json(response);
    });

});


/* Deletes Stuff */
router.delete('/deleteComment/:id', function (req, res, next) {
    var id = req.params.id;
    Comment.remove({
        _id: id
    }, function (err, comment) {
        if (err)
            res.send(err);
        res.json(comment);
    });
});


/*
 Verifies a JWT
 */
function verifyJwt(jwtString) {

    var value = jwt.verify(jwtString, 'SB');
    return value;
}


module.exports = router;
