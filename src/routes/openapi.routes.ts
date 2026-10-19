
import { Router } from "express";
import { validateOpenApiController } from "../controllers/openapi.controller";

const router = Router();

router.post("/validate", validateOpenApiController);

export default router;
