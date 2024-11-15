import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";
import CategoryCreator from "./CategoryCreator";
type Category = {
  name: string;
  amount: string;
  type: "income" | "spending";
};

type Budget = Category[];
function BudgetCreator({ date, children }: { date: Date; children: any }) {
  const monthYear = date.getMonth() + " " + date.getFullYear;
  const [budget, setBudget] = useLocalStorage<Budget>(monthYear, []);

  return (
    <>
      <div className="w-full flex justify-between">
        <Button variant="outline">Copy Previous Budget</Button>
        <CategoryCreator />
      </div>
      {children}
      <div>
        <p></p>
      </div>
    </>
  );
}
export default BudgetCreator;
