import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Suspense } from "react";
import Home from "./views/blog/home";
import Login from "./views/user/login";
import MakeBlog from "./views/blog/make_blog";
import { ProtectedHome, ProtectedLogin } from "./middleware/ProtectedRoute";
import { AuthProvider } from "./middleware/authProvider";
import ReadBlog from "./views/blog/read_blog";
import Dashboard from "./views/blog/dashboard";
import EditBlog from "./views/blog/edit_blog";
import Register from "./views/user/register";
import Loading from "./component/loading";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        {" "}
        <AuthProvider>
          <Routes>
            <Route
              path="/login"
              element={
                <ProtectedHome>
                  <Login />
                </ProtectedHome>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedHome>
                  <Register />
                </ProtectedHome>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedLogin>
                  <Home />
                </ProtectedLogin>
              }
            />
            <Route
              path="/makeBlog"
              element={
                <ProtectedLogin>
                  <MakeBlog />
                </ProtectedLogin>
              }
            />
            <Route
              path="/readBlog/:id"
              element={
                <ProtectedLogin>
                  <ReadBlog />
                </ProtectedLogin>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedLogin>
                  <Dashboard />
                </ProtectedLogin>
              }
            />
            <Route
              path="editBlog/:id"
              element={
                <ProtectedLogin>
                  <EditBlog />
                </ProtectedLogin>
              }
            />
          </Routes>{" "}
        </AuthProvider>
      </BrowserRouter>
    </Suspense>
  </RecoilRoot>
);
