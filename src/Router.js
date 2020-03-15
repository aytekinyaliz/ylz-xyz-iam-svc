const express = require('express');

const userRouter = require("./controllers/user/routes");


class Router {
  constructor(config) {
    this.router = express.Router();

    this.initDefaultRoutes();
    this.initControllerRoutes();
  }

  initDefaultRoutes() {
    this.router.get("/health-check", (req, res) => {
      res.send("I am OK");
    });
  }

  initControllerRoutes() {
    this.router.use("/users", userRouter);
  }
}


let instance;
module.exports = (options) => {
  if (!instance) {
    instance = new Router(options);
  }

  return instance;
}