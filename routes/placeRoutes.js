import express from "express";
import multer from "multer";
import { createPlace, getPlaces } from "../controllers/placesController.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("foto"), createPlace);
router.get("/", getPlaces);

export default router;
