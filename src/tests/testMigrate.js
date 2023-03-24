const User = require("../models/User");
const sequelize = require("../utils/connection");
require("../models");
require("../models/User");
require("../models/Category");
require("../models/Product");

const main = async () => {
    try {
        await sequelize.sync({ force: true });
        await User.create({
            firstName: "Test",
            lastName: "User",
            email: "testuser@gmail.com",
            password: "test1234",
            phone: "12123224",
        });
        process.exit();
    } catch (error) {
        console.log(error);
    }
};

main();
