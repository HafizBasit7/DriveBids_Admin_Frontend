export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    console.log("Uploading Image:", file.name);

    const response = await fetch("https://srv694651.hstgr.cloud/storage/upload", {
      method: "POST",
      headers: {
        "x-api-key": "ayzenn09876@", 
      },
      body: formData,
    });

    const data = await response.json();
    console.log("Upload Response:", data);

    if (response.ok && data.fileUrl) {
      return data.fileUrl; 
    } else {
      throw new Error(data.message || "Image upload failed.");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

export const uploadVideo = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    console.log("Uploading Video:", file.name);

    const response = await fetch("https://srv694651.hstgr.cloud/storage/upload", {
      method: "POST",
      headers: {
        "x-api-key": "ayzenn09876@", 
      },
      body: formData,
    });

    const data = await response.json();
    console.log("Upload Response:", data);

    if (response.ok && data.fileUrl) {
      return data.fileUrl; 
    } else {
      throw new Error(data.message || "Video upload failed.");
    }
  } catch (error) {
    console.error("Error uploading video:", error);
    return null;
  }
};
