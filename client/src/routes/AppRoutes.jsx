import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import NotFound from "../pages/NotFound";
import BasicLayouts from "../layouts/BasicLayouts";
import DashboardLayouts from "../layouts/DashboardLayouts";
import Intro from "../pages/dashboard/Intro";
import TodoList from "../pages/dashboard/TodoList";
import PrivateRoute from "./PrivateRoute";
import About from "../pages/dashboard/About";
import SavedNotes from "../pages/dashboard/savednotes";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<BasicLayouts />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>
      <Route
        path="/dashboard"
        element={(
          <PrivateRoute>
            <DashboardLayouts />
          </PrivateRoute>)}
      >
        <Route index element={<Intro />} />
        <Route path="intro" element={<Intro />} />
        <Route path="todo-list" element={<TodoList />} />
        <Route path="savednotes" element={<SavedNotes />} />
        <Route path="about" element={<About />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
