import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

function CategoryPicker({
  budget,
  category,
  setCategory,
  search
}: {
  budget: any;
  category: any;
  setCategory: any;
  search: any;
}) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-base w-40">
          {category || (search ? "No Filter" : "Uncategorized")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90%]">
        <DialogHeader>
          Choose A Category
        </DialogHeader>
        <ScrollArea className="max-h-[30rem]">
            <div className="flex flex-col gap-4 w-10/12 m-auto">
        {search ? (
          <Button
            className="text-lg"
            onClick={() => {
              setCategory("");
              if (setOpen) setOpen(false);
            }}
            variant="outline"
          >
            No Filter
          </Button>
        ) : (
          ""
        )}
        {budget.map((x) => (
          <Button
            className="text-lg"
            onClick={() => {
              setCategory(x.name);
              if (setOpen) setOpen(false);
            }}
            variant="outline"
          >
            {x.name}
          </Button>
        ))}
        <Button
          className="text-lg"
          onClick={() => {
            setCategory("Ignore");
            if (setOpen) setOpen(false);
          }}
            variant="outline"
        >
          Ignore
        </Button>
        <Button
          className="text-lg"
          onClick={() => {
            setCategory(search ? "Uncategorized" : "");
            if (setOpen) setOpen(false);
          }}
            variant="outline"
        >
          Uncategorized
        </Button>
        </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default CategoryPicker;
