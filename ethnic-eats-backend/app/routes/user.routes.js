const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const { upload } = require("../middlewares/upload")
const { uploadImage, editStreamTitle, getStreamTitle } = require("../controllers/user.controller")

module.exports = function (app) {

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/user/all", controller.allAccess);
  app.post('/api/user/upload', [authJwt.verifyToken], upload.single("image"), uploadImage)
  app.get("/api/user/user", [authJwt.verifyToken], controller.userBoard);
  app.post("/api/user/stream", [authJwt.verifyToken, authJwt.isAdmin], editStreamTitle)
  app.get("/api/user/stream", getStreamTitle)

  app.get(
    "/api/user/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/user/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
