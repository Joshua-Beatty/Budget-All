import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import useTransactions from "@/services/transactions";

function TransactionHistory({ startDate }: { startDate: Date }) {
  const transactions = useTransactions(startDate);
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <div className="w-full ">
      <Table>
        {transactions.map((x) => {
          const date = new Date(x.date)
          date.setDate(date.getDate() + 1)
          const amount = Number(x.amount) * (x.account.type == "credit" ? -1 : 1)
          return <TableBody className="border-b-2 transition-colors hover:bg-muted/50 text-lg">
            <TableRow className="border-0" disableHover={true}>
              <TableCell className="w-24">{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</TableCell>
              <TableCell className="overflow-hidden">{x.details.counterparty?.name || x.account.name}</TableCell>
              <TableCell ><DropdownMenu>
                <DropdownMenuTrigger asChild><Button variant="outline">Groceries</Button></DropdownMenuTrigger>
                <DropdownMenuContent >
                  <DropdownMenuItem className="text-lg">Groceries</DropdownMenuItem>
                  <DropdownMenuItem className="text-lg">Billing</DropdownMenuItem>
                  <DropdownMenuItem className="text-lg">Team</DropdownMenuItem>
                  <DropdownMenuItem className="text-lg">Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              </TableCell>
              <TableCell className={`${amount < 0 ? "" : "text-green-600"}`}>{format.format(amount)}</TableCell>
            </TableRow>
          </TableBody>
        }
        )}
      </Table>
    </div>
  );
}
export default TransactionHistory;
