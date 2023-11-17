import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const LandingPage = lazy(() => import("../screen/LandingPage"));
const ProtectedRoutes = lazy(() => import("./protect-routes/ProtectedRoutes"));
const GiverProtected = lazy(() => import("./protect-routes/GiverProtected"));
const Takerform = lazy(() => import("../screen/Caretakerpages/Takerform"));
const Giverprofile = lazy(() =>
  import("../screen/Caregiverpages/Giverprofile")
);
const Giverform = lazy(() => import("../screen/Caregiverpages/Giverform"));
const Giverdata = lazy(() => import("../screen/Caregiverpages/Giverdata"));
const Takerdata = lazy(() => import("../screen/Caretakerpages/Takerdata"));
const Login = lazy(() => import("../screen/Login/Login"));
const Nearme = lazy(() => import("../screen/Sitters-near-me/Nearme"));
const Takerprofile = lazy(() =>
  import("../screen/Caretakerpages/Takerprofile")
);
const Work = lazy(() => import("../screen/Workingpage/Work"));
const Inbox = lazy(() => import("../screen/Inbox/Inbox"));
const Loader = lazy(() => import("../components/Loader/Loader"));
const WebRoutes = () => {
  return (
    <>
      <React.Suspense fallback={<Loader />}>
        {" "}
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
          <Route
            path="/caretaker/caretakerdata/:_id"
            element={
              <ProtectedRoutes>
                <Takerdata />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/petsitter-profile"
            element={
              <ProtectedRoutes>
                <Giverprofile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/inbox"
            element={
              <ProtectedRoutes>
                <Inbox />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </React.Suspense>
    </>
  );
};

export default WebRoutes;
