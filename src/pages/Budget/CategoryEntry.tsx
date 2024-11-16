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

function CategoryEntry({
  category,
  monthYear,
  transactions,
}: {
  category: Category;
  monthYear: string;
  transactions: Transaction[]
}) {
    let total = 0
    for(const trans of transactions){
        const transCategory = localStorage.getItem(trans.id)
        //console.log({transCategory, name: category.name})
        if(JSON.parse(transCategory) == category.name){
            //console.log(trans)
            if(trans.type == "debit"){
                total -= Number(trans.amount)
            } else {
                total += Number(trans.amount)
            }
        }
    }
    console.log({name: category.name, total, amount: category.amount.replace(/\$|\,/g, ""), amountn: Number(category.amount.replace(/\$|\,/g, ""))})
    const remaining = Number(category.amount.replace(/\$|\,/g, "")) - total
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
        setOpen(false)
    }

    function deleteCategory(){
        const index = budget.findIndex(x=>x.name == category.name)
        budget.splice(index, 1);
        setBudget([...budget])
        setOpen(false)
    }
  return (<>
    <TableRow onClick={()=>{setOpen(true)}}>
      <TableCell>
        <p className="text-xl">{category.name}</p>
        <p className="text-base">{category.type}</p>
      </TableCell>
      <TableCell>
        <p className="text-xl">Planned</p>
        <p className="text-base">{category.amount}</p>
      </TableCell>
      <TableCell>
        <p className="text-xl">Remaining</p>
        <p className="text-base">{format.format(remaining)}</p>
      </TableCell>
    </TableRow>
    
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogContent>
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
                    const textString = (e.target.value).replace(/\$/g, "").replace(/[^0-9.]/g, "")
                    const newNum = Math.trunc(Number(textString) * 100) / 100
                    const newString = newNum.toLocaleString("en-US", {
                        maximumFractionDigits: 2,
                      });
                    setAmount("$" + newString + (addDot ? "." : ""))
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
          <Button type="submit" onClick={submit}>Save</Button></div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
}
export default CategoryEntry;
