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
import { useState } from "react";
function CategoryCreator() {
  const [categoryType, setType] = useState("Spending")
  const [amount, setAmount] = useState("")
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"> Create Category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new Category</DialogTitle>
          <DialogDescription>
            <form className="space-y-4 w-full max-w-md pt-2">
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
                />
              </div>

              {/* Amount */}
              <div>
                <Label htmlFor="amount" className="block mb-1">
                  Amount (USD)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="$0.00"
                  className="w-full"
                  value={amount}
                  onChange={(e)=>{
                    setAmount((e.target.value).replace(/\$/g, ""))
                  }}
                />
              </div>

              {/* Category Type */}
              <div>
                <Label htmlFor="categoryType" className="block mb-1">
                  Category Type
                </Label>
                
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
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
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default CategoryCreator;
