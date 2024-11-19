import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { TellerConnectEnrollment } from "teller-connect-react";
import Client from "@/services/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { BsTrash3 } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { AlertDialogHeader, AlertDialogFooter, AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
enum State {
  requesting = 0,
  success,
  error,
}
export interface Account {
    accessToken: string;
    type: string
    subtype: string
    status: string
    name: string
    links: {
        transactions: string
        self: string
        balances: string
        details?: string
      }
      
    last_four: string
    institution: {
        name: string
        id: string
      }
    id: string
    enrollment_id: string
    currency: string
  }
function AccountEntry({
  enrollment,
  removeEnrollment,
}: {
  enrollment: TellerConnectEnrollment;
  removeEnrollment: (arg0: string) => void;
}) {
  const [applicationSetup, _setApplicationSetup] = useLocalStorage(
    "application-setup",
    false
  );
  if (!applicationSetup) return;

  const [state, setState] = useState(State.requesting);
  const [accounts, setAccounts] = useState<Account[]>();
  
  const [certFileContent, _setCertFileContent] = useLocalStorage(
    "certFileContent",
    ""
  );

  useEffect(() => {
    fetchData();
  }, []);
  const [activeAccounts, setActiveAccounts] = useLocalStorage<Account[]>(
    "activeAccounts",
    []
  );

  const client = new Client(enrollment.accessToken, certFileContent);
  async function fetchData() {
    console.log("fetching data")
    try {
      const data = await client.get("https://api.teller.io/accounts");
      
      setAccounts(data.map((x: any)=>{
        x.accessToken = enrollment.accessToken
        return x;
      }));
      console.log(data);
      setState(State.success);
    } catch (e) {
      console.log(e);
      setState(State.error);
      console.trace()
      throw e
    }
  }

  return (
    <div className="max-w-lg w-full">
      <div className="border-b flex justify-between align-middle">
        <h2 className="inline m-0 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {enrollment.enrollment.institution.name}
        </h2>
        <AlertDialog>
          <AlertDialogTrigger><Button variant="outline" style={{ width: "2.25rem", height: "2.25rem" }} ><BsTrash3 style={{ width: "1.25rem", height: "1.25rem" }} /></Button></AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete {enrollment.enrollment.institution.name} Connection?</AlertDialogTitle>
              <AlertDialogDescription>
                You will need to manually reconnect this account and recategorize all existing transactions.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => removeEnrollment(enrollment.enrollment.id)}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      {state == State.success ? (
        <>
          <Table className="w-full m-auto">
            <TableHeader>
              <TableRow disableHover>
                <TableHead>Account Name</TableHead>
                <TableHead>
                  <div className="flex justify-center">Active</div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts?.map((x) => (
                <TableRow key={x.id} disableHover>
                  <TableCell>{x.name}</TableCell>
                  <TableCell className="pl-0">
                    <div className="flex justify-center">
                      <Checkbox
                        onCheckedChange={() => {
                          if (activeAccounts.find(a=>a.id==x.id)) {
                            setActiveAccounts(
                              activeAccounts.filter((a) => a.id != x.id)
                            );
                          } else {
                            setActiveAccounts([x, ...activeAccounts]);
                          }
                        }}
                        checked={!!activeAccounts.find(a=>a.id==x.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* <hr /> */}
          {/* <pre>{JSON.stringify(accounts, null, 2)}</pre> */}
        </>
      ) : (<div>
        <Skeleton  className="w-10/12 m-auto mt-1 h-[70px] rounded-md"/>
        </div>
      )}
    </div>
  );
}
export default AccountEntry;
