import { Button } from "@/components/ui/button";
import { useState } from "react";
import AccountsSettingsCard from "./AccountsSettingsCard";
function AccountSettingsButton() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button
        variant="outline"
        onClick={() => {
          setShowModal(true);
          setTimeout(() => {
            const iframes = document.querySelectorAll(
              "iframe#teller-connect-window"
            );

            // Add a load event listener to each iframe
            iframes.forEach((iframe) => {
              iframe.addEventListener("load", () => {
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
          onSuccess={(auth) => console.log(auth)}
        />
      ) : (
        ""
      )}
    </>
  );
}
export default AccountSettingsButton;
