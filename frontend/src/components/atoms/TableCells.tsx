import React from "react";
import { TableCell, TableCellBaseProps } from "@mui/material";



type TableProps = {
  children: React.ReactNode;
};

const TableCells = ({
  children,
  ...rest
}: TableProps & TableCellBaseProps) => {
  return (
            <TableCell
              {...rest}
              sx={{ border: 1, background: "#a2cf6e", borderBlockColor: "#a2cf6e" }}
              align="left"
            >
              {children}
            </TableCell>
  );
};

export default TableCells;
