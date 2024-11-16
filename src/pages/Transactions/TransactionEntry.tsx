import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { format } from "path";
import { useState } from "react";
import { Account } from "../Settings/AccountEntry";
import { useLocalStorage } from "@uidotdev/usehooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Budget } from "../Budget/BudgetManager";
function TransactionEntry({
  transaction,
}: {
  transaction: Transaction & {
    account: Account;
  };
}) {
  const date = new Date(transaction.date);
  const monthYear = date.getUTCMonth() + " " + date.getUTCFullYear();
  const [budget, setBudget] = useLocalStorage<Budget>(monthYear, []);
  console.log(monthYear);
  date.setDate(date.getDate() + 1);
  const amount =
    Number(transaction.amount) *
    (transaction.account.type == "credit" ? -1 : 1);
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const [category, setCategory] = useLocalStorage(transaction.id, "");
  return (
    <TableRow className="border-0" disableHover={true}>
      <TableCell className="w-40" >
        <p>
          {date.toLocaleDateString("en-US", { month: "short", day: "numeric" }).replace(/ /g, '\u00A0')+ " " + transaction.details.counterparty?.name || transaction.account.name}
        </p>
      </TableCell>
      <TableCell ><div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-base w-40">{category || "Uncategorized"}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {budget.map((x) => (
              <DropdownMenuItem
                className="text-lg"
                onClick={() => {
                  setCategory(x.name);
                }}
              >
                {x.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem
              className="text-lg"
              onClick={() => {
                setCategory("");
              }}
            >
              Uncategorized
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      </TableCell>
      <TableCell className={`${amount < 0 ? "" : "text-green-600"}`}>
        {format.format(amount)}
      </TableCell>
    </TableRow>
  );
}
export default TransactionEntry;
