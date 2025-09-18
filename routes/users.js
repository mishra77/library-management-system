const express = require("express");
const {users} = require("../data/users.json");

const router = express.Router(); 

//replacing  app->router



/**
 * Route : /users
 * Method : GET
 * Desc : Get all the list of users in the system
 * Access : Public
 * Parameters : None
 */
router.get("/", (req,res) => {
    res.status(200).json({
        success : true,
        data : users
    })
})


/**
 * Route : users/:id
 * Method : GET
 * Desc : Get the user by their id
 * Access : Public
 * Parameters : id
 */
router.get("/:id",(req,res) => {

    const {id} = req.params;
    const user = users.find((each)=> each.id === id);

    if(!user){
        return res.status(404).json({
            success : false,
            message : `user ${id} not found`
        });
    };
    res.status(200).json({
        success : true,
        data : user
    });
});

/**
 * Route : users
 * Method : POST
 * Desc : create/register a new user
 * Access : Public
 * Parameters : none
 */
router.post("/",(req,res)=>{
    const {id, name, surname, email, subscriptionType, subscriptionDate} = req.body;

    if(!id || !name || !surname || !email || !subscriptionType || !subscriptionDate){
        return res.status(404).json({
            success : false,
            message : `please provide all the required fields`
        });
    };
    const user = users.find((each)=> each.id === id);

    //check if user already exists
    if(user){
        return res.status(404).json({
            success : false,
            message : `user already exists! with id : ${id}`
        });
    }

        users.push({
            id, name, surname, email, subscriptionType, subscriptionDate
        })
        res.status(201).json({
            success : true,
            message : `user added successfully!`
        });
});

/**
 * Route : users/:id
 * Method : PUT
 * Desc : updating user by their id
 * Access : Public
 * Parameters : id
 */
router.put("/:id",(req,res)=>{
    const {id} = req.params;
    const {data} = req.body;

    const user = users.find((each)=> each.id === id);

    if(!user){
        return res.status(404).json({
            success : false,
            message : `user ${id} not found`
        });
    };

    // Object.assign(user, data);

    const updatedUser = users.map((each)=>{
        if(each.id === id){
            return {
                ...each,
                ...data,
            }
        }
        return each;
    })
    res.status(200).json({
            success : true,
            data : updatedUser,
            message : `user ${id} updated successfully!`
        });
});

/**
 * Route : users/:id
 * Method : DELETE
 * Desc : deleting user by their id
 * Access : Public
 * Parameters : id
 */
router.delete("/:id", (req,res)=>{
    const {id} = req.params;
    const user = users.find((each)=> each.id === id);
    if(!user){
        return res.status(404).json({
            success : false,
            message : `user ${id} not found`
        });
    };
    const updatedUsers = users.filter((each)=> each.id != id);

    //2nd method

    // const index = users.indexOf(user);
    // users.splice(index, 1);

    if(!user){
        return res.status(200).json({
            success : true,
            data : updatedUsers,
            message : `user ${id} deleted successfully!`
        });
    };

});

/**
 * Route : users/subscription/:id
 * Method : GET
 * Desc : GET all the subscription datails of the user by their id
 * Access : Public
 * Parameters : id
 */
router.get("/subscription-details/:id", (req,res)=>{
    const {id} = req.params;
    const user = users.find((each)=> each.id === id);
    if(!user){
        return res.status(404).json({
            success : false,
            message : `user ${id} not found`
        });
    };


    //Extract the subscription details
    // const getDateInDays = ((date = " ") => {
    //     let date;
    //     if(date){
    //         date = new date(data);
    //     }else{
    //         date = new date();
    //     }
    //     let days =  Math.floor(date.getTime()/(1000 * 60 * 60 *24));
    //     return days;
    // });

    // Issues:

    // You declare date twice → function parameter (date) and inside let date;.
    // → ❌ Causes SyntaxError: Identifier 'date' has already been declared.

    // You use new date(...) instead of new Date(...) (capital D).

    // You reference data instead of date. data doesn’t exist here.




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


    //instead of if else -> directly using if statement
    // const subscriptionType = (date) => {
    // if(user.subscriptionType === "Basic") return date + 90;
    // if(user.subscriptionType === "Standard") return date + 180;
    // if(user.subscriptionType === "Premium") return date + 365;
    // return date;
    // };


    //   can also use switch statement    instead
    //     const subscriptionType = (date) => {
    // switch (user.subscriptionType) {
    //     case "Basic": return date + 90;
    //     case "Standard": return date + 180;
    //     case "Premium": return date + 365;
    //     default: return date; // or throw an error if invalid
    // }   
    // };

    //subscription expiration calculation
    //January 1, 1970 - milliseconds

    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);


    const data = {
        ...user,
        subscriptionExpired : subscriptionExpiration < currentDate,
        subscriptionDaysLeft : subscriptionExpiration - currentDate,
        daysLeftForExpiration : returnDate - currentDate,
        returnDate : returnDate  < currentDate ? "Book is Overdue"  : returnDate,
        fine : returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0
    }


     res.status(200).json({
            success : true,
            data : data
        });

});

module.exports = router;