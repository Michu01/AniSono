const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artists: {
        type: Array,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    animeTitles: {
        type: Array,
        required: true
    },
    link: {
        type: String,
        required: true
    }
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;