const express=require("express");
const router = express.Router();

const  {getUsers,updateUser,deleteUser} = require("../handlers/users");

router.get('/',getUsers);
router.put('/',updateUser);
// router.post('/signin',signin);
router.delete('/:id',deleteUser);



module.exports = router;