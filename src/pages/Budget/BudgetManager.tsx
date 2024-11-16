import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";
import CategoryCreator from "./CategoryCreator";
import CategoryEntry from "./CategoryEntry";
type Category = {
  name: string;
  amount: string;
  type: "income" | "spending";
};

type Budget = Category[];
function BudgetManager({ date, children }: { date: Date; children: any }) {
  const monthYear = date.getMonth() + " " + date.getFullYear();
  const [budget, setBudget] = useLocalStorage<Budget>(monthYear, []);

  return (
    <>
      <div className="w-full flex justify-between">
        <Button variant="outline">Copy Previous</Button>
        <CategoryCreator monthYear={monthYear}/>
      </div>
      {children}
      <div className="w-full">
        {budget.map((x=><CategoryEntry category={x} monthYear={monthYear}/>))}
      </div>
    </>
  );
}
export default BudgetManager;
export type { Budget, Category }