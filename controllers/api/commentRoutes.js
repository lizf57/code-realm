const router = require('express').Router()
const { User, Post, Comment } = require('../../models')
const withAuth = require('../../utils/auth')

// find all
router.get('/', (req, res) => {
   Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err)
    });
});

// create
router.post('/', (req, res) => {
    if (req.session){
        Comment.create({
            comment_content: req.body.comment_content,
            user_id: req.session.user_id,
            post_id: req.body.post_id,
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        });
    }
});

// destroy
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if(!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(dbCommentData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    });
});

module.exports = router