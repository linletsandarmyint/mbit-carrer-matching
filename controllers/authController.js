 const User = require("../models/User");

 // Simple Register API
 exports.register = async (req, res) => {
   try {
     console.log("BODY:", req.body); // 👈 DEBUG LINE

     const { name, email, password, role } = req.body;

     // Check if user already exists
     const existingUser = await User.findOne({ email });
     if (existingUser) {
       return res.status(400).json({ message: "User already exists" });
     }

     // Create user
     const user = await User.create({
       name,
       email,
       password,
       role,
     });

     res.status(201).json({
       message: "User registered successfully",
       user,
     });
   } catch (error) {
    
     res.status(500).json({ message: error.message });
   }
 };

