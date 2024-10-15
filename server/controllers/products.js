import User from "../models/User.js";
import Product from "../models/Product.js";

/*CREATE*/
export const createProduct = async (req, res) => {
  try {
    const {
      userId,
      name,
      description,
      price,
      quantity,
      minQuantity,
      reorderPoint,
      maxQuantity,
      category,
      status,
    } = req.body;
    const user = await User.findById(userId);
    console.log("inside try");
    const newProduct = new Product({
      userId,
      name,
      description,
      price,
      quantity,
      minQuantity,
      reorderPoint,
      maxQuantity,
      status,
      category,
      bookings: {},
    });
    await newProduct.save();
    console.log("Saved Product");

    const product = await Product.find(); //grabs all the Products and display it on frontend
    res.status(201).json(product);
  } catch (err) {
    console.error(err.stack);
    res.status(409).json({ message: err.message });
  }
};

/*READ*/

export const getFeedProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "quantity";
    let category = req.query.category || "All";
    let status = req.query.status || "All";
    let name = req.query.name || "";

    // Fetch distinct themes from the database
    const categoryOptions = await Product.distinct("category");
    const statusOptions = await Product.distinct("status");
    // If theme is "All", include all theme options, otherwise split the provided theme string
    category === "All"
      ? (category = [...categoryOptions])
      : (category = req.query.category.split(","));

    status === "All"
      ? (status = [...statusOptions])
      : (status = req.query.status.split(","));

    // Split and parse the sort parameter
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    // Construct the filter object for MongoDB query
    let filter = {
      category: { $in: category },
    };

    if (status) {
      filter.status = { $in: status };
    }
    // Add name filter if name is provided
    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    // Query products with search, theme filter, sorting, pagination
    const products = await Product.find(filter)
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    // Count total matching documents for pagination
    const total = await Product.countDocuments(filter);

    // Prepare response object
    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      category: categoryOptions,
      status: statusOptions,
      products,
    };

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOne({ _id: productId }); // assuming productId corresponds to MongoDB _id
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getUserProducts = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch distinct themes from the database
    const categoryOptions = await Product.distinct("category");

    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "quantity";
    let category = req.query.category || "All";
    let name = req.query.name || "";

    // If theme is "All", include all theme options, otherwise split the provided theme string
    category === "All"
      ? (category = [...categoryOptions])
      : (category = req.query.category.split(","));

    // Split and parse the sort parameter
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    // Construct the filter object for MongoDB query
    let filter = {
      category: { $in: category },
      userId: userId, // Filter products by userId
    };

    // Add location filter if location is provided
    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    // Query products with search, theme filter, sorting, pagination
    const products = await Product.find(filter)
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    // Count total matching documents for pagination
    const total = await Product.countDocuments(filter);

    // Prepare response object
    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      category: categoryOptions,
      products,
    };

    // Send response
    res.status(200).json(response);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/*DELETE*/
export const deleteProduct = async (req, res) => {
  try {
    const { productId, userId } = req.params; // Assuming userId is passed as a parameter
    // Alternatively, you can use req.query or req.body depending on how userId is passed

    // Find the product by ID
    const product = await Product.findById(productId);

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the user is the owner of the product
    if (product.userId !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this product" });
    }

    // Delete the product
    await Product.findByIdAndDelete(productId);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* UPDATE */
export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params; // Extract product ID from request parameters
    const updates = req.body; // Extract updated product details from request body

    // Find the product by ID
    const product = await Product.findById(productId);

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    // Check if the logged-in user is the owner of the product

    // Update product details with the provided updates
    Object.assign(product, updates);

    // Save the updated product
    await product.save();

    res
      .status(200)
      .json({ message: "Product details updated successfully", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* UPDATE */

export const BookProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const isBooked = product.bookings.get(userId);

    if (isBooked) {
      // User is already booked, so remove the booking
      product.bookings.delete(userId);
    } else {
      // User is not booked, so add the booking
      product.bookings.set(userId, true);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { bookings: product.bookings },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBookedProducts = async (req, res) => {
  try {
    const { userId } = req.params;

    const page = parseInt(req.query.page, 10) - 1 || 0;
    const limit = parseInt(req.query.limit, 10) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "quantity";
    let category = req.query.category || "All";
    let status = req.query.status || "All";
    let name = req.query.name || "";

    // Fetch distinct themes from the database
    const categoryOptions = await Product.distinct("category");
    const statusOptions = await Product.distinct("status");
    // If theme is "All", include all theme options, otherwise split the provided theme string
    category === "All"
      ? (category = [...categoryOptions])
      : (category = req.query.category.split(","));

    status === "All"
      ? (status = [...statusOptions])
      : (status = req.query.status.split(","));

    // Split and parse the sort parameter
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }
    // Construct the filter object for MongoDB query
    let filter = {
      [`bookings.${userId}`]: true, // Check if userId exists in the bookings map
    };

    if (category.length > 0) {
      filter.category = { $in: category };
    }
    if (status) {
      filter.status = { $in: status };
    }
    // Add name filter if name is provided
    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    // Query products with search, theme filter, sorting, pagination
    const products = await Product.find(filter)
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    // Count total matching documents for pagination
    const total = await Product.countDocuments(filter);

    // Prepare response object
    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      category: categoryOptions,
      status: statusOptions,
      products,
    };

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
