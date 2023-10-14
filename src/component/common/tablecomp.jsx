import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

export default function TableComponent({ columns, rows, suffixData }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const createValueTableCells = (row, index) => {
        let tableCells = columns.map((column, ind) => {
            let value = row[column.id];
            return (
                <StyledTableCell key={ind} >{value} </StyledTableCell>
            );
        });


        //arrow icon + "Action"
        if (suffixData) {
            //
            tableCells.push(
                <TableCell
                    key={index + "Action"}
                    sx={{ borderBottom: "none", padding: 1, fontSize: "12px" }} >
                    {
                        row !== undefined && suffixData(row, index)

                    }
                </TableCell>
            );
        }
        return tableCells;
    };
    const createHeadingTableCells = () => {
        
        let tableCells = columns.map((column, ind) => (
            <StyledTableCell
                key={ind}
                sx={{
                    fontWeight: "bold",
                    textAlign: "justify",
                }}
            >
                {column.label}
            </StyledTableCell>
        ));
        //action
        if (suffixData) {
            tableCells.push(
                <StyledTableCell
                    key={"actions"}
                    sx={{
                        padding: "3px",
                        fontSize: "13px",
                        fontWeight: "bold",
                        textAlign: "justify",
                    }}
                ></StyledTableCell>
            );
        }
        //prefix
        // if (prefixType) {
        //   tableCells.unshift(
        //     <TableCell
        //       key={"flag"}
        //       sx={{
        //         padding: "3px",
        //         fontSize: "13px",
        //         fontWeight: "bold",
        //         textAlign: "justify",
        //       }}
        //     ></TableCell>
        //   );
        // }
        return tableCells;
    };
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 480 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <StyledTableRow> {createHeadingTableCells()} </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {createValueTableCells(row)}
                                    </StyledTableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}