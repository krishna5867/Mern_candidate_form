const User = require("../model/userModel");
const multerConfig = require("../utils/multer");

exports.createUser = [
  // multerConfig.validateFileCount, 
  multerConfig.upload,
  async (req, res) => {
    try {
      const { fname, lname, email, dob, residentalAddress, permanentAddress } = req.body;
      const files = req.files;

      if (!fname || !lname || !email || !dob || !residentalAddress) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const documents = [];
      for (const fileData of files) {
        const {
          originalname: fileName,
          mimetype: fileType,
          path: filePath,
        } = fileData;

        if (
          !["image/jpeg", "image/png", "application/pdf"].includes(fileType)
        ) {
          return res.status(400).json({
            message:
              "Filetype must be either 'image/jpeg', 'image/png', or 'application/pdf'",
          });
        }

        documents.push({
          fileName,
          fileType,
          documentFile: filePath,
        });
      }
      const user = new User({
        fname,
        lname,
        email,
        dob,
        residentalAddress,
        permanentAddress,
        documents,
      });

      const savedUser = await user.save();
      res
        .status(201)
        .json({ message: "User created successfully", user: savedUser });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length > 0) {
      res.status(200).json({
        message: "Users retrieved successfully",
        users,
      });
    } else {
      res.status(404).json({
        message: "No users found",
      });
    }
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
