import { Router } from "express";
import animaisRouter from "./animais.routes.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).send({ message: "Servidor OK!" });
});

router.use("/animais", animaisRouter);
export default router;