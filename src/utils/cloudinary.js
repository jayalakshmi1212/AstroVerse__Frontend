// const uploadImageToCloudinary = async (file) => {
//   const REACT_APP_UPLOAD_PRESET = "jayalakshmi";
//   const REACT_APP_CLOUD_NAME = "dwv9coxek";
//   const uploadData = new FormData();
//   uploadData.append("file", file);
//   uploadData.append("upload_preset", REACT_APP_UPLOAD_PRESET);
//   uploadData.append('cloud_name', REACT_APP_CLOUD_NAME)


//   const res = await fetch(`https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/image/upload`,{
//     method: "post",
//     body: uploadData,
// })
// console.log(res,'kjfjhjfh')

//   if (!res.ok) {
//     throw new Error("Image upload failed");
//   }

//   const data = await res.json();
//   console.log(data, "cloudinary data");
//   return data; // Returns the uploaded image's data
// };

// export default uploadImageToCloudinary;
const uploadImageToCloudinary = async (file) => {
  const REACT_APP_UPLOAD_PRESET = "jayalakshmi";
  const REACT_APP_CLOUD_NAME = "dwv9coxek";
  
  // Check if the file is an image or a video
  const isVideo = file.type.startsWith("video/");
  const endpoint = isVideo
    ? `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/video/upload`
    : `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/image/upload`;

  const uploadData = new FormData();
  uploadData.append("file", file);
  uploadData.append("upload_preset", REACT_APP_UPLOAD_PRESET);
  uploadData.append("cloud_name", REACT_APP_CLOUD_NAME);

  // Send the file to Cloudinary
  const res = await fetch(endpoint, {
    method: "POST",
    body: uploadData,
  });

  if (!res.ok) {
    throw new Error(`${isVideo ? "Video" : "Image"} upload failed`);
  }

  const data = await res.json();
  console.log(`${isVideo ? "Video" : "Image"} uploaded successfully:`, data);
  return data; // Returns the uploaded image/video data
};

export default uploadImageToCloudinary;
