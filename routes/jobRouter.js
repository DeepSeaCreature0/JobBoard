import express from 'express';
import {getAllJobs,getSingleJob, postJob, updateJob, deleteJob, getMyAllJobs} from '../controllers/jobController.js';
import {isAuthorized} from '../middlewares/auth.js'

const router = express.Router();

router.get("/getAllJobs",getAllJobs);
router.get("/myJobs",isAuthorized,getMyAllJobs);
router.get("/:id",getSingleJob);
router.post("/postJob",isAuthorized,postJob);
router.put("/updateJob/:id",isAuthorized,updateJob);
router.delete("/deleteJob/:id",isAuthorized,deleteJob);

export default router;