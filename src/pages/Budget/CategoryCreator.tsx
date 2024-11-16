import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Budget } from "./BudgetManager";
function CategoryCreator({monthYear}) {
  const [categoryType, setType] = useState("Spending")
  const [amount, setAmount] = useState("")
  const [name, setName] = useState("")
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [budget, setBudget] = useLocalStorage<Budget>(monthYear, []);
  useEffect(()=>{
    setAmount("$0")
    setType("Spending")
    setName("")
  }, [open])
  const [amountNum, setAmountNum] = useState(0)
  useEffect(()=>{
    const num = amount.replace(/[^0-9.-]+/g,"")
    setAmountNum(Number(num))
    console.log(Number(num))
  }, [amount])


  function submit(){
    console.log("Submit")
    if(!name){
        setError("Please enter a name")
        return;
    }
    if(budget.find(x=>x.name == name)){
        setError("Category Name Duplicate")
        return;
    }
    if(amountNum <= 0){
        setError("Please enter an amount greater than 0")
        return;
    }
    setBudget([{
        name,
        amount,
        type: categoryType as any
    },...budget])
    setError("")
    setOpen(false)
  }

  return (
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline"> Create Category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new Category</DialogTitle>
          <DialogDescription>
              {/* Category Name */}
              <div>
                <Label htmlFor="categoryName" className="block mb-1">
                  Category Name
                </Label>
                <Input
                  id="categoryName"
                  type="text"
                  placeholder="Enter category name"
                  className="w-full"
                  value={name}
                  onChange={(e)=>{
                    setName(e.target.value)
                  }}
                />
              </div>

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
              <div>
                <Label htmlFor="categoryType" className="block mb-1">
                  Category Type
                </Label>
                
            <DropdownMenu>
            <DropdownMenuTrigger asChild >
                <Button variant="outline">{categoryType}</Button>
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
        <DialogFooter>
          <Button type="submit" onClick={submit}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default CategoryCreator;
