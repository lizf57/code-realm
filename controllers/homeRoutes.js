const router = require('express').Router();
const sequelize = require('../config/connection')
const { User, Post, Comment} = require('../models')

// post - find all
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'post_content',
            'createdAt'
        ],
        order: [[ 'createdAt', 'desc' ]],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_content', 'user_id', 'post_id', 'createdAt'],
                include: {
                    module: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true}));
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// post - find one
router.get('/post/:id', (req, res) => {
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
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_content', 'user_id', 'post_id', 'createdAt'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({ message: 'No post found with this id' });
            return;
        } 
        const post = dbPostData.get({ plain: true });
        res.render('single-post', {
            post,
            logged_in: req.session.logged_in
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// login
router.get('/login', (req, res) => {
    if(req.session.logged_in){
        res.redirect('/');
        return;
    }

    res.render('login')
});


// signup
router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('signup')
});


module.exports = router