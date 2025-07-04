import User from '../models/user.model.js';

export const signup = async (req,res) => {
    const { fullName , email , password } = req.body;

    try{
        if(!fullName || !email || !password){
            console.log("All fields required");
            return res.status(400).json({
                messege: "All fields required",
            })
        }
        if(password.length < 6){
            return res.status(400).json({messege: "Password length must be 6 characters"});
        }

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({messege: "Email already exists"});
        }

        const newUser = new User({
            fullName,
            password,
            email,
        });

        if(newUser){
            await newUser.save(); // saving to database

            // return json
            res.status(201).json({
                _id: newUser._id, // _id created by mongoDB
                fullName: newUser.fullName,
                password: newUser.password,
                email: newUser.email,
            });
        }
        else{
            res.status(400).json({
                messege:"Internal Server Error",
            })
        }

    } catch(error){
        console.log("Error in Signup controller:",error.messege);
    }
};

export const login = async (req,res) => {
    const { email, password } = req.body;
    try{
        if(!email || !password){
            return res.status(400).json({ messege: "All fields required"});
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({messege:"User not found"});
        }

        const isPasswordCorrect = password === user.password;
        if(!isPasswordCorrect){
            return res.status(400).json({messege:"Incorrect Password"});
        }

        // return json
        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
        });
    } catch(error){
        console.log("Error in Login controller:",error.messege);
    }
};

export const logout = (req,res) => {
    // pending




    
};