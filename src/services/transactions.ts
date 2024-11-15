import { useState, useEffect } from "react";
import storePromise from "./store";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Account } from "@/pages/Settings/AccountEntry";

function useTransactions(startDate: Date) {
  const [storeData, setStoreData] = useState<[string, Transaction[]][]>([]);
  const [activeAccounts, _setActiveAccounts] = useLocalStorage<Account[]>(
    "activeAccounts",
    []
  );
  const [accountDict, setAccountDict] = useState<Record<string, Account>>({});

  useEffect(() => {
    console.log(activeAccounts)
    const dict: Record<string, Account> = {};
    for (const account of activeAccounts) {
        console.log(account.id, account)
      dict[account.id] = account;
    }
    setAccountDict(dict);
    console.log(accountDict)
  }, []);

  useEffect(() => {
    let unsub: Function | undefined = undefined;

    async function startUp() {
      const store = await storePromise;
      setStoreData(await store.entries());
      unsub = await store.onChange(async (a, b) => {
        console.log("change", a, b);
        setStoreData(await store.entries());
      });
    }
    startUp();

    return () => {
      if (unsub) unsub();
    };
  }, []);

  const [transactions, setTransactions] = useState<(Transaction & {account: Account})[]>([]);
  useEffect(() => {
    console.log("getting transaction list");
    console.log(storeData);
    const newList = [];
    for (const account of storeData) {
      for (const transaction of account[1]) {
        console.log(new Date(transaction.date) >= startDate);
        if (new Date(transaction.date) >= startDate) {
          (transaction as any).account = accountDict[transaction.account_id];
          newList.push(transaction);
        }
      }
    }
    newList.sort((a, b) => {
      return -(+new Date(a.date) - +new Date(b.date));
    });
    console.log(newList);
    setTransactions(newList as any);
  }, [storeData, accountDict]);

  return transactions;
}
export default useTransactions;
