const cloudinary = require("../config/cloundinary");
const streamifier = require("streamifier");

const uploadToCloudinary = (
  fileBuffer,
  resourceType = "image"
) => {
  return new Promise((resolve, reject) => {
    const uploadStream =
      cloudinary.uploader.upload_stream(
        {
          folder: "futureNest",
          resource_type: resourceType,
        },
        (error, result) => {
          if (error) return reject(error);

          resolve(result);
        }
      );

    streamifier
      .createReadStream(fileBuffer)
      .pipe(uploadStream);
  });
};

module.exports = uploadToCloudinary;