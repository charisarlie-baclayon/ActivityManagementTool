import { useState } from "react";
import "./App.css";
import ViewActivities from "./pages/Teacher/ViewActivities";
import { Route, Routes } from "react-router-dom";
import VerticalNavBar from "./assets/common/vertical-nav-bar";
import { Teacher } from "./pages/Teacher/Teacher";
import { CreateActivities } from "./pages/Teacher/CreateActivities";
import { NotFound } from "./assets/common/NotFound";

function App() {

  return (
    <>
      <VerticalNavBar />
      <Routes>
        <Route path="teacher" element={<Teacher />}>
          <Route path="activities" element={<ViewActivities />} />
          <Route path="create" element={<CreateActivities />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
