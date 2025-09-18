const express = require("express");
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");

const router = express.Router(); 

/**
 * Route : /books
 * Method : GET
 * Desc : Get all the list of books in the system
 * Access : Public
 * Parameters : None
 */
router.get("/", (req,res) => {
    res.status(200).json({
        success : true,
        data : books
    });
});

/**
 * Route : /books/:id
 * Method : GET
 * Desc : Get a book by IDin the system
 * Access : Public
 * Parameters : id
 */
router.get("/", (req,res) => {

    const {id} = req.params;
    const book = books.find((each) => {each.id === id});

    if(!book){
        res.status(404).json({
        success : false,
        message : `book not found for id - ${id}`
    });
    }

    res.status(200).json({
        success : true,
        data : book
    });
});


/**
 * Route : books
 * Method : POST
 * Desc : register a new book
 * Access : Public
 * Parameters : none
 */
router.post("/",(req,res)=>{
    const {id, name, author, genre, price , publisher} = req.body;

    if(!id || !name || !author || !genre || !price || !publisher){
        return res.status(404).json({
            success : false,
            message : `please provide all the required fields`
        });
    };
    const book = books.find((each)=> each.id === id);

    //check if book already exists
    if(book){
        return res.status(409).json({
            success : false,
            message : `book already exists! with id : ${id}`
        });
    }

        books.push({
            id, name, author, genre, price , publisher
        })
        res.status(201).json({
            success : true,
            message : `book added successfully!`
        });
});

/**
 * Route : books/:id
 * Method : PUT
 * Desc : updating book by their id
 * Access : Public
 * Parameters : id
 */
 router.put("/:id",(req,res)=>{
     const {id} = req.params;
     const {data} = req.body;

     const book = books.find((each)=> each.id === id);

     if(!book){
         return res.status(404).json({
             success : false,
             message : `book ${id} not found`
         });
     };

     // Object.assign(book, data);

     const updatedBook = books.map((each)=>{
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
             data : updatedBook,
             message : `book ${id} updated successfully!`
         });
 });


////2nd approach
// router.put("/:id",(req,res)=>{
//     const {id} = req.params;
//     const {name, author, genre, price , publisher} = req.body;

//     const book = books.find((each)=> each.id === id);

//     if(!book){
//         return res.status(404).json({
//             success : false,
//             message : `book ${id} not found`
//         });
//     };

//     //updating book details
//     book.name = name;
//     book.author = author;
//     book.genre = genre;
//     book.price = price;
//     book.publisher = publisher; 

//      res.status(200).json({
//             success : true,
//             data : book,
//             message : `book ${id} updated successfully!`
//         });
// });


/**
 * Route : books/:id
 * Method : DELETE
 * Desc : deleting a book by their id
 * Access : Public
 * Parameters : id
 */
router.delete("/:id", (req,res)=>{
    const {id} = req.params;
    const book = books.find((each)=> each.id === id);
    if(!book){
        return res.status(404).json({
            success : false,
            message : `book ${id} not found`
        });
    };
    const updatedBook = books.filter((each)=> each.id != id);

    //2nd method

    // const index = books.indexOf(book);
    // users.splice(index, 1);

    if(!user){
        return res.status(200).json({
            success : true,
            data : updatedBooks,
            message : `book deleted successfully!`
        });
    };

});


/**
 * Route : /books/issued/for-users
 * Method : GET
 * Desc : Get all the issued books in the system
 * Access : Public
 * Parameters : None
 */
router.get("/issued/for-users", (req,res) => {

        // const issuedBooks = books.filter((each) => each.issued === true);

        const userWithIssuedBooks = users.filter((each) => {
            if(each.issuedBook){
                return each
            }
        })

        const issuedBook = [];

        userWithIssuedBooks.forEach((each) => {
            const book = books.find((book) => book.id === each.issuedBook);


            book.issuedBy = each.name;
            book.issuedDate = each.issuedDate;
            book.returnDate = each.returnedDate;

            issuedBook.push(book);
        })

        if(!issuedBook){
            res.status(404).json({
            success : false,
            message : `no books issued yet`
        });
        }

        res.status(200).json({
            success : true,
            data : issuedBook
        });

});





module.exports = router;