import  jwt from "jsonwebtoken";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";


// export const adminLogin = async (req,res) =>{
//     try {
//         const { email ,password } =req.body;
//         if(email !== process.env.ADMIN_EMAIL || password!==process.env.ADMIN_PASSWORD ){
//             return res.json({success:false ,message:"Invalid credentials"})
//         }
//         const token=jwt.sign({email},process.env.JWT_SECRET);
//         res.json({success:true,token});
//     } catch (error) {
//         res.json({success:false,message:error.message});
//     }
// }


export const adminSignup=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const existingAmin=await Admin.findOne({email});
        if(existingAmin){
            return res.json({success:false,message:"Admin already exits"});
        }
        const hashed=await bcrypt.hash(password,10);
        const newAdmin=await Admin.create({email,password:hashed});
        const token =jwt.sign({id:newAdmin._id},process.env.JWT_SECRET,{expiresIn:"7d",});
        return res.status(201).json({
            success:true,
            message:"Registred Successfully",
            token,
            user:{
                id:newAdmin._id,
                email:newAdmin.email,
            },
        })
    } catch (error) {
        return res.json({success:false,message:error.message});
    }
};

export const getAllBlogsAdmin= async (req,res)=>{
    try {
        const blogs=await Blog.find({}).sort({createdAt:-1});
        res.json({success:true,blogs});
        
    } catch (error) {
        res.json({success:false,message:error.message});
    }
}


export const getAllComments=async(req,res)=>{
    try {
        const comments=await Comment.find({}).populate("blog").sort({createdAt:-1});
        res.json({success:true,comments});

    } catch (error) {
        res.json({success:false,message:error.message});
    }
}

export const getDashboard = async(req,res) =>{
    try {
        const recentBlogs=await Blog.find({}).sort({createdAt:-1}).limit(5);
        const blogs=await Blog.countDocuments();
        const comments=await Comment.countDocuments();
        const drafts=await Blog.countDocuments({isPublished:false});

        const dashboardData={
            blogs,comments,drafts,recentBlogs
        }
        res.json({success:true,dashboardData});

    } catch (error) {
        res.json({success:false,message:error.message});
        
    }
}

export const deleteCommentById=async (req,res)=>{
    try {
        const {id}=req.body;
        await Comment.findByIdAndDelete(id);
        res.json({success:true,message:"Comment deleted successfully"})
    } catch (error) {
        res.json({success:false,message:error.message});
    }
}

export const approveCommentById=async (req,res)=>{
    try {
        const {id}=req.body;
        await Comment.findByIdAndUpdate(id,{isApproved:true});
        res.json({success:true,message:"Comment approved successfully"})
    } catch (error) {
        res.json({success:false,message:error.message});
    }
}

export const adminLogin=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const admin=await Admin.findOne({email});
        if(!admin){
            return res.json({success:false,message:"Admin not Found"});
        }
        const isMatch=await bcrypt.compare(password,admin.password);
        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"});
        }
        const token =jwt.sign({id:admin._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.json({
            success:true,
            token,
            user:{
                id:admin._id,
                email:admin.email,
            },
        });
    }catch(e){
        res.json({success:false,message:error.message});
    }

};