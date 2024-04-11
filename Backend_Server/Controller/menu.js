const Menu = require("../Models/MenuDB");

exports.getMenuByRestaurantId = (req, res) =>{

  const{resId} = req.params
  
   Menu.find({restaurantId:resId})
    .then(response =>{
        res.status(200).json({
            message:"Menu fetched succesfully by restaurantId",
            menuItem:response
        })
    })
    .catch(err =>{
        res.status(500).json({error:err})
    })
}