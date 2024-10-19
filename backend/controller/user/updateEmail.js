const userModel = require("../../models/userModel");

async function changeUserEmail(req, res) {
  try {
    const sessionUser = req.userId; // The currently logged-in user
    const { newEmail } = req.body;

    if (!newEmail) {
      throw new Error("Please provide the new email.");
    }

    // Check if the new email already exists
    const emailExists = await userModel.findOne({ email: newEmail });

    if (emailExists) {
      throw new Error("This email is already in use.");
    }

    // Update the user's email
    const user = await userModel.findByIdAndUpdate(
      sessionUser,
      { email: newEmail },
      { new: true }
    );

    res.status(200).json({
      message: "Email updated successfully.",
      data: user,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
}

module.exports = changeUserEmail;
