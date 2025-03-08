import userModels from "../models/userModels.js";

////register
export const registerController = async (req, res, next) => {
        const {name, email, password} = req.body;

        if(!name && !email && !password){
          next("Please prpvide your name email and password");
        }
        if(!name){
          next("please name is requierd");
        }
        else if(!email && !password){
          next("Please provide your password and email");
        }
        if(!email){
            next("please email is required");
        };
        if(!password.length > 6){
            next("please password is required and grater than 6 character");
        }else if(!name || !email){
          next("please provide your name and email");
        }

        const exisitingUser = await userModels.findOne({email});
        if(exisitingUser){
          res.status(400).json({message: "Email is already register please try again"});
        } 

        const user = await userModels.create({name, email, password});
        //token
        const token = user.createJWT(); 
        res.status(201).send({
            success:true,
            message:"User created successfully",
            user:{  
              name: user.name,
              lastName: user.lastName,
              email: user.email,
              location: user.location,
            },
            token,
        });
};

///login
export const loginController = async (req, res, next) => {
  const {email, password} = req.body
  //validation
  if(!email || !password){
    next("Please Provide All Fields");
  }
  //find user by email
  const user = await userModels.findOne({email}).select("+password")
  if(!user){
    next("Invalid Username or password");
  } 
  //compare password
  const isMatch = await user.comparePassword(password);
  if(!isMatch){
    next("Invalid username or password");
  }
  user.password = undefined;
  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message:"Login Successfully",
    user,
    token,
  })
};