const Item = require('../models/item.model')

exports.addItem = async (req, res) => {
    const item = new Item({
        name: req.body.name,
        price: parseFloat(req.body.price),
        description: req.body.description
    });
    item.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        user.save(err => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            res.send({ message: "Item was added successfully!" });
        });
    });
};

exports.getAllItems = async (req, res) => {
    Item.find({}, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    });
}
