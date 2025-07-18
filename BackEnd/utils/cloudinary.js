import {v2 as Cloudinary} from Cloudinary;
require("dotenv").config();


 Cloudinary.config({
    cloudName:process.env.CLOUDNARY_CLOUD_NAME,
    API_KEY:process.env.CLOUDNARY_API_KEY,
    API_SECRET_KEY:process.env.CLOUDNARY_SECRET_KEY
 });

 export default Cloudinary;