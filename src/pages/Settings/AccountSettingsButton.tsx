import { Button } from "@/components/ui/button";
import { useState } from "react";
import AccountsSettingsCard from "./AccountsSettingsCard";
import { useLocalStorage } from "@uidotdev/usehooks";
import { TellerConnectEnrollment, TellerConnectOnSuccess } from "teller-connect-react";
function AccountSettingsButton() {
  const [showModal, setShowModal] = useState(false);
  const [applicationSetup, _setApplicationSetup] = useLocalStorage(
    "application-setup",
    false
  );
  const [enrollments, setEnrollments] = useLocalStorage<TellerConnectEnrollment[]>(
    "enrollments",
    []
  );

  const onSuccess: TellerConnectOnSuccess = (auth)=>{
    setEnrollments([auth, ...enrollments])
  }

  return (
    <>
      <Button
        disabled={!applicationSetup}
        variant="outline"
        onClick={() => {
          setShowModal(true);
          setTimeout(() => {
            const iframes = document.querySelectorAll<HTMLIFrameElement>(
              "iframe#teller-connect-window"
            );

            // Add a load event listener to each iframe
            iframes.forEach((iframe: HTMLIFrameElement) => {
              iframe.addEventListener("load", () => {
                if ((iframe.src == "about:blank" || (iframe.src != "about:blank"))) {
                  return;
                }
                iframe.classList.add("loaded");
              });
            });
          }, 50);
          setTimeout(() => {
            const iframes = document.querySelectorAll(
              "iframe#teller-connect-window"
            );

            // Add a load event listener to each iframe
            iframes.forEach((iframe) => {
              iframe.classList.add("loaded");
            });
          }, 250);
        }}
      >
        Add New Account
      </Button>
      {showModal ? (
        <AccountsSettingsCard
          onExit={() => setShowModal(false)}
          onSuccess={onSuccess}
        />
      ) : (
        ""
      )}
    </>
  );
}
export default AccountSettingsButton;
