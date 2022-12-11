const Upload = (UploadImg) => {
  return new Promise((resolve, reject) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", UploadImg);
    formData.append("upload_preset", "vitamim");
    axios
      .post("https://api.cloudinary.com/v1_1/vitamim/image/upload", formData)
      .then((res) => {
        setLoading(false);
        resolve(res.data.url);
      });
  });
};

export default Upload;
