import React from "react";
import "./App.css";
import { Start } from "./Pages/Start/Start";
import { Route, Routes } from "react-router-dom";
import { Slide } from "./Pages/Slide/Slide";
import { Login } from "./Pages/Login/Login";
import { NewAccount } from "./Pages/NewAccount/NewAccount";
import { VerificationCode } from "./Pages/VerificationCode/VerificationCode";
import { NewAccountDone } from "./Pages/NewAccountDone/NewAccountDone";
import { StartChange } from "./Pages/NewPassword/startChange";
import { Landing } from "./Pages/Landing/Landing";
import Diagnosis from "./Pages/Diagnosis/Diagnosis";
import Wheather from "./Pages/Wheather/Wheather";
import Forum from "./Pages/Forum/Forum";
import CropInformation from "./Pages/CropInformation/CropInformation";
import PlantMonitoring from "./Pages/PlantMonitoring/PlantMonitoring";
import PasswordCode from "./Pages/NewPassword/passwordCode.jsx";
import AddPost from "./Pages/Forum/AddPost.jsx";
import EditProfile from "./Pages/Profile/EditProfile/EditProfile";
import PasswordChange from "./Pages/NewPassword/PasswordChange";
import DiagnosticTips from "./Pages/DiagnosisTips/DiagnosisTips";
import Profile from "./Pages/Profile/Profile.jsx";
import GreenDefendDashboard from "./Pages/GreenDefendDashboard/GreenDefendDashboard.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="slide" element={<Slide />} />
        <Route path="login" element={<Login />} />
        <Route path="startChange" element={<StartChange />} />
        <Route path="newaccount" element={<NewAccount />} />
        <Route path="newPassword" element={<PasswordChange />} />
        <Route path="passwordcode" element={<PasswordCode />} />
        <Route path="verificationcode" element={<VerificationCode />} />
        <Route path="newaccountdone" element={<NewAccountDone />} />
        <Route path="landing" element={<Landing />} />

        <Route path="GreenDefendDashboard" element={<GreenDefendDashboard />}>
          <Route index path="Forum" element={<Forum />} />
          <Route path="Diagnosis" element={<Diagnosis />} />
          <Route path="Wheather" element={<Wheather />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="DiagnosticTips" element={<DiagnosticTips />} />
          <Route path="CropInformation" element={<CropInformation />} />
          <Route path="PlantMonitoring" element={<PlantMonitoring />} />
          <Route path="Forum/AddPost" element={<AddPost />} />
          <Route path="Profile/editprofile" element={<EditProfile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
