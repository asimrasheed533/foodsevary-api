const cloudinary = require("cloudinary");

const cloudinaryConfig = cloudinary.v2;

function uploadImage(path, name) {
  try {
    cloudinaryConfig.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const res = cloudinaryConfig.uploader.upload(path, {
      public_id: name,
      overwrite: false,
    });

    res
      .then((data) => {
        console.log(data);
        // console.log(data.secure_url);
      })
      .catch((err) => {
        console.log(err);
      });

    const url = cloudinaryConfig.url(name, {
      Crop: "fill",
    });

    return url;
  } catch (err) {
    console.log(err);
  }
}

module.exports = uploadImage;
