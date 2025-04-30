import React, { useState } from "react";
import icon3 from "../assets/images/icon03.png";
import Upload from "./Upload";
import View from "./View";
import HashLoader from 'react-spinners/HashLoader';

const EHR = () => {
  const [tab, setTab] = useState("upload");
  const [loading,setLoading] = useState(false);
  return (
    <div className="mt-5">
      <div className="flex p-8 justify-start gap-6">
        <div>
          <img src={icon3} className="h-[400px] w-[400px]" alt="" />
        </div>
        <div className="flex flex-col">
        <div className="mb-4">
          <button
            onClick={() => {
              setTab("upload");
            }}
            className={`${
              tab === "upload" && "bg-primaryColor text-white font-normal"
            }p-2 mr-5 px-5 py-2 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
          >
            Upload Doc
          </button>
          <button
            onClick={() => {
              setTab("view");
            }}
            className={`${
              tab === "view" && "bg-primaryColor text-white font-normal"
            }p-2 py-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
          >
            View Doc
          </button>
        </div>
        <div className="mt-2 min-w-[500px] ml-0">
        {
                    tab ==='upload' && <Upload/>
                }
                {
                    tab ==='view' && <View/>
                }
                </div>
      </div>
      </div>
    </div>
  );
};

export default EHR;
