import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "../screen/LandingPage";
import ProtectedRoutes from "./protect-routes/ProtectedRoutes";
import GiverProtected from "./protect-routes/GiverProtected";
import Takerform from "../screen/Caretakerpages/Takerform";
import Giverprofile from "../screen/Caregiverpages/Giverprofile";
import Giverform from "../screen/Caregiverpages/Giverform";
import Giverdata from "../screen/Caregiverpages/Giverdata";
import Takerdata from "../screen/Caretakerpages/Takerdata";
import Login from "../screen/Login/Login";
import Nearme from "../screen/Sitters-near-me/Nearme";
import Takerprofile from "../screen/Caretakerpages/Takerprofile";
import Work from "../screen/Workingpage/Work";

const WebRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <GiverProtected>
                <LandingPage />
              </GiverProtected>
            }
          />
          <Route path="/joinnow" element={<Work />} />
          <Route path="/caregiver-signup" element={<Giverform />} />
          <Route path="/signin" element={<Login />} />
          <Route
            path="/jobForm"
            element={
              <ProtectedRoutes>
                <Giverdata />
              </ProtectedRoutes>
            }
          />
          <Route path="/sitters/:type" element={<Nearme />} />
          <Route path="/caretaker-signup" element={<Takerform />} />
          <Route
            path="/care-taker"
            element={
              <ProtectedRoutes>
                <Takerprofile />
              </ProtectedRoutes>
            }
          />
          <Route path="/caretaker/caretakerdata/:_id" element={<Takerdata />} />
          <Route
            path="/petsitter-profile"
            element={
              <ProtectedRoutes>
                <Giverprofile />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default WebRoutes;
