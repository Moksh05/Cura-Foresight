import React, { useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { toast } from "react-toastify";

const Upload = () => {
  const [loading, setLoading] = useState(false);
  const [desc, setDesc] = useState("");
  const [pdf, setPdf] = useState(null);
  const [pdfname, setPdfname] = useState("");
  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    if (file) {
      setPdfname(file.name);
    }
    setPdf(file);
  };
  const handleInputChange = (e) => {
    setDesc(e.target.value);
  };
  const SubmitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("filename", pdf);
      formData.append("description", desc);
      console.log(formData);
      const res = await fetch("http://localhost:5000/api/v1/upload/file", {
        method: "post",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const message = await res.json();
      setLoading(false);
      toast.success("File Uploaded successfully!");
      //   console.log(message);
      if (!res.ok) {
        throw new Error(message);
      }
    } catch (err) {
      toast.error("Failed to Upload.");
      console.log(err);
    }
  };
  return (
    <form onSubmit={SubmitHandler}>
      <div className="mb-5">
        <input
          className="w-full pr-4 px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
          type="text"
          placeholder="File Description"
          name="file_desc"
          value={desc}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-5">
        <input
          className="w-full pr-4 px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
          type="file"
          placeholder="File"
          name="file"
          accept="application/pdf"
          onChange={handlePdfUpload}
          required
        />
      </div>
      <button type="submit" className="btn rounded-[50px]">
        {loading ? <HashLoader size={35} color="#ffffff" /> : "Submit"}
      </button>
    </form>
  );
};

export default Upload;
