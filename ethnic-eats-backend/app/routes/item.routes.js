const { authJwt } = require("../middlewares");
const { addItem, getAllItems } = require("../controllers/item.controller")

module.exports = function (app) {

    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/item/all", [authJwt.verifyToken], getAllItems);
    app.post("/api/item/add", [authJwt.verifyToken, authJwt.isAdmin], addItem);
    // app.get("/api/item/stream", getStreamTitle);
    // app.get(
    //     "/api/item/admin",
    //     [authJwt.verifyToken, authJwt.isAdmin],
    //     controller.adminBoard
    // );
};
