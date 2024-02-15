import { Router } from "express";
import { createOrganization } from "../controllers/index.js";

const organizationRouter = Router();

organizationRouter.post("/createorganization", createOrganization);

export default organizationRouter;
