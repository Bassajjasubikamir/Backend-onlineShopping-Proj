const express = require("express")
const router = express.Router()
const usersController = require("../controllers/user")

//routes setup
router.get('/', usersController.getAllUsers);
router.post('/', usersController.createUser);
router.get('/:id', usersController.getOneUser);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUsers);

module.exports = router