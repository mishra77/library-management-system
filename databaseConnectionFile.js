const mongoose = require("mongoose");

function DbConnection()  {

    const DB_url = process.env.MONGO_URI;

    mongoose.connect(DB_url , {
        useNewUrlParser : true,
        useUnifiedTopology : true
    });

    const db  = mongoose.connection;

    db.on("error" , console.error.bind(console,  "connection error"));

    db.once("open" ,  function(){
        console.log("DB connected...");
    });
};




module.exports = DbConnection;


//latest version
// const mongoose = require("mongoose");

// function DbConnection() {
//     const DB_url = process.env.MONGO_URI;

//     mongoose.connect(DB_url)
//         .then(() => console.log("DB connected..."))
//         .catch((err) => console.error("DB connection error:", err));
// }

// module.exports = DbConnection;
