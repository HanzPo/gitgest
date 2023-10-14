import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Summary from "./pages/Summary";
import "./App.css";
import './fonts/SpaceGrotesk/SpaceGrotesk-Bold.ttf';
import './fonts/SpaceGrotesk/SpaceGrotesk-Regular.ttf';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
