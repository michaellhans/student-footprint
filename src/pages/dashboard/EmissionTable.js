import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Tag } from 'antd';

// third-party
import NumberFormat from 'react-number-format';
import { useSelector } from '../../../node_modules/react-redux/es/exports';
import { longFormattedDate } from 'utils/format';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

function generateHeadCells(keys) {
    let headCells = [];
    keys.forEach(function (item) {
        headCells.push({
            id: item,
            align: 'left',
            disablePadding: false,
            label: item
        });
    });
    return headCells;
}

// ==============================|| ORDER TABLE - HEADER ||============================== //

function EmissionTableHead({ headCells, order, orderBy }) {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EmissionTableHead.propTypes = {
    headCells: PropTypes.array,
    order: PropTypes.string,
    orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const OrderStatus = ({ status }) => {
    let color;
    let title;

    switch (status) {
        case 0:
            color = 'warning';
            title = 'Medium';
            break;
        case 1:
            color = 'success';
            title = 'Low';
            break;
        case 2:
            color = 'error';
            title = 'High';
            break;
        default:
            color = 'primary';
            title = 'None';
    }

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Tag color={color}>{title}</Tag>
        </Stack>
    );
};

OrderStatus.propTypes = {
    status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

export default function EmissionTable() {
    const student = useSelector((state) => state.student);
    const [rows, setRows] = useState(student.cf_history);
    const [isLoading, setIsLoading] = useState(true);
    const dateKeys = ['Date', 'courses_emission', 'commuting_emission', , 'outclass_emission', 'total_emission'];

    const [order] = useState('asc');
    const [orderBy] = useState('NIM');
    const [selected] = useState([]);

    useEffect(() => {
        setRows(student.cf_history);
        if (rows.length > 0) {
            setIsLoading(false);
        }
    }, [student]);

    const isSelected = (NIM) => selected.indexOf(NIM) !== -1;

    return (
        !isLoading && (
            <Box>
                <TableContainer
                    sx={{
                        width: '100%',
                        overflowX: 'auto',
                        position: 'relative',
                        display: 'block',
                        maxWidth: '100%',
                        '& td, & th': { whiteSpace: 'nowrap' }
                    }}
                >
                    <Table
                        aria-labelledby="tableTitle"
                        sx={{
                            '& .MuiTableCell-root:first-child': {
                                pl: 2
                            },
                            '& .MuiTableCell-root:last-child': {
                                pr: 3
                            }
                        }}
                    >
                        <EmissionTableHead headCells={generateHeadCells(dateKeys)} order={order} orderBy={orderBy} />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
                                const isItemSelected = isSelected(row.NIM);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.NIM}
                                        selected={isItemSelected}
                                    >
                                        <TableCell component="th" id={labelId} scope="row" align="left">
                                            <Link color="secondary" component={RouterLink} to="">
                                                {longFormattedDate(row.date)}
                                            </Link>
                                        </TableCell>
                                        <TableCell align="left">
                                            <NumberFormat value={row.total_emission.toFixed(2)} displayType="text" thousandSeparator />
                                            &nbsp;kg CO<sub>2</sub>e
                                        </TableCell>
                                        <TableCell align="left">
                                            <NumberFormat value={row.total_emission.toFixed(2)} displayType="text" thousandSeparator />
                                            &nbsp;kg CO<sub>2</sub>e
                                        </TableCell>
                                        <TableCell align="left">
                                            <NumberFormat value={row.total_emission.toFixed(2)} displayType="text" thousandSeparator />
                                            &nbsp;kg CO<sub>2</sub>e
                                        </TableCell>
                                        <TableCell align="left">
                                            <NumberFormat value={row.total_emission.toFixed(2)} displayType="text" thousandSeparator />
                                            &nbsp;kg CO<sub>2</sub>e
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        )
    );
}
