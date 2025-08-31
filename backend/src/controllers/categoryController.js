import Category from "../models/Category.js";


// get details of all categories
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
    console.log("All categories details fetched successfully");
  } 
  catch (err) {
    next(err); 
  }
};

// add new category details
export const createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
    console.log("new Category details added successfully");
  } 
  catch (err) { 
    next(err); 
  }
};
