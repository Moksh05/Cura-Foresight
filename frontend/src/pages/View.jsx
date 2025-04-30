import React, { useEffect, useState } from "react";
import { IoDownloadOutline } from "react-icons/io5";
import { MdOutlineDeleteOutline } from "react-icons/md";

const View = () => {
  const [ehr, getEhr] = useState([]);
  useEffect(() => {
    const getData = async (e) => {
      const res = await fetch("http://localhost:5000/api/v1/upload/file", {
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const resolevedData = await res.json();
      getEhr(resolevedData.data);
    };
    getData();
  }, []);
  console.log(ehr);
  const handleClick = (url) => {
    window.open(url, "_blank");
  };
  if (Object.keys(ehr).length === 0) {
    return <div>Loading...</div>;
  }
  const deleteEhr = async (_id) => {
    const res = await fetch("http://localhost:5000/api/v1/upload/file", {
      method: "delete",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileid: _id }),
    });
    const resolevedData = await res.json();
    if (resolevedData.success) window.location.reload();
  };

  return (
    <div>
      {ehr.map((item, index) => (
        <div
          key={index}
          className="p-3 lg:p-5 rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer"
        >
          <div className="flex gap-6 flex-row justify-between">
            <div className="flex items-center justify-between gap-5 max-w-[80%]">
              <h4 className="text-[14px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor">
                {item.description}
              </h4>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <button onClick={() => handleClick(item.downloadURL)}>
                <IoDownloadOutline size={30} />
              </button>
              <button onClick={() => deleteEhr(item._id)}>
                <MdOutlineDeleteOutline size={30} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default View;
