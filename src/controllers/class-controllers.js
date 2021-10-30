const knex = require('../config/db-sql');

exports.create = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = await req.userData.id;
        const { contentTitle } = req.body;

        if (await knex('classlist').where({ id: id, _idUser: userId }) == 0) return res.status(500).send({ message: 'Class list not found!' });

        await knex('class').insert({ classList_id: id, pathVideo: undefined, contentTitle: contentTitle });

        return res.status(201).send({ message: 'Class created!' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Class not cretated!' });
    }
}

exports.list = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = await req.userData.id;

        if (await knex('classlist').where({ id: id, _idUser: userId }) == 0) return res.status(500).send({ message: 'Class list not found!' });

        const list = await knex('class').where({ classList_id: id });

        if (list == 0) return res.status(500).send({ message: 'Classes not found!' });

        return res.status(201).send(list);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Class not cretated!' });
    }
}

exports.update = async (req, res) => {
    try {
        const { idList, idClass } = req.params;
        const userId = await req.userData.id;
        const { contentTitle } = req.body;

        if (await knex('classlist').where({ 'id': idList, '_idUser': userId }) == 0) return res.status(500).send({ message: 'No records were found with the data entered!' });

        if (await knex('class').where({ 'id': idClass }) == 0) return res.status(500).send({ message: 'No class records were found!' });

        await knex('class').where({ 'id': idClass }).update({ pathVideo: undefined, contentTitle: contentTitle });

        return res.status(201).send({ message: 'Class updated!' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Class not updated!' });
    }
}

exports.delete = async (req, res) => {
    try {
        const { idList, idClass } = req.params;
        const userId = await req.userData.id;

        if (await knex('classlist').where({ 'id': idList, '_idUser': userId }) == 0) return res.status(500).send({ message: 'No records were found with the data entered!' });

        if (await knex('class').where({ 'id': idClass }) == 0) return res.status(500).send({ message: 'No class records were found!' });

        await knex('class').where({ 'id': idClass }).del();

        return res.status(201).send({ message: 'Class deleted!' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Class not deleted!' });
    }
}
