const {UserModel, BookModel} = require("../models");




// router.get("/", (req,res) => {
//     res.status(200).json({
//         success : true,
//         data : users
//     })
// })
exports.getAllUsers = async (req,res) => {
    const users = await UserModel.find();

    if(!users || users.length === 0){
        return res.status(404).json({
            success : false,
            message : "No user found"
        })
    }

    return res.status(200).json({
        success : true,
        data : users
    })
}


// router.get("/:id",(req,res) => {

//     const {id} = req.params;
//     const user = users.find((each)=> each.id === id);

//     if(!user){
//         return res.status(404).json({
//             success : false,
//             message : `user ${id} not found`
//         });
//     };
//     res.status(200).json({
//         success : true,
//         data : user
//     });
// });
exports.getSingleUserById = async (req, res) => {
    const {id} = req.params;

     const user = await UserModel.findById(id);
    //const user = await UserModel.findById({_id : id});
    // const user = await UserModel.findOne({_id : id});

    if(!user || user.length === 0){
        return res.status(404).json({
            success : false,
            message : `No user found for the id ${id}`
        })
    }

    return res.status(200).json({
        success : true,
        data : user
    })
}



// router.post("/",(req,res)=>{
//     const {id, name, surname, email, subscriptionType, subscriptionDate} = req.body;

//     if(!id || !name || !surname || !email || !subscriptionType || !subscriptionDate){
//         return res.status(404).json({
//             success : false,
//             message : `please provide all the required fields`
//         });
//     };
//     const user = users.find((each)=> each.id === id);

//     //check if user already exists
//     if(user){
//         return res.status(404).json({
//             success : false,
//             message : `user already exists! with id : ${id}`
//         });
//     }

//         users.push({
//             id, name, surname, email, subscriptionType, subscriptionDate
//         })
//         res.status(201).json({
//             success : true,
//             message : `user added successfully!`
//         });
// });
exports.createUser  = async (req,res) => {
    const {data} = req.body;

    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success : false,
            message : "Please provide data to create a new user"
        })
    }

    // Save user to MongoDB
    const newUser = await UserModel.create(data);


    res.status(201).json({
        success : true,
        message : "User created successfully!",
        data : newUser
    })

};




// router.put("/:id",(req,res)=>{
//     const {id} = req.params;
//     const {data} = req.body;

//     const user = users.find((each)=> each.id === id);

//     if(!user){
//         return res.status(404).json({
//             success : false,
//             message : `user ${id} not found`
//         });
//     };

//     // Object.assign(user, data);

//     const updatedUser = users.map((each)=>{
//         if(each.id === id){
//             return {
//                 ...each,
//                 ...data,
//             }
//         }
//         return each;
//     })
//     res.status(200).json({
//             success : true,
//             data : updatedUser,
//             message : `user ${id} updated successfully!`
//         });
// });
exports.updateUserById = async (req,res) => {
    const {id} = req.params;
    const {data} = req.body;

    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success : false,
            message : "Please provide data to update new user"
        })
    }

    //update the user by id

    const updatedUser  =  await UserModel.findByIdAndUpdate(id, data, {new : true});
         res.status(200).json({
            success : true,
            message : "User updated successfully",
            data : updatedUser
        })
    }






//     router.delete("/:id", (req,res)=>{
//     const {id} = req.params;
//     const user = users.find((each)=> each.id === id);
//     if(!user){
//         return res.status(404).json({
//             success : false,
//             message : `user ${id} not found`
//         });
//     };
//     const updatedUsers = users.filter((each)=> each.id != id);

//     //2nd method

//     // const index = users.indexOf(user);
//     // users.splice(index, 1);

//     if(!user){
//         return res.status(200).json({
//             success : true,
//             data : updatedUsers,
//             message : `user ${id} deleted successfully!`
//         });
//     };

// });
exports.deleteUserById = async (req,res) => {
    const { id } = req.params;
    
    //check if user exists
    const user = await UserModel.findById(id);
    if(!user){
        return res.status(404).json({
            success: false,
            message : `user with the id ${id} not found`
        })
    }

    //deleting user with id
    await UserModel.findByIdAndDelete(id);
    res.status(200).json({
        success : true,
        message : "user deleted successfully!"
    })
}




// router.get("/subscription-details/:id", (req,res)=>{
//     const {id} = req.params;
//     const user = users.find((each)=> each.id === id);
//     if(!user){
//         return res.status(404).json({
//             success : false,
//             message : `user ${id} not found`
//         });
//     };


//     //Extract the subscription details
//     // const getDateInDays = ((date = " ") => {
//     //     let date;
//     //     if(date){
//     //         date = new date(data);
//     //     }else{
//     //         date = new date();
//     //     }
//     //     let days =  Math.floor(date.getTime()/(1000 * 60 * 60 *24));
//     //     return days;
//     // });

//     // Issues:

//     // You declare date twice → function parameter (date) and inside let date;.
//     // → ❌ Causes SyntaxError: Identifier 'date' has already been declared.

//     // You use new date(...) instead of new Date(...) (capital D).

//     // You reference data instead of date. data doesn’t exist here.




//     const getDateInDays = (dateInput = "") => {
//     let givenDate;
//     if (dateInput) {
//         givenDate = new Date(dateInput);
//     } else {
//         givenDate = new Date();
//     }
//     let days = Math.floor(givenDate.getTime() / (1000 * 60 * 60 * 24));
//     return days;
//     };

//     // ternary operator instead of if else :    
//     // const getDateInDays = (dateInput = "") => {
//     //     let givenDate = dateInput ? new Date(dateInput) : new Date();
//     //     return Math.floor(givenDate.getTime() / (1000 * 60 * 60 * 24));
//     // };



//     const subscriptionType = (date) => {
//         if(user.subscriptionType === "Basic"){
//             date = date + 90;
//         }else if(user.subscriptionType === "Standard"){
//             date = date + 180;
//         }else if(user.subscriptionType === "Premium"){
//             date = date + 365;
//         }
//         return date;
//     };


//     //instead of if else -> directly using if statement
//     // const subscriptionType = (date) => {
//     // if(user.subscriptionType === "Basic") return date + 90;
//     // if(user.subscriptionType === "Standard") return date + 180;
//     // if(user.subscriptionType === "Premium") return date + 365;
//     // return date;
//     // };


//     //   can also use switch statement    instead
//     //     const subscriptionType = (date) => {
//     // switch (user.subscriptionType) {
//     //     case "Basic": return date + 90;
//     //     case "Standard": return date + 180;
//     //     case "Premium": return date + 365;
//     //     default: return date; // or throw an error if invalid
//     // }   
//     // };

//     //subscription expiration calculation
//     //January 1, 1970 - milliseconds

//     let returnDate = getDateInDays(user.returnDate);
//     let currentDate = getDateInDays();
//     let subscriptionDate = getDateInDays(user.subscriptionDate);
//     let subscriptionExpiration = subscriptionType(subscriptionDate);


//     const data = {
//         ...user,
//         subscriptionExpired : subscriptionExpiration < currentDate,
//         subscriptionDaysLeft : subscriptionExpiration - currentDate,
//         daysLeftForExpiration : returnDate - currentDate,
//         returnDate : returnDate  < currentDate ? "Book is Overdue"  : returnDate,
//         fine : returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0
//     }


//      res.status(200).json({
//             success : true,
//             data : data
//         });

// });
exports.getSubscriptionDetailsById   =   async (req,res)   => {
    const {id} = req.params;

     const user = await UserModel.findById(id);
    //const user = await UserModel.findById({_id : id});
    // const user = await UserModel.findOne({_id : id});

    // if(!user || user.length === 0){
    // user is a single document, not an array.
    // user.length is undefined → this condition could behave unpredictably.    

    if(!user){
        return res.status(404).json({
            success : false,
            message : `No user found for the id ${id}`
        })
    }

    //extract the supscription details
    const getDateInDays = (dateInput = "") => {
        let givenDate;
        if (dateInput) {
            givenDate = new Date(dateInput);
        } else {
            givenDate = new Date();
        }
        let days = Math.floor(givenDate.getTime() / (1000 * 60 * 60 * 24));
        return days;
        };

        // ternary operator instead of if else :    
        // const getDateInDays = (dateInput = "") => {
        //     let givenDate = dateInput ? new Date(dateInput) : new Date();
        //     return Math.floor(givenDate.getTime() / (1000 * 60 * 60 * 24));
        // };

        const subscriptionType = (date) => {
            if(user.subscriptionType === "Basic"){
                date = date + 90;
            }else if(user.subscriptionType === "Standard"){
                date = date + 180;
            }else if(user.subscriptionType === "Premium"){
                date = date + 365;
            }
            return date;
        };

        let returnDate = getDateInDays(user.returnDate);
        let currentDate = getDateInDays();
        let subscriptionDate = getDateInDays(user.subscriptionDate);
        let subscriptionExpiration = subscriptionType(subscriptionDate);


        //dont spread like this
        // const data = {
        //     ...user,                           //<- spreading the whole mongoose document
        //     subscriptionExpired : subscriptionExpiration < currentDate,
        //     subscriptionDaysLeft : subscriptionExpiration - currentDate,
        //     daysLeftForExpiration : returnDate - currentDate,
        //     returnDate : returnDate  < currentDate ? "Book is Overdue"  : returnDate,
        //     fine : returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0
        // }
       
        //Problem:
        // user is a Mongoose document, not a plain object.
        // Spreading it includes internal Mongoose properties like $__, $isNew, etc.
        // That’s why your JSON output contained $__ and _doc.
        // Also, returnDate is a number of days, not a human-readable date.


        //Correct Code
        const data = {
        ...user._doc,                              // ✅ use ._doc to extract only actual user data, not Mongoose internals
            subscriptionExpired: subscriptionExpiration < currentDate,
            subscriptionDaysLeft: subscriptionExpiration - currentDate,
            daysLeftForExpiration: returnDate - currentDate,
            returnDate: returnDate < currentDate ? "Book is Overdue" : returnDate,
            fine: returnDate < currentDate
            ? (subscriptionExpiration <= currentDate ? 200 : 100)
            : 0
        };



//     💡 Alternate Clean Way (same result)
// You can also do this instead of using ._doc:
// const plainUser = user.toObject(); // converts to plain JS object
// const data = {
//   ...plainUser,
//   subscriptionExpired: subscriptionExpiration < currentDate,
//   subscriptionDaysLeft: subscriptionExpiration - currentDate,
//   daysLeftForExpiration: returnDate - currentDate,
//   returnDate: returnDate < currentDate ? "Book is Overdue" : returnDate,
//   fine: returnDate < currentDate
//       ? (subscriptionExpiration <= currentDate ? 200 : 100)
//       : 0
// };
// ✅ toObject() is cleaner, safer, and officially recommended by Mongoose.  



//Explicitly selected fields
// const data = {
//   _id: user._id,
//   name: user.name,
//   surname: user.surname,
//   email: user.email,
//   issuedDate: user.issuedDate,
//   subscriptionType: user.subscriptionType,
//   subscriptionDate: user.subscriptionDate,
//   subscriptionExpired: subscriptionExpirationDays < currentDateDays,
//   subscriptionDaysLeft: subscriptionExpirationDays - currentDateDays,
//   daysLeftForExpiration: returnDateDays - currentDateDays,
//   returnDate: returnDateDays < currentDateDays ? "Book is Overdue" : user.returnedDate,
//   fine: returnDateDays < currentDateDays
//     ? (subscriptionExpirationDays <= currentDateDays ? 200 : 100)
//     : 0
// };

        res.status(200).json({
                success : true,
                data : data
            });
}