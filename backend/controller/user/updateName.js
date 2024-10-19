const userModel = require("../../models/userModel");

async function changeUserName(req, res) {
  try {
    const sessionUser = req.userId; // The currently logged-in user
    const { newName } = req.body;

    console.log(newName)
    if (!newName) {
      throw new Error("Please provide the new name.");
    }

    // Update the user's name
    const user = await userModel.findByIdAndUpdate(
      sessionUser,
      { name: newName },
      { new: true }
    );

    res.status(200).json({
      message: "Name updated successfully.",
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

module.exports = changeUserName;
