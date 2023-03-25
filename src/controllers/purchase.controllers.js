const catchError = require("../utils/catchError");
const Purchase = require("../models/Purchase");
const Product = require("../models/Product");

const getAll = catchError(async (req, res) => {
    const userId = req.user.id;
    const result = await Purchase.findAll({
        include: [Product],
        where: { userId },
    });
    return res.json(result);
});

module.exports = {
    getAll,
};
