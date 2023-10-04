const express = require("express");
import GameController from "../controllers/GameController";
const router = express.Router();
let controller = new GameController()

// router.get("/",(req:Request, res:Response)=>{controller.test()});

router.post("/",(req:Request, res:Response)=>{controller.SubmitGame(req, res)})

router.get("/leaderboard",(req:Request, res:Response)=>{controller.GetLeaderboard(res)})


// router.get("/test",(req:Request, res:Response)=>{controller.test(res)})

// // About page route.
// router.get("/about", function (req: Request, res: Response) {
//   res.send("About this wiki");
// });

module.exports = router;