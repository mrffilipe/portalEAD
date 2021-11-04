const knex = require('../config/db-sql');

exports.store = async (req, res) => {
    try {
        let { id } = req.userData;
        let { idplaylist } = req.params;
        let { title, description } = req.body;

        if (await knex('classlist').where({ id: idplaylist, _idUser: id }) == 0) return res.status(500).send({ message: 'Playlist not found!' });

        await knex('class').insert({
            classList_id: idplaylist,
            pathVideo: '',
            contentTitle: title,
            description: description
        });

        return res.status(201).send({ message: 'Class created!' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Class not cretated!' });
    }
}

exports.index = async (req, res) => {
    try {
        let { idplaylist } = req.params;

        let indexClasses = await knex('class').select('pathVideo', 'contentTitle', 'description').where({ classList_id: idplaylist });

        if (indexClasses == 0) return res.status(500).send({ message: 'Classes were not found in this playlist!' })

        return res.status(201).send({ message: 'Classes listed!', indexClasses });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Classes not listed!' });
    }
}

exports.update = async (req, res) => {
    try {
        let { id } = req.userData;
        let { idplaylist, idclass } = req.params;
        let { title, description } = req.body;

        if (await knex('classlist').where({ id: idplaylist, _idUser: id }) == 0) return res.status(500).send({ message: 'Playlist not found!' });

        if (await knex('class').where({ classList_id: idplaylist, id: idclass }).update({ 'contentTitle': title, 'description': description, 'pathVideo': 'link' }) == 0) return res.status(500).send({ message: 'No records were found with the data entered!' });

        return res.status(201).send({ message: 'Class updated!' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Class not updated!' });
    }
}

exports.delete = async (req, res) => {
    try {
        let { id } = req.userData;
        let { idplaylist, idclass } = req.params;

        if (await knex('classlist').where({ id: idplaylist, _idUser: id }) == 0) return res.status(500).send({ message: 'Playlist not found!' });

        if (await knex('class').where({ classList_id: idplaylist, id: idclass }).del() == 0) return res.status(500).send({ message: 'No records were found with the data entered!' });

        return res.status(200).send({ message: 'Class deleted!' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Class not deleted!' });
    }
}
