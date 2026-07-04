const ReadingSession =
require("../models/ReadingSession");

const Book =
require("../models/Book");

/* ===========================
   Add Reading Session
=========================== */

const addReadingSession =
async (req,res)=>{

try{

const{

book,

date,

startPage,

endPage,

minutesRead,

mood,

notes,

}=req.body;

const pagesRead =
Number(endPage)-
Number(startPage);

const session =
await ReadingSession.create({

userId:req.user._id,

book,

date,

startPage,

endPage,

pagesRead,

minutesRead,

mood,

notes,

});

await Book.findByIdAndUpdate(

book,

{

currentPage:endPage,

},

);

res.status(201).json(session);

}

catch(error){

res.status(500).json({

message:error.message,

});

}

};

/* ===========================
   Get Reading Sessions
=========================== */

const getReadingSessions =
async(req,res)=>{

try{

const sessions =
await ReadingSession.find({

userId:req.user._id,

})

.populate(

"book",

"title author coverImage totalPages"

)

.sort({

date:-1,

});

res.json(sessions);

}

catch(error){

res.status(500).json({

message:error.message,

});

}

};

/* ===========================
   Delete
=========================== */

const deleteReadingSession =
async(req,res)=>{

try{

const session =
await ReadingSession.findOne({

_id:req.params.id,

userId:req.user._id,

});

if(!session){

return res.status(404).json({

message:"Session not found",

});

}

await session.deleteOne();

res.json({

message:"Deleted",

});

}

catch(error){

res.status(500).json({

message:error.message,

});

}

};

module.exports={

addReadingSession,

getReadingSessions,

deleteReadingSession,

};