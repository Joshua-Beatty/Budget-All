import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import useTransactions from "@/services/transactions";

function TransactionHistory({ startDate }: { startDate: Date }) {
  const transactions = useTransactions(startDate);
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <div className="w-full">
      <Table>
        {transactions.map((x) => (
          <TableBody className="border-b-2 transition-colors hover:bg-muted/50">
            <TableRow className="border-0" disableHover={true}>
              <TableCell>{x.date}</TableCell>
              <TableCell>{format.format(Number(x.amount))}</TableCell>
              <TableCell>{x.details.category}</TableCell>
            </TableRow>
            <TableRow disableHover={true}>
                <TableCell>{x.account.name}</TableCell>
              <TableCell colSpan={2}>{x.description}</TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>
  );
}
export default TransactionHistory;
