import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
function MonthChanger({ date, setDate }) {
  const today = new Date();
  return (
    <div className="flex justify-center items-center">
      <Button
        variant="outline"
        onClick={() => {
          date.setMonth(date.getMonth() - 1);
          setDate(new Date(+date));
        }}
        className="float-right"
      >
        <SlArrowLeft />
      </Button>
      <p className="pl-3 pr-3 min-w-36 text-center">
        {date.toLocaleDateString("default", { month: "long", year: "numeric" })}
      </p>
      <Button
        variant="outline"
        onClick={() => {
          date.setMonth(date.getMonth() + 1);
          setDate(new Date(+date));
        }}
        disabled={today.getMonth() == date.getMonth()}
        className="float-right"
      >
        <SlArrowRight />
      </Button>
    </div>
  );
}
export default MonthChanger;
