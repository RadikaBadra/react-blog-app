import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Suspense } from "react";
import Home from "./views/blog/home";
import Login from "./views/user/login";
import MakeBlog from "./views/blog/make_blog";
import * as middleware from "./middleware/app";
import ReadBlog from "./views/blog/read_blog";
import Dashboard from "./views/blog/dashboard";
import EditBlog from "./views/blog/edit_blog";
import Register from "./views/user/register";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <Suspense
      fallback={
        <div className="h-screen text-center">
          <div className="text-4xl font-bold">Loading...</div>
        </div>
      }
    >
      <BrowserRouter>
        <div>
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <middleware.Authenticated>
                <Home />
              </middleware.Authenticated>
            }
          />

          <Route
            path="/makeBlog"
            element={
              <middleware.Authenticated>
                <MakeBlog />
              </middleware.Authenticated>
            }
          />

          <Route
            path="/readBlog/:id"
            element={
              <middleware.Authenticated>
                <ReadBlog />
              </middleware.Authenticated>
            }
          />

          <Route
            path="/dashboard"
            element={
              <middleware.Authenticated>
                <Dashboard />
              </middleware.Authenticated>
            }
          />

          <Route
            path="editBlog/:id"
            element={
              <middleware.Authenticated>
                <EditBlog />
              </middleware.Authenticated>
            }
          />
        </Routes>
      </BrowserRouter>
    </Suspense>
  </RecoilRoot>
);
