import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import ApplicationSettingsCard from "./ApplicationSettingsCard";
import { useState } from "react";
import AccountSettingsButton from "./AccountSettingsButton";

function App() {
  
  return (
    <div className="w-screen h-screen flex flex-col justify-start items-center gap-4">
      <h1 className="text-6xl font-extrabold mb-2 mt-40">Settings</h1>
      <ApplicationSettingsCard />
      <AccountSettingsButton />
      <Button asChild>
        <Link to={-1 as any}>Go Back</Link>
      </Button>
    </div>
  );
}

export default App;
