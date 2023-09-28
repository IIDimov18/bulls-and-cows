const express = require("express");
import { log } from "console";
import RegisterController from "../controllers/RegisterController";
const router = express.Router();
const controller = new RegisterController();
router.post("/",(req:Request, res:Response)=>{controller.registerUser(req,res)});

router.post("/username-availability",(req:Request, res:Response)=>{controller.checkUsername(req,res)})

router.post("/email-availability",(req:Request, res:Response)=>{controller.checkEmail(req,res)})

router.post("/resend-email",(req:Request, res:Response)=>{controller.sendEmail(req.query.id)})

router.get("/confirm-email",(req:Request, res:Response)=>{controller.confirmAccount(req.query.token, res)})
router.post("/test",(req:Request, res:Response)=>{controller.testMail()})

// // About page route.
// router.get("/about", function (req: Request, res: Response) {
//   res.send("About this wiki"); 
// });

module.exports = router;