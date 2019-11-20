const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Player = require('../../models/Player');

router.get('/test', (req, res) => res.json({
    msg: 'This is the player test route'
}));

router.post('/register', (req, res) => {
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
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newPlayer.password, salt, (err, hash) => {
                        if (err) throw err;
                        newPlayer.password = hash;
                        newPlayer.save()
                            .then(player => res.json(player))
                            .catch(err => console.log(err));
                    });
                });
            }
        });
});

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    Player.findOne({
            email
        })
        .then(player => {
            if (!player) {
                return res.status(404).json({
                    email: 'This email is not associated with any player'
                });
            }

            // left off here...
        });
});

module.exports = router;