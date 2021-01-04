// Extenal library for http connection errors
const boom = require('boom');

// Get Data Model
const Car = require('../models/cars');

// Get all the cars
exports.getCars = async(req, reply) => {
    try {
       const cars = await Car.find();
       return cars
    } catch(err) {
       throw boom.boomify(err);
    }
}

// Get single cars
exports.getSingleCar = async(req, reply) => {
    try {
       const id = req.params.id;
       const car = await Car.findById(id);
       return car
    }catch(err) {
       throw boom.boomify(err);
    }
}

// Add a new car
exports.addCar = async(req, reply) => {
    try {
       const car = new Car({...req.body});
       return car.save();
    }catch(err){
       throw boom.boomify(err);
    }
}

// Update an existing car
exports.updateCar = async(req, reply) => {
    try {
        const car = req.body;
        const id = req.params.id;
        const {...updateData} = car;
        const update = await Car.findByIdAndUpdate(id, updateData, {new: true})
    }catch(err){
        throw boom.boomify(err);
    }
}

// Delete an existing car
exports.deleteCar = async(req, reply) => {
    try {
        const id = req.params.id;
        const car = await Car.findByIdAndRemove(id);
        return car;
    }catch(err){
        boom.boomify(err);
    }
}