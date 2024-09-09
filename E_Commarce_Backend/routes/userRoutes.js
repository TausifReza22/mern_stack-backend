import express from 'express';
import { createUser, getAllUsers, getUserByEmail, updateUserByEmail, deleteUserByEmail } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', createUser);
router.get('/getAllUsers', getAllUsers);

router.get('/getUser/By/email', getUserByEmail);
// router.get('/getUser/By/:email', getUserByEmail);    // using for parmas.

router.put('/updateUser/By/email', updateUserByEmail);
router.delete('/deleteUser/By/email', deleteUserByEmail);

export default router;