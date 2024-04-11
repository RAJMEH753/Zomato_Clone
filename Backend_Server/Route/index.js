const express = require('express');
const LocationController = require("../Controller/location.js")
const RestaurantController = require("../Controller/restaurant.js")
const MealtypeController = require("../Controller/Mealtype.js")
const UserController = require("../Controller/user.js")
const MenuController = require("../Controller/menu.js")

const route = express.Router();

route.get('/location',LocationController.getLocation);                   // Homepage - Get Location API
route.get('/rest/:locId',RestaurantController.getRestaurantByLocationId);// Homepage - Get Restaurant By Location API
route.get('/restaurants/:id',RestaurantController.getRestaurantById);    // Details - Get Restaurant By ID API
route.get('/mealtype',MealtypeController.getMealtype);    // Homepage - Get Mealtype API
route.post('/signup', UserController.postSignup);           // Homepage - POST Sign Up API
route.post('/login', UserController.postLogin);              // Homepage - POST Login API
route.get('/menu/:resId',MenuController.getMenuByRestaurantId);     // Details - Get Menu By Restaurant ID API

//Filter page (class 31)
route.get('/restaurant',RestaurantController.getRestaurant);              // List of Restaurants API
route.post('/filter',RestaurantController.FilteredRestaurant);
route.get('/meal/:mealId',MealtypeController.getMealtypeById);    // Filter - Get Mealtype API

module.exports = route;

//try by yourself:
// In details page: post user details, post order deatils, order by user, orderDetailsByRestaurantID
