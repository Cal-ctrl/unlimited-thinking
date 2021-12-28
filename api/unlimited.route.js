import express from "express";
import unlimitedController from "./unlimted.controller.js";

const router = express.Router()



router.route("/unlimited").get(unlimitedController.getFilmInfo);

router.route("/test").get((req, res) => {
  res.send(`Hello World!`)
})

export default router;
