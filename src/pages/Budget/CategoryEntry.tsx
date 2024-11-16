import { useState } from "react";
import type { Budget, Category } from "./BudgetManager";
import { useLocalStorage } from "@uidotdev/usehooks";
import { TableCell, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BsTrash3 } from "react-icons/bs";
import { FaArrowUpShortWide } from "react-icons/fa6";
import TransactionHistory from "../Transactions/TransactionHistory";
import { Account } from "../Settings/AccountEntry";
import { Progress } from "@/components/ui/progress";
function CategoryEntry({
  category,
  monthYear,
  transactions,
  openCategory,
  setOpenCategory,
  date
}: {
  category: Category;
  monthYear: string;
  transactions: Transaction[];
  openCategory: string;
  setOpenCategory: any;
  date: Date
}) {
    const [activeAccounts, _setActiveAccounts] = useLocalStorage<Account[]>(
      "activeAccounts",
      []
    );
    let total = 0
    for(const trans of transactions){
        const transCategory = localStorage.getItem(trans.id)
        //console.log({transCategory, name: category.name})
        if(JSON.parse(transCategory) == category.name){
            //console.log(trans)
            let amount = Number(trans.amount)
            if(activeAccounts.find(x=>x.id == trans.account_id).type == "depository"){
                amount *= -1;
            }
            if(category.type == "Income"){
              amount *= -1;
            }

            total += amount
        }
    }
    console.log({name: category.name, total, amount: category.amount.replace(/\$|\,/g, ""), amountn: Number(category.amount.replace(/\$|\,/g, ""))})
    const remaining = Number(category.amount.replace(/\$|\,/g, "")) - total
    const progress = remaining / Number(category.amount.replace(/\$|\,/g, "")) * 100
    console.log({name: category.name, total})
    const format = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    const [open, setOpen] = useState(false)
    const [amount, setAmount] = useState(category.amount)
    const [type, setType] = useState(category.type)
    const [error, setError] = useState("")
    const [budget, setBudget] = useLocalStorage<Budget>(monthYear, []);

    function submit(){
        const index = budget.findIndex(x=>x.name == category.name)
        budget[index].amount = amount
        budget[index].type = type
        setBudget([...budget])
        setOpenCategory("")
    }

    function deleteCategory(){
      const index = budget.findIndex(x=>x.name == category.name)
      budget.splice(index, 1);
      setBudget([...budget])
      setOpenCategory("")
  }
  function moveCategoryUp(){
      const index = budget.findIndex(x=>x.name == category.name)
      if(index == 0)
        return;
      const temp1 = budget[index]
      budget[index] = budget[index-1]
      budget[index-1] = temp1
      setBudget([...budget])
  }
  return (<>
    <TableRow onClick={()=>{setOpenCategory(category.name)}} className="border-b-0">
      <TableCell>
        <p className="text-lg">{category.name}</p>
        <p className="text-base">{category.type}</p>
      </TableCell>
      <TableCell>
        <p className="text-xl">Planned</p>
        <p className="text-base">{format.format(Number(category.amount.replace(/\$|\,/g,"")))}</p>
      </TableCell>
      <TableCell>
        <p className="text-xl">Left</p>
        <p className="text-base">{format.format(remaining)}</p>
      </TableCell>
    </TableRow>
    <TableRow onClick={()=>{setOpenCategory(category.name)}}>
      <TableCell>
      </TableCell>
      <TableCell colSpan={2} >
        <Progress value={progress} className="w-[90%] m-auto" />
      </TableCell>
    </TableRow>
    
    <Dialog  open={openCategory == category.name} onOpenChange={(e)=>{if(!e)setOpenCategory("")}}>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Edit {category.name}</DialogTitle>
          <DialogDescription>
              {/* Amount */}
              <div>
                <Label htmlFor="amount" className="block mb-1">
                  Amount (USD)
                </Label>
                <Input
                  id="amount"
                  type="text"
                  inputMode="numeric"
                  placeholder="$0.00"
                  className="w-full"
                  value={amount}
                  onChange={(e)=>{
                    const addDot = e.target.value.endsWith(".")
                    const addDotZero = e.target.value.endsWith(".0")
                    const textString = (e.target.value).replace(/\$/g, "").replace(/[^0-9.]/g, "")
                    const newNum = Math.trunc(Number(textString) * 100) / 100
                    const newString = newNum.toLocaleString("en-US", {
                        maximumFractionDigits: 2,
                      });
                    setAmount("$" + newString + (addDotZero ? ".0" : "") + (addDot ? "." : ""))
                  }}
                />
              </div>

              {/* Category Type */}
              <div className="pt-2">
                <Label htmlFor="categoryType" className="block mb-1">
                  Category Type
                </Label>
                
            <DropdownMenu>
            <DropdownMenuTrigger asChild >
                <Button variant="outline">{type}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem
                className="text-lg"
                onClick={() => {
                    setType("Spending");
                }}
                >
                Spending
                </DropdownMenuItem>
                <DropdownMenuItem className="text-lg" onClick={()=>{setType("Income")}}>
                Income
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
            <p className="pt-3 text-red-800">{error}</p>
              </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter><div className="w-full flex justify-between">
        <Button type="submit" onClick={deleteCategory} variant="outline"><BsTrash3 style={{ width: "1.25rem", height: "1.25rem" }} /></Button>
        <Button type="submit" onClick={moveCategoryUp} variant="outline"><FaArrowUpShortWide style={{ width: "1.25rem", height: "1.25rem" }} /></Button>
          <Button type="submit" onClick={submit}>Save</Button></div>
          
        </DialogFooter>
        <div>
            {/* <TransactionHistory startDate={date}  category={category.name}/> */}
          </div>
      </DialogContent>
    </Dialog>
    </>
  );
}
export default CategoryEntry;
