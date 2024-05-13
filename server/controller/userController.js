const User = require("../model/userModel");
const multerConfig = require("../utils/multer")

exports.createUser = [multerConfig.upload.array("files", 5), async (req, res) => {
    try {
            const { fname, lname, email, dob, residentalAddress, permanentAddress } = req.body;
            const files = req.files;
            // console.log(files);

            if (!(fname && lname && email && dob)) {
                return res.status(400).json({ message: "All fields required" });
            }

            if (!files || files.length < 2 || files.length > 5) {
                return res.status(400).json({ message: "You must upload between 2 and 5 files" });
            }

            const documents = [];
            for (const file of files) {
                const { filename: fileName, mimetype: fileType, path: filePath } = file;

                if (!['image/jpeg', 'image/png', 'application/pdf'].includes(fileType)) {
                    return res.status(400).json({ message: "Filetype must be either 'image/jpeg', 'image/png', or 'application/pdf'" });
                }

                documents.push({
                    fileName,
                    fileType,
                    file: filePath,
                });
            }
            const user = new User({
                fname,
                lname,
                email,
                dob,
                residentalAddress,
                permanentAddress,
                documents
                // documents: [{
                //     fileName,
                //     fileType,
                //     file: filePath,
                // }]

            });

            await user.save();
            res.status(201).json({ message: "User created successfully", user });
        }
      catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }]

    exports.getUsers = async (req, res) => {
        try {
            const users = await User.find();
            if (users.length > 0) {
                res.status(200).json({
                    message: "Users retrieved successfully",
                    users
                });
            } else {
                res.status(404).json({
                    message: "No users found"
                });
            }
        } catch (error) {
            console.error("Error retrieving users:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    };
