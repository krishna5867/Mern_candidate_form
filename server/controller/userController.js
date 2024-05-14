const User = require("../model/userModel");
const multerConfig = require("../utils/multer");

exports.createUser = [
  // multerConfig.validateFileCount, 
  multerConfig.upload,
  async (req, res) => {
    try {
      const { fname, lname, email, dob, residentalStreet1, residentalStreet2, permanentStreet1, permanentStreet2 } = req.body;
      const files = req.files;
      console.log(req.body);

      if (!files || files.length < 2 || files.length > 5) {
        return res.status(400).json({ message: "Number of files should be between 2 and 5." });
      }
      const missingFields = [];

      // Check each required field
      if (!fname) missingFields.push("fname");
      if (!lname) missingFields.push("lname");
      if (!email) missingFields.push("email");
      if (!dob) missingFields.push("dob");
      if (!residentalStreet1 || !residentalStreet2) {
        missingFields.push("residentalAddress street");
      }
      if (missingFields.length > 0) {
        return res.status(400).json({ message: `Fields required: ${missingFields.join(', ')}` });
      }

      const documents = [];
      for (const fileData of files) {
        const {
          originalname: fileName,
          mimetype: fileType,
          path: filePath,
        } = fileData;

        if (!["image/jpeg", "image/png", "application/pdf"].includes(fileType)) {
          return res.status(400).json({
            message: "Filetype must be either 'image/jpeg', 'image/png', or 'application/pdf'",
          });
        }

        // Extracting fileType from mimetype
        const fileExtension = fileType.split('/')[1];
        const validFileTypes = ["jpeg", "jpg", "png", "pdf"];
        const validFileType = validFileTypes.includes(fileExtension);

        if (!validFileType) {
          return res.status(400).json({
            message: `Invalid file type: ${fileType}`,
          });
        }

        // Setting the fileType based on the fileExtension
        const mappedFileType = fileExtension === 'pdf' ? 'pdf' : 'image';

        documents.push({
          fileName,
          fileType: mappedFileType,
          documentFile: filePath,
        });
      }
      const user = new User({
        fname,
        lname,
        email,
        dob,
        residentalStreet1, residentalStreet2, permanentStreet1, permanentStreet2,
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
