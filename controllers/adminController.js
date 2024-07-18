import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";;
import { Admin } from '../models/adminSchema.js';
import ErrorHandler from "../middlewares/error.js";
import cloudinary from 'cloudinary';

export const getAllProjects = catchAsyncErrors(async (req, res, next) => {
    const AllProjects = await Admin.find({});
    res.status(200).json({
        success: true,
        AllProjects
    })
})

export const postProject = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;
    if (role === "normal") {
        return next(
            new ErrorHandler("You are not allowed to access this resource", 400)
        );
    };

    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Project image File Required!", 400));
    }

    const { projectIcon } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(projectIcon.mimetype)) {
        return next(
            new ErrorHandler("Invalid file type. Please upload a PNG file.", 400)
        );
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
        projectIcon.tempFilePath
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
            "Cloudinary Error:",
            cloudinaryResponse.error || "Unknown Cloudinary error"
        );
        return next(new ErrorHandler("Failed to upload project image to Cloudinary", 500));
    }

    const {
        title,
        subTitle,
        description,
        category,
        technology
    } = req.body;

    if (
        !title ||
        !subTitle ||
        !description ||
        !category ||
        !technology||
        !projectIcon 
      ) {
        return next(new ErrorHandler("Please fill all fields.", 400));
    }
    const project = await Admin.create({
        title,
        subTitle,
        description,
        category,
        technology,
        projectIcon: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });
    res.status(200).json({
        success: true,
        message: "Project Submitted!",
        project,
    });
})

export const updateProject = catchAsyncErrors(async(req, res, next) => {

    const { role } = req.user;
    if(role === "normal"){
        return next(
            new ErrorHandler("You are not allowed to access this resource", 400)
        );
    };

    const { id } = req.params;
    let project = await Admin.findById(id);
    if(!project){
        return next(new ErrorHandler("OOPS, Project not found!", 404));
    };

    project = await Admin.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
      res.status(200).json({
        success: true,
        message: "Project Updated!",
      });
});

export const deleteProject = catchAsyncErrors(async(req, res, next) => {
    const { role } = req.user;
    if(role === "normal"){
        return next(
            new ErrorHandler("You are not allowed to access this resource", 400)
        );
    };

    const { id } = req.params;
    let project = await Admin.findById(id);
    if(!project){
        return next(new ErrorHandler("OOPS, Project not found!", 404));
    };
    await project.deleteOne();
    res.status(200).json({
        success:true,
        message:"Project deleted"
    });  
});

export const getSingleProject = catchAsyncErrors(async(req, res, next) => {
    const { id } = req.params;
    try {
        const project = await Admin.findById(id);
        if(!project){
            return next(new ErrorHandler("Project not found",400 ));
        };
        res.status(200).json({
            success:true,
            project,
        });
    } catch (error) {
        return next(new ErrorHandler(`Invalid ID / CastError`, 404));
    }
})
