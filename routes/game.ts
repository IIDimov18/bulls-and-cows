const express = require("express");

import GameController from "../controllers/GameController";

const router = express.Router();
let controller = new GameController()

router.post("/",(req:Request, res:Response)=>{controller.SubmitGame(req, res)})

router.get("/leaderboard",(req:Request, res:Response)=>{controller.GetLeaderboard(res)})

module.exports = router;