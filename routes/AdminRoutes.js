import express from 'express';

import {getAllProjects, postProject, updateProject, deleteProject, getSingleProject } from '../controllers/adminController.js'

import { isAuthenticated } from '../middlewares/auth.js';

const router  =express.Router();

router.get("/getAllProjects", getAllProjects);
router.post("/postProject", isAuthenticated, postProject);
router.put("/updateProject/:id", isAuthenticated, updateProject);
router.delete("/deleteProject/:id", isAuthenticated, deleteProject);
router.get("/:id", getSingleProject);

export default router;