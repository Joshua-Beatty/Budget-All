import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import type { Account } from "../Settings/AccountEntry";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import Client from "@/services/client";
import { LuPlusCircle } from "react-icons/lu";
import TransactionHistory from "./TransactionHistory";
import storePromise from "@/services/store";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import Tabs from "../Tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MonthChanger from "../Components/MonthChanger";
import CategoryPicker from "./TransactionCategoryPicker";
import { Budget } from "../Budget/BudgetManager";

enum State {
  blank = 0,
  downloading,
  downloaded,
}

function Transactions() {
  const [activeAccounts, _setActiveAccounts] = useLocalStorage<Account[]>(
    "activeAccounts",
    []
  );

  const [downloadProgress, setProgress] = useState(
    activeAccounts
      .map((x) => {
        return {
          account: x,
          downloading: State.blank,
        };
      })
      .sort((a, b) => {
        if (a.account.name < b.account.name) {
          return -1;
        }
        if (a.account.name > b.account.name) {
          return 1;
        }
        return 0;
      })
  );
  const [certFileContent, _setCertFileContent] = useLocalStorage(
    "certFileContent",
    ""
  );

  async function refresh() {
    for (const i in downloadProgress) {
      const account = downloadProgress[i].account;
      const client = new Client(account.accessToken, certFileContent);
      downloadProgress[i].downloading = State.downloading;
      setProgress([...downloadProgress]);
      (async () => {
        const data = await client.get(
          `https://api.teller.io/accounts/${account.id}/transactions`
        );
        console.log(account.name);
        console.log(data);
        (await storePromise).set(account.id, data);
        downloadProgress[i].downloading = State.downloaded;
        setProgress([...downloadProgress]);
        console.log(i);
      })();
    }
  }

  const [currDate, setCurrDate] = useState(new Date())
  const [currUTCDate, setCurrUTCDate] = useState(new Date())
  const [budget, setBudget] = useState<Budget>([]);
  useEffect(()=>{
    const newDate = new Date(+currDate)
    setCurrUTCDate(new Date(`${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`))
    console.log("Updating currUTC date")
    console.log(currUTCDate, `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`)
    

    const monthYear = currUTCDate.getUTCMonth() + " " + currUTCDate.getUTCFullYear();
    setBudget(JSON.parse(localStorage.getItem(monthYear)))
  
  }, [currDate])

  const [categoryFilter, setCategoryFilter] = useState("")

  return (
    <Tabs title="Transactions">
      <div className="w-full flex justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={refresh} className="float-left">
              Refresh Transactions
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Refreshing Transactions</DialogTitle>
              <DialogDescription>
                <div className="flex flex-col">
                  {downloadProgress.map((x) => (
                    <div
                      className="flex flex-row items-center"
                      key={x.account.id + x.account.accessToken}
                    >
                      {x.downloading == State.downloading ? (
                        <div className="pr-2">
                          <LoadingSpinner size={20} />
                        </div>
                      ) : x.downloading == State.downloaded ? (
                        <div className="pr-2">
                          <IoIosCheckmarkCircleOutline />
                        </div>
                      ) : null}
                      <h2>{x.account.name}</h2>
                    </div>
                  ))}
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        {/* <Button variant="outline" onClick={() => {}} className="float-right">
          <LuPlusCircle /> Transaction
        </Button> */}
        <CategoryPicker budget={budget} category={categoryFilter} setCategory={setCategoryFilter} search={true} />
      </div>
      <div className="w-full ">
        <MonthChanger date={currDate} setDate={setCurrDate}/>
      </div>
      <TransactionHistory startDate={currUTCDate} category={categoryFilter} />
    </Tabs>
  );
}
export default Transactions;
