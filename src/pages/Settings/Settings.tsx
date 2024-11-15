import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import ApplicationSettingsCard from "./ApplicationSettingsCard";
import { useState } from "react";
import AccountSettingsButton from "./AccountSettingsButton";
import { useLocalStorage } from "@uidotdev/usehooks";
import { TellerConnectEnrollment } from "teller-connect-react";
import AccountEntry, { Account } from "./AccountEntry";
import Tabs from "../Tabs";

function App() {
  const [enrollments, setEnrollments] = useLocalStorage<
    TellerConnectEnrollment[]
  >("enrollments", []);
  const [activeAccounts, setActiveAccounts] = useLocalStorage<Account[]>(
    "activeAccounts",
    []
  );

  function removeEnrollment(id: string) {
    setEnrollments(enrollments.filter((x) => x.enrollment.id != id));
    setActiveAccounts(activeAccounts.filter((x) => x.enrollment_id != id));
  }

  return (
    <Tabs title="Settings">
      <div className="w-full flex justify-between pb-2">
        <ApplicationSettingsCard />
        <AccountSettingsButton />
      </div>
      {enrollments.map((e) => (
        <AccountEntry
          key={e.enrollment.id}
          enrollment={e}
          removeEnrollment={removeEnrollment}
        />
      ))}
    </Tabs>
  );
}

export default App;
