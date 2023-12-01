import express from 'express';
const router = express.Router();
import {
    addTrip,
    cancelTrip,
    getTripById,
    getMyTrips,
    updateTripToArrived,
    getTrips
} from '../controllers/tripController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addTrip).get(protect, admin, getTrips);
router.route('/mine').get(protect, getMyTrips);
router.route('/:id').get(protect, getTripById).delete(protect, cancelTrip);
router.route('/:id/arrived').put(protect, updateTripToArrived);
// router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;
