"use client";
import React from "react";
import axios from "axios";

export default function Test() {
  const [image, setImage] = React.useState<string>("");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file");

    if (!file) {
      console.log("No file uploaded.");
      return;
    }

    try {
      const response = await axios.post("/api/image", formData);
      console.log(response.data);
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };

  const onClick = async () => {
    const response = await axios.get("/api/image?id=5h8dt9gX1aLb59C03tK2Xn");
    setImage(response.data.imageUrl);
    console.log(response);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form method="post" encType="multipart/form-data" onSubmit={onSubmit}>
        <input type="file" name="file" accept="image/*" required />
        <button type="submit">Submit</button>
      </form>
      <button onClick={onClick}>Get Image</button>
      {image && <img src={image} alt="Uploaded" height="640px" width="480px" />}
    </div>
  );
}
