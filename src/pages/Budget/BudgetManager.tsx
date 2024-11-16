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
  const [remaining, setRemaining] = useState(0)
  useEffect(()=>{

  }, [transactions, budget])

  return (
    <>
      <div className="w-full flex justify-between">
        <Button variant="outline">Copy Previous</Button>
        <CategoryCreator monthYear={monthYear}/>
      </div>
      {children}
      <div className="w-full"><Table>
        {budget.map((x=><CategoryEntry category={x} monthYear={monthYear} transactions={transactions}/>))}
        </Table>
      </div>
    </>
  );
}
export default BudgetManager;
export type { Budget, Category }