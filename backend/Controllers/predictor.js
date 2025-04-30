import Disease from "../models/DiseaseSchema.js";
require("dotenv").config({ path: "../.env" });
import { HfInference } from "@huggingface/inference";
const INFERENCEKEY = process.env.HUGGINGFACE;

const hf = new HfInference(INFERENCEKEY);

export const predictDisease = async (req, res, next) => {
  try {
    const result = await hf.textClassification({
      model: "Zabihin/Symptom_to_Diagnosis",
      inputs: req.body.prompt,
    });

    console.log(result[0]);
    if (result == "" || result == null) {
      console.log("Not working");
    }

    console.log(result[0].label);

    const diseaseDetails = await Disease.findOne({
      diseasename: result[0].label,
    });
    console.log(diseaseDetails);

    res.status(200).json({
      success: true,
      message: "Predicted succesfully",
      data: diseaseDetails,
    });
  } catch (e) {
    console.log(`cannot run : ${e}`);
    res
      .status(400)
      .json({ success: false, message: "failed to predict", error: e });
  }
};
