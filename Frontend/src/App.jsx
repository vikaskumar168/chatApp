import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Chatpage from "./pages/Chatpage";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/chats" element={<Chatpage />} />

        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  );
};

export default App;
