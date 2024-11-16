import { useState } from "react"
import { Budget, Category } from "./BudgetManager"
import { useLocalStorage } from "@uidotdev/usehooks";
function CategoryEntry({ category, monthYear } : { category: Category, monthYear: string}){
    const [budget, setBudget] = useLocalStorage<Budget>(monthYear, []);

    return (
        <div className="w-full border-b-2">
            <p>{category.name}</p>
        </div>
    )
}
export default CategoryEntry