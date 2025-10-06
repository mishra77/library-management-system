const { BookModel, UserModel } = require("../models/index");
const IssuedBook = require("../dtos/book-dto"); 

// const getAllBooks = () => {};

// const getsingleBookById = () => {};

// module.exports = {getAllBooks,getsingleBookById};


// router.get("/", (req,res) => {
//     res.status(200).json({
//         success : true,
//         data : books
//     });
// });
exports.getAllBooks = async (req, res) => {
    const books = await BookModel.find();

    if (books.length === 0){
        res.status(404).json({
         success : false,
         message : "No book found in the database"
    });
    }

    res.status(200).json({
        success : true,
        data : books
    });
};





// router.get("/", (req,res) => {

//     const {id} = req.params;
//     const book = books.find((each) => {each.id === id});

//     if(!book){
//         res.status(404).json({
//         success : false,
//         message : `book not found for id - ${id}`
//     });
//     }

//     res.status(200).json({
//         success : true,
//         data : book
//     });
// });
exports.getsingleBookById = async (req,res) => {
    const {id} = req.params;
     const book = await BookModel.findById(id);

     if(!book){
         return res.status(404).json({
         success : false,
         message : `book not found for id - ${id}`
     });
     }

     return res.status(200).json({
         success : true,
         data : book
     });
};




// router.get("/issued/for-users", (req,res) => {

//         // const issuedBooks = books.filter((each) => each.issued === true);

//         const userWithIssuedBooks = users.filter((each) => {
//             if(each.issuedBook){
//                 return each
//             }
//         })

//         const issuedBook = [];

//         userWithIssuedBooks.forEach((each) => {
//             const book = books.find((book) => book.id === each.issuedBook);


//             book.issuedBy = each.name;
//             book.issuedDate = each.issuedDate;
//             book.returnDate = each.returnedDate;

//             issuedBook.push(book);
//         })

//         if(!issuedBook){
//             res.status(404).json({
//             success : false,
//             message : `no books issued yet`
//         });
//         }

//         res.status(200).json({
//             success : true,
//             data : issuedBook
//         });

// });
exports.getAllIssuedBook = async (req,res) => {
    const users = await UserModel.find({
        issuedBook : {$exists : true}
    }).populate("issuedBook")

    const issuedBook = users.map((each)=>{
        return new IssuedBook(each);
    });

    if(issuedBook.length === 0){
       return  res.status(404).json({
            success : false,
            message : `no books issued yet`
    });
    }

    res.status(200).json({
            success : true,
            data : issuedBook
    });
};



// router.post("/",(req,res)=>{
//     const {id, name, author, genre, price , publisher} = req.body;

//     if(!id || !name || !author || !genre || !price || !publisher){
//         return res.status(404).json({
//             success : false,
//             message : `please provide all the required fields`
//         });
//     };
//     const book = books.find((each)=> each.id === id);

//     //check if book already exists
//     if(book){
//         return res.status(409).json({
//             success : false,
//             message : `book already exists! with id : ${id}`
//         });
//     }

//         books.push({
//             id, name, author, genre, price , publisher
//         })
//         res.status(201).json({
//             success : true,
//             message : `book added successfully!`
//         });
// });
exports.addNewBook = async (req, res) => {
    const {data} = req.body;

    if(!data ||  Object.keys(data).length === 0){
        return  res.status(404).json({
            success : false,
            message : `please provide data to add a new book`
    });
    }

    await BookModel.create(data);
    //to print particular book
    // res.status(201).json({
    //         success : true,
    //         message : "Book added successfully",
    //         data : data
    // });

    const allBooks = await BookModel.find();
            res.status(201).json({
            success : true,
            message : "Book added successfully",
            data : allBooks 
    });

}




//update book by id
//  router.put("/:id",(req,res)=>{
//      const {id} = req.params;
//      const {data} = req.body;

//      const book = books.find((each)=> each.id === id);

//      if(!book){
//          return res.status(404).json({
//              success : false,
//              message : `book ${id} not found`
//          });
//      };

//      // Object.assign(book, data);

//      const updatedBook = books.map((each)=>{
//          if(each.id === id){
//              return {
//                  ...each,
//                  ...data,
//              }
//          }
//          return each;
//      })
//      res.status(200).json({
//              success : true,
//              data : updatedBook,
//              message : `book ${id} updated successfully!`
//          });
//  });
exports.updateBookById = async (req, res) => {
    const {id} = req.params;
    const {data} = req.body;

    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            status : false,
            message : `plese provide the data to update`
        })
    }

    // //check if the book exists
    // const book = await BookModel.findById(id);
    // if(!book){
    //     return res.status(400).json({
    //         status : false,
    //         message : `book not found by the id : ${id}`
    //     })
    // }

    // //update the book details
    // Object.assign(book, data);
    // await book.save();

    // res.status(200).json({
    //     success : true,
    //     message : `Book updated successfully`,
    //     data : book
    // })

    // //2nd approach -> findByIdAndUpdate
    // const updateBook = await BookModel.findByIdAndUpdate(id, data);

        //3rd approach -> findOneAndUpdate()

        const updateBook =  await BookModel.findOneAndUpdate(
            {_id : id},
            data,
             {new : true}
        );

        if(!updateBook){
            return res.status(404).json({
                success : false,
                message : `Book not found for id : ${id}`
            })
        }

        res.status(200).json({
            success : true,
            message : `Book updated successfully`,
            data : updateBook
        });
};




// router.delete("/:id", (req,res)=>{
//     const {id} = req.params;
//     const book = books.find((each)=> each.id === id);
//     if(!book){
//         return res.status(404).json({
//             success : false,
//             message : `book ${id} not found`
//         });
//     };
//     const updatedBook = books.filter((each)=> each.id != id);

//     //2nd method

//     // const index = books.indexOf(book);
//     // users.splice(index, 1);

//     if(!user){
//         return res.status(200).json({
//             success : true,
//             data : updatedBooks,
//             message : `book deleted successfully!`
//         });
//     };

// });
exports.deleteBookById = async (req, res) => {
    const {id} = req.params;
    const book = await BookModel.findById(id);

     if(!book){
         return res.status(404).json({
         success : false,
         message : `book not found for id - ${id}`
     });
     }

     await BookModel.findByIdAndDelete(id);
        res.status(200).json({
            success : true,
            message : `book with the id : ${id} deleted successfully`
        });

};