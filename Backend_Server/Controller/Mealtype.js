const Mealtype = require("../Models/MealtypeDB");
    exports.getMealtype = (req, res) =>{

        Mealtype.find()
    .then(response =>{
        res.status(200).json({
            message:"Mealtype fetched succesfully",
            Mealtype:response
        })
    })
    .catch(err =>{
        res.status(500).json({error:err})
    })

}

exports.getMealtypeById = (req, res) =>{

    const{mealId} = req.params;

   Mealtype.findById(mealId)    
     .then(response =>{
         res.status(200).json({
             message:"Meal by Id fetched succesfully",
             mealtype:response
         })
     })
     .catch(err =>{
         res.status(500).json({error:err})
     })


}