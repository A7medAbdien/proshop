import asyncHandler from '../middleware/asyncHandler.js';
import Trip from '../models/tripModel.js';
import Product from '../models/productModel.js';
import { calcPrices } from '../utils/calcPrices.js';
import { checkIfNewTransaction, verifyPayPalPayment } from '../utils/paypal.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addTrip = asyncHandler(async (req, res) => {
  const { from, to, numSeats, at } = req.body;

  // get Google Map data
  const expectedArrivalTime = new Date(Date.now());
  const distance = Math.floor(Math.random() * 100);
  const duration = Math.floor(Math.random() * 100);
  const progress = 0;

  // calculate cost
  // const cost = calcPrices(distance, duration);
  const cost = 50;

  const trip = new Trip({
    driver: req.user._id,
    from,
    to,
    numSeats,
    at,
    expectedArrivalTime,
    distance,
    duration,
    cost,
    progress,
    isArrived: false,
    isPaid: false,
  });

  const createdTrip = await trip.save();

  res.status(201).json(createdTrip);

});

const cancelTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);

  if (trip) {
    await Trip.deleteOne({ _id: trip._id });
    res.json({ message: 'Trip removed' });
  } else {
    res.status(404);
    throw new Error('Trip not found');
  }
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyTrips = asyncHandler(async (req, res) => {
  const trips = await Trip.find({ driver: req.user._id });
  res.json(trips);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getTripById = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id).populate(
    'driver',
    'name email'
  ).populate('passenger');

  if (trip) {
    res.json(trip);
  } else {
    res.status(404);
    throw new Error('Trip not found');
  }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateTripToArrived = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);

  if (trip) {
    trip.isArrived = true;
    const updatedTrip = await trip.save();

    res.status(200).json(updatedTrip);
  } else {
    res.status(404);
    throw new Error('Trip not found');
  }
});


// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const { verified, value } = await verifyPayPalPayment(req.body.id);
  if (!verified) throw new Error('Payment not verified');

  // check if this transaction has been used before
  const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
  if (!isNewTransaction) throw new Error('Transaction has been used before');

  const order = await Order.findById(req.params.id);

  if (order) {
    // check the correct amount was paid
    const paidCorrectAmount = order.totalPrice.toString() === value;
    if (!paidCorrectAmount) throw new Error('Incorrect amount paid');

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});


// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getTrips = asyncHandler(async (req, res) => {
  const orders = await Trip.find({}).populate('driver', 'id name');
  res.json(orders);
});

export {
  addTrip,
  cancelTrip,
  getTripById,
  getMyTrips,
  updateTripToArrived,
  getTrips
};
