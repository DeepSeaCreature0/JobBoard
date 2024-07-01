import express from 'express';
import {employerGetAllApps,jobSeekerGetAllApps,jobSeekerDeleteApp,postApp} from '../controllers/appController.js';
import {isAuthorized} from '../middlewares/auth.js';

const router = express.Router();

router.post("/postApp",isAuthorized,postApp);
router.get("/employerGetAllApps",isAuthorized,employerGetAllApps);
router.get("/jobSeekerGetAllApps",isAuthorized,jobSeekerGetAllApps);
router.delete("/jobSeekerDeleteApp/:id",isAuthorized,jobSeekerDeleteApp);

export default router;