const { model } = require('mongoose');
const knex = require('../config/db-sql');

const User = model('User');

exports.store = async (req, res) => {
    try {
        let { id, name, lastName } = await User.findById(req.userData.id);

        if (!id || id == null) return res.status(500).send({ message: 'User not found!' });

        let { playlistName } = req.body;

        if (!playlistName) return res.status(500).send({ message: 'Playlist name cannot be empty!' });

        await knex('classlist').insert({ _idUser: id, listName: playlistName, fullName: `${name} ${lastName}` });

        res.status(201).send({ message: 'Playlist created!' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Playlist not created!' });
    }
}

exports.index = async (req, res) => {
    try {
        let allPlaylist = await knex.select('listName', 'fullName').from('classlist');

        if (!allPlaylist) return res.status(500).send({ message: 'Playlist not found!' });

        res.status(200).send({ message: 'Playlist listed!', allPlaylist });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Playlist not listed!' });
    }
}

exports.update = async (req, res) => {
    try {
        let { idplaylist } = req.params;
        let { id } = await req.userData;
        let { playlistName } = req.body;

        if (!playlistName) return res.status(500).send({ message: 'Playlist name cannot be empty!' });

        if (await knex('classlist').where({ id: idplaylist, _idUser: id }).update('listName', playlistName) == 0) return res.status(500).send({ message: 'No records were found with the data entered!' });

        return res.status(200).send({ message: 'Playlist updated!' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Playlist not updated!' });
    }
}

exports.delete = async (req, res) => {
    try {
        let { idplaylist } = req.params;
        let { id } = await req.userData;

        if (await knex('classlist').where({ id: idplaylist, _idUser: id }).del() == 0) return res.status(500).send({ message: 'No records were found with the data entered!' });

        return res.status(200).send({ message: 'Playlist deleted!' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Playlist not deleted!' });
    }
}