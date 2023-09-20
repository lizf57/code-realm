const router = require('express').Router()
const { User, Post, Comment } = require('../../models')
const withAuth = require('../../utils/auth')

// find all
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'post_content',
            'createdAt',
        ],
        order: [['createdAt', 'desc']],
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
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

// find one
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'post_content',
            'createdAt',
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
        if(!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

// create
router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        post_content: req.body.post_content,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

// update
router.put('/:id', withAuth, (req, res) => {
    Post.update(req.body, 
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// destroy
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

module.exports = router