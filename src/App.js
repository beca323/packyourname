import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Dashboard from "./Pages/Dashboard/Dashboard";
import NotFound from "./Pages/NotFound/NotFound";
import UploadPage from "./Pages/UploadPage/UploadPage";
import QuickStart from "./Pages/QuickStart/QuickStart";

function App() {
  return (
    <div className="App">
      <Content />
    </div>
  );
}

function Content() {
  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="/quickstart" element={<QuickStart />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;