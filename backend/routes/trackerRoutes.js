const express =
require("express");

const router =
express.Router();

const{

addReadingSession,

getReadingSessions,

deleteReadingSession,

}=require(
"../controllers/trackerController"
);

const{
protect,
}=require(
"../middleware/authMiddleware"
);

router.use(protect);

router.get(
"/",
getReadingSessions
);

router.post(
"/",
addReadingSession
);

router.delete(
"/:id",
deleteReadingSession
);

module.exports=
router;