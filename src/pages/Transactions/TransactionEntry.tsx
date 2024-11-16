import { Button } from "@/components/ui/button";
import { Table, TableCell, TableRow } from "@/components/ui/table";
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
import CategoryPicker from "./TransactionCategoryPicker";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
function TransactionEntry({
  transaction,
  category: categoryName,
}: {
  transaction: Transaction & {
    account: Account;
  };
  category?: string;
}) {
  const date = new Date(transaction.date);
  const monthYear = date.getUTCMonth() + " " + date.getUTCFullYear();
  const [budget, setBudget] = useLocalStorage<Budget>(monthYear, []);
  const [open, setOpen] = useState(false)
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
  if(categoryName && (category || "Uncategorized") != categoryName)
    return;

    const table = [
      ["Account", transaction.account.name],
      ["Description", transaction.description],
      ["Counterparty", transaction.details.counterparty?.name],
      ["Card Category", toTitleCase(transaction.details?.category || "")],
      ["Status", toTitleCase(transaction.status)]
    
    ]
  return (<>
    <TableRow className="border-0" disableHover={true} onClick={()=>setOpen(true)}>
      <TableCell className="w-full flex items-center justify-between flex-wrap">
        <p className="text-2xl">
          {date.toLocaleDateString("en-US", { month: "short", day: "numeric" }).replace(/ /g, '\u00A0')}
        </p><p>{(transaction.details.counterparty?.name || transaction.account.name).slice(0,25)}</p>
        <div onClick={(e)=>{
          e.stopPropagation()
        }}>
          
        <CategoryPicker category={category} budget={budget} setCategory={setCategory} search={false} />
        </div>
      </TableCell>
      <TableCell className={`${amount < 0 ? "" : "text-green-600"} text-xl`}>
        {format.format(amount)}
      </TableCell>
    </TableRow>
      <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{date.toLocaleDateString("en-US", { month: "short", day: "numeric" })} Transaction</DialogTitle>
        <DialogDescription>
          <div className="w-full flex justify-center">
        
        </div>
          <Table>
          <TableRow>
              <TableCell>
                Category
              </TableCell>
              <TableCell>
              <CategoryPicker category={category} budget={budget} setCategory={setCategory} search={false}/>
              </TableCell>
            </TableRow>
            {table.map(x=><TableRow>
              <TableCell>
                {x[0]}
              </TableCell>
              <TableCell>
              {x[1]}
              </TableCell>
            </TableRow>)}
            
          </Table>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
    </>
  );
}
export default TransactionEntry;


function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}
