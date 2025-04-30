import React, { useState } from "react";
import icon1 from "../assets/images/icon01.png";
import HashLoader from 'react-spinners/HashLoader';
const Prediction = () => {
  const[loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [disease,setDisease] = useState("")
  const SubmitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/ai/getprediction`,
        {
          method: "POST",
          body: JSON.stringify({
            prompt: prompt,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let resolvedResp = await response.json();
      console.log(resolvedResp);
      setDisease(resolvedResp.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <div className="flex p-8 justify-around">
        <div>
          <img src={icon1} className="h-[400px] w-[400px]" alt="" />
        </div>
        <div className="min-w-[600px]">
          <h1 className="text-headingColor text-2xl">
            How are you feeling now?
          </h1>
          <div className="flex flex-col">
            <textarea
              className="p-3 lg:p-7 rounded-[12px] border border-solid border-[#D9DCE2] cursor-pointer mt-4 min-h-[200px] min-w-[300px]"
              placeholder="Enter your problem here..."
              name="data"
              rows="3"
              columns="80"
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>
            <button
              className="btn rounded-[50px] max-w-[250px] mx-auto"
              onClick={SubmitHandler}
            >
              {loading ? <HashLoader size={35} color='#ffffff'/> : 'Submit'}
            </button>
          </div>
          <div>
            <div className="p-4 rounded bg-[#fff9ea] mt-5">
              <span className="text-yellow-300 text-[15px] leading-6 font-semibold">
                Disease Name : {disease.diseasename}
              </span>
              <p className="text-[16px] leading-6 font-medium text-textColor">
                Remedy : {disease.basic_remedy}
              </p>
              <p className="text-[14px] leading-5 font-medium text-textColor">
                Self Curable : {disease.self_curable}
              </p>
              <p className="text-[14px] leading-5 font-medium text-textColor">
                Doctor Type : {disease.doctortype}
              </p>
              <p className="text-[14px] leading-5 font-medium text-textColor">
                Other Symptoms : {disease.other_symptoms}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prediction;
