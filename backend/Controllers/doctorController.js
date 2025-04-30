import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";
export const updateDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );
    //console.log(doctor);
    await doctor.save({ validateBeforeSave: false });
    res
      .status(200)
      .json({ success: true, message: "Successfully updated", data: doctor });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
};

export const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    await Doctor.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Successfully deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};

export const getTopDoctors = async (req, res) => {
  console.log("working");
  try {
    const doctor = await Doctor.find({ averageRating: { $gt: 0 } }).limit(3);
    console.log(doctor);
    res.status(200).json({ success: true, data: doctor });
  } catch (e) {
    res.status(401).json({ success: false, message: e });
  }
};

export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findById(id)
      .populate("reviews")
      .select("-password");
    res
      .status(200)
      .json({ success: true, message: "User found", data: doctor });
  } catch (err) {
    res.status(500).json({ success: false, message: "No user found" });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;
    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      doctors = await Doctor.find();
      //currently getting all doctors wether approved or not
      //doctors = await Doctor.find({isApproved:'approved'}).select("~password");
    }
    res
      .status(200)
      .json({ success: true, message: "Users found", data: doctors });
  } catch (err) {
    res.status(500).json({ success: false, message: "Not found" });
  }
};

export const getDoctorProfile = async (req, res) => {
  const doctorId = req.userId;
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }
    const [password, ...rest] = doctor._doc;
    const appointments = await Booking.find({ doctor: doctorId });
    res
      .status(200)
      .json({
        success: true,
        message: "Profile info is getting",
        data: { ...rest, appointments },
      });
  } catch (err) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
