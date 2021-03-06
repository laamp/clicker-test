const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const Player = require('../../models/Player');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.get('/test', (req, res) => res.json({
    msg: 'This is the player test route'
}));

router.get('/current', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

router.post('/register', (req, res) => {
    const {
        errors,
        isValid
    } = validateRegisterInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    // check if provided email exists
    Player.findOne({
            email: req.body.email
        })
        .then(player => {
            // if player exists throw error otherwise create it
            if (player) {
                return res.status(400).json({
                    email: 'A player with that email already exists'
                });
            } else {
                const newPlayer = new Player({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    businesses: [1, 0, 0, 0, 0],
                    managers: [false, false, false, false, false],
                    lastLoggedIn: Date.now()
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newPlayer.password, salt, (err, hash) => {
                        if (err) throw err;
                        newPlayer.password = hash;
                        newPlayer.save()
                            .then(player => {
                                const payload = {
                                    id: player.id,
                                    name: player.name
                                };

                                jwt.sign(payload, keys.secretOrKey, {
                                        expiresIn: 7200
                                    },
                                    (err, token) => {
                                        res.json({
                                            success: true,
                                            token: 'Bearer ' + token
                                        });
                                    });
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
});

router.post('/login', (req, res) => {
    const {
        errors,
        isValid
    } = validateLoginInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    const email = req.body.email;
    const password = req.body.password;

    Player.findOne({
            email
        })
        .then(player => {
            // return this message if player doesn't exist
            if (!player) {
                return res.status(404).json({
                    email: 'This email is not associated with any player'
                });
            }

            // check to see if the password is correct
            bcrypt.compare(password, player.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: player.id,
                            name: player.name
                        };

                        jwt.sign(payload, keys.secretOrKey, {
                            expiresIn: 7200
                        }, (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            });
                        });

                    } else {
                        return res.status(400).json({
                            password: 'Password is incorrect'
                        });
                    }
                });
        });
});

router.get('/leaderboard', (req, res) => {
    Player.find().limit(10).sort({
        score: -1
    }).then(players => {
        let leaders = [];

        players.forEach(player => {
            leaders.push({
                name: player.name,
                score: player.score
            });
        });

        res.json(leaders);
    }).catch(err => console.log(err));
});

// get the current player's data
router.get('/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Player.findById(req.params.id)
        .then(player => {
            res.json({
                name: player.name,
                score: player.score,
                businesses: player.businesses,
                managers: player.managers,
                lastLoggedIn: player.lastLoggedIn
            });
        }).catch(err => console.log(err));
});

// save the current player's progress
router.patch('/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Player.findById(req.params.id)
        .then(player => {
            if (req.body.score) player.score = req.body.score;
            if (req.body.businesses) player.businesses = req.body.businesses;
            if (req.body.managers) player.managers = req.body.managers;
            if (req.body.lastLoggedIn) player.lastLoggedIn = req.body.lastLoggedIn;

            player.save().then(p => res.json(p));
        }).catch(err => console.log(err));
});

module.exports = router;
