const Song = require('../models/song');

const song_get = (req, res) => {
    Song.find()
        .then(result => {
            const random = Math.round(Math.random() * (result.length - 1));
            res.render('songs/guess', { title: 'Zgadnij piosenkę!', song: result[random] })
        })
        .catch(err => console.log(err));
};

const song_get_all = (req, res) => {
    Song.find()
        .sort({ title: "asc" })
        .then(result => res.render('songs/list', { title: 'List of all songs', songs: result }))
        .catch(err => console.log(err));
}

const song_get_details = (req, res) => {
    Song.findOne({ title: req.params.title })
        .then(result => res.render('songs/details', { title: 'Song details', song: result }))
        .catch(err => console.log(err));
}

const song_pattern = (req, res) => {
    const songLimit = 5;
    Song.find()
        .select('animeTitles')
        .then(result => {
            let titles = [];

            for (let n = 0; n < result.length; ++n) {
                titles = titles.concat(result[n].animeTitles);
            }

            let regex = new RegExp('^' + req.params.pattern + '.*', 'i');

            titles = titles.filter((title, index, self) => {
                return regex.test(title) && self.indexOf(title) === index;
            });
            
            titles.length = Math.min(titles.length, songLimit);

            res.json({ titles })
        })
        .catch(err => console.log(err));
}

const song_add_get = (req, res) => {
    res.render('songs/add', { title: 'Dodaj nową piosenkę!' });
}

const song_add_post = (req, res) => {
    const song = new Song(req.body);
    song.save()
        .then(result => res.redirect('/songs/add'))
        .catch(err => console.log(err));
} 

const song_delete = (req, res) => {
    Song.findOneAndDelete({ title: req.params.title })
        .then(result => res.json({ redirect: "/songs/list"}))
        .catch(err => console.log(err));
}

module.exports = {
    song_get,
    song_get_all,
    song_get_details,
    song_pattern,
    song_add_get,
    song_add_post,
    song_delete
};