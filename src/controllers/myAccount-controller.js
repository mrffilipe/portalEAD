const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = async (req, res) => {
    if (req.userData.admin == true) {
        try {
            const accountData = await User.findById(req.userData.id);

            if (!accountData)
                return res.status(400).send('Failed to get information!');

            return res.status(200).send({ accountData, status: req.userData.admin });
        } catch (error) {
            console.log(error);
            return res.status(400).send('Failed to get information!');
        }
    } else {
        try {
            const accountData = await User.findById(req.userData.id);

            if (!accountData)
                return res.status(400).send('Failed to get information!');

            return res.status(200).send({ accountData });
        } catch (error) {
            console.log(error);
            return res.status(400).send('Failed to get information!');
        }
    }
}