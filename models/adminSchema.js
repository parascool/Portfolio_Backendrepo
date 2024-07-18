import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title."],
        minLength: [3, "Title must contain at least 3 Characters!"],
        maxLength: [30, "Title cannot exceed 30 Characters!"],
      },
    subTitle: {
        type: String,
        required: [true, "Please provide a sub title."],
        minLength: [3, "Title must contain at least 3 Characters!"],
        maxLength: [30, "Title cannot exceed 30 Characters!"],
      },
      description: {
        type: String,
        required: [true, "Please provide decription."],
        minLength: [30, "Description must contain at least 30 Characters!"],
        maxLength: [1000, "Description cannot exceed 500 Characters!"],
      },
      category: {
        type: String,
        required: [true, "Please provide a category."],
      },
      technology: {
        type: Array,
        required: [true, "Please provide technolohies used in this application."],
      },
      projectIcon: {
        public_id: {
          type: String, 
          required: true,
        },
        url: {
          type: String, 
          required: true,
        },
      },
})

export const Admin = mongoose.model("Admin", adminSchema);