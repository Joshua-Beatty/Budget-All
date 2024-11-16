import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

function CategoryPicker({budget, category, setCategory, search, setOpen}: {budget: any, category: any, setCategory: any, search: any, setOpen?: any}){

    return (        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="text-base w-40">{category || (search ? "No Filter" : "Uncategorized")}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent  className="bg-neutral-800">
        { search ? <DropdownMenuItem
            className="text-lg"
            onClick={() => {
              setCategory("");
              if(setOpen)
              setOpen(false);
            }}
          >
            No Filter
          </DropdownMenuItem>
           : ""}
          {budget.map((x) => (
            <DropdownMenuItem
              className="text-lg"
              onClick={() => {
                setCategory(x.name);
                if(setOpen)
                setOpen(false);
              }}
            >
              {x.name}
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem
            className="text-lg"
            onClick={() => {
              setCategory("Ignore");
              if(setOpen)
              setOpen(false);
            }}
          >
            Ignore
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-lg"
            onClick={() => {
              setCategory(search ? "Uncategorized" : "");
              if(setOpen)
              setOpen(false);
            }}
          >
            Uncategorized
          </DropdownMenuItem>
          
          
        </DropdownMenuContent>
      </DropdownMenu>
      )
}

export default CategoryPicker