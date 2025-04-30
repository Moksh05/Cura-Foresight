import express from 'express';
import { updateDoctor,deleteDoctor,getSingleDoctor,getAllDoctors,getDoctorProfile, getTopDoctors } from "../Controllers/doctorController.js";
import { authenticate, restrict } from '../Auth/verifyToken.js';
import reviewRouter from './review.js'
import bookingRouter from './booking.js'
import { getBookingsForDoctor } from '../Controllers/bookingController.js';
const router = express.Router()
router.use('/:doctorId/reviews',reviewRouter)
router.use('/:doctorId/booking',bookingRouter)
router.get('/topdoctors',getTopDoctors)
router.get('/:id',getSingleDoctor)
router.put('/:id', authenticate, restrict(["doctor"]), updateDoctor)
router.delete('/:id', authenticate, restrict(["doctor"]), deleteDoctor)
router.get('/profile/me', authenticate, restrict(["doctor"]), getDoctorProfile)
router.get('/',getAllDoctors)
export default router;