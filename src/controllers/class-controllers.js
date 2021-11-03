const knex = require('../config/db-sql');

exports.store = async (req, res) => {
    try {
        let { idplaylist } = req.params;
        let userId = await req.userData.id;
        let { contentTitle, description } = req.body;

        if (await knex('classlist').where({ id: idplaylist, _idUser: userId }) == 0) return res.status(500).send({ message: 'Class list not found!' });

        await knex('class').insert({ classList_id: idplaylist, pathVideo: undefined, contentTitle: contentTitle });

        return res.status(201).send({ message: 'Class created!' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Class not cretated!' });
    }
}

exports.index = async (req, res) => {
    try {
        const { idplaylist } = req.params;
        const userId = await req.userData.id;

        if (await knex('classlist').where({ id: idplaylist, _idUser: userId }) == 0) return res.status(500).send({ message: 'Class list not found!' });

        const list = await knex('class').where({ classList_id: idplaylist });

        if (list == 0) return res.status(500).send({ message: 'Classes not found!' });

        return res.status(201).send(list);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Class not listed!' });
    }
}

exports.update = async (req, res) => {
    try {
        const { idplaylist, idclass } = req.params;
        const userId = await req.userData.id;
        const { contentTitle } = req.body;

        if (await knex('classlist').where({ id: idplaylist, _idUser: userId }) == 0) return res.status(500).send({ message: 'No records were found with the data entered!' });

        if (await knex('class').where({ id: idclass }) == 0) return res.status(500).send({ message: 'No class records were found!' });

        await knex('class').where({ id: idclass }).update({ pathVideo: undefined, contentTitle: contentTitle });

        return res.status(201).send({ message: 'Class updated!' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Class not updated!' });
    }
}

exports.delete = async (req, res) => {
    try {
        const { idplaylist, idclass } = req.params;
        const userId = await req.userData.id;

        if (await knex('classlist').where({ id: idplaylist, _idUser: userId }) == 0) return res.status(500).send({ message: 'No records were found with the data entered!' });

        if (await knex('class').where({ id: idclass }) == 0) return res.status(500).send({ message: 'No class records were found!' });

        await knex('class').where({ id: idclass }).del();

        return res.status(201).send({ message: 'Class deleted!' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Class not deleted!' });
    }
}
