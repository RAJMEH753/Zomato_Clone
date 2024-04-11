const Restaurant = require("../Models/restaurantDB");

exports.getRestaurant = (req, res) =>{

   Restaurant.find()
    .then(response =>{
        res.status(200).json({
            message:"Restaurants fetched succesfully",
            restaurant:response
        })
    })
    .catch(err =>{
        res.status(500).json({error:err})
    })
}

exports.getRestaurantByLocationId = (req, res) =>{

    const{locId} = req.params;

    Restaurant.find( { city: locId},{})
     .then(response =>{
         res.status(200).json({
             message:"Restaurants by location Id fetched succesfully",
             restaurant:response
         })
     })
     .catch(err =>{
         res.status(500).json({error:err})
     })
 }

 exports.getRestaurantById = (req, res) =>{

    const{id} = req.params;

    Restaurant.findById(id)
     .then(response =>{
         res.status(200).json({
             message:"Restaurants by Id fetched succesfully",
             restaurant:response
         })
     })
     .catch(err =>{
         res.status(500).json({error:err})
     })
 }

 //FILTER
 exports.FilteredRestaurant = (req, res) =>{

    let{ location, mealtype, lcost, hcost, cuisine, sort, page} = req.body; //location because we are working to get the location, may vary, give request from the body

    sort = sort? sort:1;  //1 ->Ascending operator(default),   -1 ->Dscending operator  {"sort":-1 for descending order}
     //if sort do not have value will consider the value as 1, if any value will consider the value (terminary operator)

     page = page? page:1; //if no page selected by default page 1 should appear
     const itemsPerPage = 2; //no of restaurants per page
     const StartIndex = page* itemsPerPage - itemsPerPage;
     const LastIndex = page*itemsPerPage;

    var filterObj = {};

    location && (filterObj["city"] = location);
     //city from the restaurant data matches with city_id from location data
    //for example: we will put {
    //   "location":1
    //      }   in the body selecting post method and it wil fetch the restaurants of city:1 (Delhi)

    mealtype && (filterObj["type.mealtype"] = mealtype);
    //dinner has a id of 3 and it is available under type->mealtype
    // Inserting mealtype data passed from the body to the filter object.(search like: {"mealtype":3})
    //you can also find both like: {"location":1, "mealtype":3}

    lcost && hcost && (filterObj["cost"] = { $gte: lcost, $lte: hcost});  //gte refers to greater than or equal to 
    //search like: {"location":1,"mealtype":3,"lcost":300,"hcost":500}

    cuisine && (filterObj["Cuisine.cuisine"] = { $in: cuisine });
    //search like:{ "location":1, "cuisine":[2,4] }
    console.log(filterObj);


    Restaurant.find(filterObj).sort({ cost : sort})
    //it will sort cost in ascending order write: {sort:1}, sort:-1 for descending order
     .then(response =>{
        const filterresponse = response.slice(StartIndex, LastIndex) //related to page
         res.status(200).json({
             message:"Restaurants filtered succesfully",
             restaurant:filterresponse
         })
     })
     .catch(err =>{
         res.status(500).json({error:err})
     })
 }
 