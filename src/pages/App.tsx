import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import { useTellerConnect } from 'teller-connect-react';
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

function App() {
  
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-1">
      <Button asChild>
        <Link to="/settings">To Settings</Link>
      </Button>
    </div>
  );
}

export default App;
