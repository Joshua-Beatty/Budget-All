import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { TellerConnectOnExit, TellerConnectOnSuccess, useTellerConnect } from "teller-connect-react";

function AccountsSettingsCard({onExit, onSuccess}: {onExit: TellerConnectOnExit, onSuccess: TellerConnectOnSuccess}) {
  const [applicationId, _saveApplicationId] = useLocalStorage(
    "application-id",
    ""
  );

  const { open, ready } = useTellerConnect({
    applicationId: applicationId,
    onExit: onExit,
    onSuccess: onSuccess,
  });
  useEffect(() => {
    if (ready) {
      open();
    }
  }, [ready, open]);
  return (
    <>
    </>
  );
}
export default AccountsSettingsCard;
