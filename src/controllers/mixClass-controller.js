const { model } = require('mongoose');
const knex = require('../config/db-sql');

const User = model('User');

exports.store = async (req, res) => {
    try {
        let userData = await User.findById(req.userData.id);

        if (!userData || userData == null) return res.status(500).send({ error: 'User not found!' });

        let { listName } = req.body;

        if (!listName)
            res.status(500).send({ message: 'List name cannot be empty!' });

        await knex('classlist').insert({ _idUser: req.userData.id, listName: listName, fullName: `${userData.name} ${userData.lastName}` });

        res.status(201).send({ message: 'Mix class created!' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Mix class not created!' });
    }
}

exports.index = async (req, res) => {
    try {
        let listRegister = await knex.select('listName', 'fullName').from('classlist');

        if (!listRegister) return res.status(500).send({ message: 'Mix list not found!' });

        res.status(200).send({ message: 'Mix class listed!', listRegister });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Mix class not listed!' });
    }
}

exports.update = async (req, res) => {
    try {
        let id = req.params.id;
        let userId = await req.userData.id;
        let { listName } = req.body;

        if (await knex('classlist').where({ 'id': id, '_idUser': userId }).update('listName', listName) == 0) return res.status(500).send({ message: 'No records were found with the data entered!' });

        await knex('classlist').where({ 'id': id, '_idUser': userId }).update('listName', listName);

        return res.status(200).send({ message: 'Class list updated!' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Class list not updated!' });
    }
}

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = await req.userData.id;

        if (await knex('classlist').where({ 'id': id, '_idUser': userId }) == 0) return res.status(500).send({ message: 'No records were found with the data entered!' });

        await knex('classlist').where({ 'id': id, '_idUser': userId }).del();

        return res.status(200).send({ message: 'Class list deleted!' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Class list not deleted!' });
    }
}