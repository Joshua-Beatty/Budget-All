import { useEffect, useState } from "react";
import Tabs from "../Tabs";
import { Button } from "@/components/ui/button";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import MonthChanger from "../Components/MonthChanger";
import BudgetCreator from "./BudgetCreator";
function Budget() {
  const [currDate, setCurrDate] = useState(new Date());
  const [currUTCDate, setCurrUTCDate] = useState(new Date());
  useEffect(() => {
    const newDate = new Date(+currDate);
    setCurrUTCDate(
      new Date(
        `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`
      )
    );
    console.log("Updating currUTC date");
    console.log(
      currUTCDate,
      `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`
    );
  }, [currDate]);

  return (
    <Tabs title="Budget">
      <BudgetCreator date={currDate} >
      <div className="w-full ">
        <MonthChanger date={currDate} setDate={setCurrDate} />
      </div></BudgetCreator>
    </Tabs>
  );
}
export default Budget;
