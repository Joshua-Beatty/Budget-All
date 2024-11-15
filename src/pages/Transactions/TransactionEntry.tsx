import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { format } from "path";
import { useState } from "react";
import { Account } from "../Settings/AccountEntry";
import { useLocalStorage } from "@uidotdev/usehooks";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
function TransactionEntry({
  transaction,
}: {
  transaction: Transaction & {
    account: Account;
  };
}) {
  const date = new Date(transaction.date);
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
      <TableCell className="w-24">
        {date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
      </TableCell>
      <TableCell className="overflow-hidden">
        {transaction.details.counterparty?.name || transaction.account.name}
      </TableCell>
      <TableCell className="flex justify-center items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{category || "Uncategorized"}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="text-lg"
              onClick={() => {
                setCategory("Groceries");
              }}
            >
              Groceries
            </DropdownMenuItem>
            <DropdownMenuItem className="text-lg">Billing</DropdownMenuItem>
            <DropdownMenuItem className="text-lg">Team</DropdownMenuItem>
            <DropdownMenuItem className="text-lg">
              Subscription
            </DropdownMenuItem>
            <DropdownMenuItem className="text-lg" onClick={()=>{setCategory("")}}>
              Uncategorized
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
      <TableCell className={`${amount < 0 ? "" : "text-green-600"}`}>
        {format.format(amount)}
      </TableCell>
    </TableRow>
  );
}
export default TransactionEntry;
