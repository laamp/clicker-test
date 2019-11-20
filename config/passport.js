const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Player = mongoose.model('players');
const keys = require('./keys');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        Player.findById(jwt_payload.id)
            .then(player => {
                if (player) {
                    console.log(player)
                    return done(null, player);
                }

                return done(null, false);
            })
            .catch(err => console.log(err));
    }));
};
