import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import ApplicationSettingsCard from "./ApplicationSettingsCard";
import { useState } from "react";
import AccountSettingsButton from "./AccountSettingsButton";
import { useLocalStorage } from "@uidotdev/usehooks";
import { TellerConnectEnrollment } from "teller-connect-react";
import AccountEntry, { Account } from "./AccountEntry";

function App() {
  const [enrollments, setEnrollments] = useLocalStorage<TellerConnectEnrollment[]>(
    "enrollments",
    []
  );
  const [activeAccounts, setActiveAccounts] = useLocalStorage<Account[]>(
    "activeAccounts",
    []
  );
  
  function removeEnrollment(id: string){
    setEnrollments(enrollments.filter(x=>x.enrollment.id != id))
    setActiveAccounts(activeAccounts.filter(x=>x.enrollment_id != id))
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-start items-center gap-4">
      <h1 className="text-6xl font-extrabold mb-2 mt-40">Settings</h1>
      <ApplicationSettingsCard />
      <AccountSettingsButton />
      <Button asChild>
        <Link to={-1 as any}>Go Back</Link>
      </Button>
      {enrollments.map(e=><AccountEntry key={e.enrollment.id} enrollment={e} removeEnrollment={removeEnrollment}/>)}
    </div>
  );
}

export default App;
