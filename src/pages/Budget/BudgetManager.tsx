import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import CategoryCreator from "./CategoryCreator";
import CategoryEntry from "./CategoryEntry";
import { Table } from "@/components/ui/table";
import useTransactions from "@/services/transactions";
type Category = {
  name: string;
  amount: string;
  type: "Income" | "Spending";
};

type Budget = Category[];
function BudgetManager({ date, children }: { date: Date; children: any }) {
  const monthYear = date.getMonth() + " " + date.getFullYear();
  const [budget, setBudget] = useLocalStorage<Budget>(monthYear, []);
  const transactions = useTransactions(date);
  const [remaining, setRemaining] = useState("")
  const [openCategory, setOpenCategory] = useState("")
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  useEffect(()=>{
    let total = 0;
    for(const category of budget){
      if(category.type == "Income"){
        total += Number(category.amount.replace(/\$|\,/g, ""))
      } else {
        total -= Number(category.amount.replace(/\$|\,/g, ""))
      }
    }
    let totalString = format.format(total)
    let invertTotalString = format.format(-total)
    
    if(totalString == "$0.00"){
      setRemaining("It's All Budgeted!")
    } else if (total > 0) {
      setRemaining("{totalString} left to budget!")
    } else if(total < 0){
      setRemaining("{invertTotalString} over budget!")
    }

  }, [budget])

  let remaingingDiv = null

  return (
    <>
      <div className="w-full flex justify-between">
        <Button variant="outline">Copy Previous</Button>
        <CategoryCreator monthYear={monthYear}/>
      </div>
      {children}
      <div className="w-full flex justify-center">
        {remaining}
      </div>
      <div className="w-full">
        <Table>
        {budget.map((x=><CategoryEntry date={date} openCategory={openCategory} setOpenCategory={setOpenCategory} category={x} monthYear={monthYear} transactions={transactions}/>))}
        </Table>
      </div>
    </>
  );
}
export default BudgetManager;
export type { Budget, Category }