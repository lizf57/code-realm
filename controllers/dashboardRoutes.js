const router = require('express').Router()
const sequelize = require('../config/connection')
const { Post, User, Comment } = require('../models')

// Post - find all
router.get('/', (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'post_content',
            'createdAt'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_content', 'post_id', 'user_id', 'createdAt'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbPostData => {
        const posts =dbPostData.map(post => post.get({ plain: true }))
        res.render('dashboard', { posts, logged_in: true })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    });
});

// Post - find one
router.get('/edit/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'post_content',
            'createdAt'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_content', 'post_id', 'user_id', 'createdAt'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        } 
        const post = dbPostData.get({ plain: true });
        res.render('edit-post', { post, logged_in: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

//  User - find one
router.get('/new', (req, res) => {
    res.render('add-post', { logged_in: true })
});

module.exports = router;