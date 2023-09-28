const express = require("express");
import LoginController from "../controllers/LoginController";
const router = express.Router();
let controller = new LoginController()

router.post("/",(req:Request, res:Response)=>{controller.login(req,res)});

// // About page route.
// router.get("/about", function (req: Request, res: Response) {
//   res.send("About this wiki");
// });

module.exports = router;