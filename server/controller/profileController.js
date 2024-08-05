import { ProfileModel } from '../models/profile.js';
import { UserModel } from '../models/user.js';


const getProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const profile = await ProfileModel.findOne({ userId: user._id });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// const updateProfile = async (req, res) => {
//   try {
//     const { userId, name, dob, institute, gender } = req.body;

//     // Ensure that all required fields are provided
//     if (!userId || !name || !dob || !institute || !gender) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     // Find and update the user's profile
//     const profile = await ProfileModel.findOneAndUpdate(
//       { userId: userId },
//       { name, dob, institute, gender },
//       { new: true, runValidators: true }
//     );

//     if (!profile) {
//       return res.status(404).json({ error: "Profile not found" });
//     }

//     res.status(200).json({ profile });
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

const updateProfile = async (req, res) => {
  try {
    const { userId, name, dob, institute, gender } = req.body;

    // Ensure that userId is provided
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Create an update object with provided fields
    const updateData = {};
    if (name) updateData.name = name;
    if (dob) updateData.dob = dob;
    if (institute) updateData.institute = institute;
    if (gender) updateData.gender = gender;

    // Find and update the user's profile
    const profile = await ProfileModel.findOneAndUpdate(
      { userId: userId },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.status(200).json({ profile });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};







export { getProfile, updateProfile };
