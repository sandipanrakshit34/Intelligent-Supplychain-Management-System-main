import User from "../models/User.js";
/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

/* UPDATE USER DETAILS */
export const updateUserDetails = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the user ID is passed in the request params
    const updates = req.body; // Assuming the updated user details are sent in the request body

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details with the provided updates
    Object.assign(user, updates);
    await user.save();

    res
      .status(200)
      .json({ message: "User details updated successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
