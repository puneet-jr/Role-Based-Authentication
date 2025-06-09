import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { authorizedRoles } from '../middlewares/roleMiddleware.js';

const router = express.Router();


// only admin can access
router.get('/admin', verifyToken,authorizedRoles("admin") ,(req, res) => {
    // Logic to check if user is admin
    res.status(200).json({ message: 'Admin access granted' });
});

// Both admin and manager can access

router.get("/manager", verifyToken, authorizedRoles(["manager", "admin"]), (req, res) => {
    // Logic to check if user is admin or manager
    res.status(200).json({ message: 'Manager access granted' });
});


// All can access

router.get("/user",verifyToken, authorizedRoles(["manager", "admin","user"]),(req,res)=>{
    res.status(200).json({message:"User access granted"});
});

export default router;