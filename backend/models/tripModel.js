import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const tripSchema = mongoose.Schema(
    {
        driver: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        passengers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: false,
                ref: 'User',
            }
        ],
        // Entered by Driver
        from: {
            type: String,
            required: true,
        },
        to: {
            type: String,
            required: true,
        },
        numSeats: {
            type: Number,
            required: true
        },
        at: {
            type: String, // could be Date
            required: true,
        },
        isArrived: {
            type: Boolean,
            required: true,
            default: false,
        },
        isPaid: {
            type: Boolean,
            required: true,
            default: false,
        },

        // Entered by Google Map
        expectedArrivalTime: {
            type: String, // could be Date
            required: true,
        },
        distance: {
            type: Number, // in Meters
            required: false,
        },
        duration: {
            type: Number, // in Minutes
            required: false,
        },
        progress: {
            type: Number,
            required: true,
            default: 0,
        },

        // Calculated by server
        cost: {
            type: Number, // in ???
            required: false,
        },

    },
    {
        timestamps: true,
    }
);

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;
