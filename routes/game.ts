const express = require("express");
import GameController from "../controllers/GameController";
const router = express.Router();
let controller = new GameController()

// router.get("/",(req:Request, res:Response)=>{controller.test()});

// router.post("/",(req:Request, res:Response)=>{controller.test()})

// router.post("/test",(req:Request, res:Response)=>{controller.login(req,res)})

// // About page route.
// router.get("/about", function (req: Request, res: Response) {
//   res.send("About this wiki");
// });

module.exports = router;