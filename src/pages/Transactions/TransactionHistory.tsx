import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import useTransactions from "@/services/transactions";
import { useLocalStorage } from "@uidotdev/usehooks";
import TransactionEntry from "./TransactionEntry";

function TransactionHistory({ startDate }: { startDate: Date }) {
  const transactions = useTransactions(startDate);
  console.log("rendering tans hisotry")
  return (
    <div className="w-full ">
      <Table>
        {transactions.map((x) => {
          return <TableBody className="border-b-2 transition-colors hover:bg-muted/50 text-lg">
            <TransactionEntry transaction={x}/>
          </TableBody>
        }
        )}
      </Table>
    </div>
  );
}
export default TransactionHistory;
