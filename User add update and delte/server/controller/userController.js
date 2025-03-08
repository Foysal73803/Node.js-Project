import User from"../model/userModel.js";

////////////////////create user
export const createuser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const { email } = newUser;
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists."});
        }
        const savedData = await newUser.save();
        //res.status(200).json(savedData);
        res.status(200).json({ message: "User created successfully.", savedData});
      } catch (error) {
        let {name, email, address} = req.body;
        if(!name && !email && !address){
            return res.status(400).json({message:"Please prpvide your name email and password"});
        }
        if(!name && !address){
            return res.status(400).json({message:"Please provide your name and address"});
        }
        else if(!name && !email){
            return res.status(400).json({message:"please provide your name and email"});
        }
        else if(!name){
            return res.status(400).json({message:"please provide your name"});
        }
        else if(!email && !address){
            return res.status(400).json({message:"please provide your email and address"});
        }
        if(!address){
            return res.status(400).json({message:"please provide your address"});
        }
        if(!email){
            return res.status(400).json({message:"please provide your email"});
        }
        res.status(500).json({errorMessage: error.message});
    }
};

///////////////// show all user
export const getAllUsers = async (req, res) => {
    try {
        const userData = await User.find();
        if(!userData || userData.length === 0){
        return res.status(404).json({message: "User data not found"});
        }
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
};

/////////////// show user per id
export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
        return res.status(404).json({message: "User not found."}); 
        }
        res.status(200).json(userExist);
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
};

//////////////// update user per id
export const updateUser = async(req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
        return res.status(404).json({message: "User not found"});
        }
        const updatedata = await User.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.status(200).json({message: "User updated successfully", updatedata});
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
};

/////////////////// delete user per id
export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
        return res.status(404).json({message: "User not found"});
        }
        const deleteId =  await User.findByIdAndDelete(id);
        res.status(200).json({message: "User deleted successfully", deleteId});
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
};