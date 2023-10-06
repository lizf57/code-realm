const router = require('express').Router()
const { User, Post, Comment } = require('../../models')

router.get('/', async (req, res) => {
    try {
        const userData = await User.create({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        })

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.email = userData.email;
            req.session.username = userData.username;
            req.session.logged_in = true 

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(401).json(err)
    }
});

// user login
router.post('/login', (req, res) => {
   User.findOne({ 
        where: { 
            email: req.body.email 
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(400).json({ 
                message: 'Incorrect email or password, please try again' 
            });
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = dbUserData.username;
            req.session.logged_in = true;

            res.json({ 
                user: userData, 
                message: 'You are now logged in!' 
            });
        })
        const goodPassword = dbUserData.checkPassword(req.body.password)

        if (!goodPassword) {
            res.status(400).json({
                message: 'incorrect password'
            })
            return;
        }

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.logged_in = true;

            res.json({
                user: dbUserData,
                message: 'You are logged in to Code Realm!'
            });
        });
    });
});


// user logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end()
    };
});

module.exports = router;