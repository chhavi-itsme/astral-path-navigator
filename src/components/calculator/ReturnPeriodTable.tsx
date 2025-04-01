
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReturnPeriod } from '@/types/saturn-calculator-types';

interface ReturnPeriodTableProps {
  title: string;
  ageRange: string;
  periods: ReturnPeriod[];
}

const ReturnPeriodTable: React.FC<ReturnPeriodTableProps> = ({ 
  title, 
  ageRange, 
  periods 
}) => {
  return (
    <div className="overflow-x-auto">
      <Table className="border rounded-md">
        <TableHeader className="bg-secondary/50">
          <TableRow>
            <TableHead className="text-center">Age</TableHead>
            <TableHead className="text-center">{title} ({ageRange})</TableHead>
            <TableHead className="text-center">Return chart</TableHead>
            <TableHead className="text-center">Transits x Natal ch.</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {periods.map((period, index) => (
            <TableRow key={`period-${index}`} className={index % 2 === 0 ? "bg-accent/5" : ""}>
              <TableCell className="text-center">{period.age}</TableCell>
              <TableCell className="text-center">
                {period.date} <span className="text-xs text-muted-foreground">{period.time}</span>
              </TableCell>
              <TableCell className="text-center">
                <Button variant="link" className="text-accent hover:text-accent/80 p-0">
                  Return chart{index === 1 ? " (R)" : ""}
                </Button>
              </TableCell>
              <TableCell className="text-center">
                <Button variant="link" className="text-accent hover:text-accent/80 p-0">
                  Transits x Natal ch.
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReturnPeriodTable;
