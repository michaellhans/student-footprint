import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Tag } from 'antd';

// third-party
import NumberFormat from 'react-number-format';

function createData(NIM, name, numCourses, level, emission) {
    return { NIM, name, numCourses, level, emission };
}

const rows = [
    createData(13518001, 'Chandrika Azharyanti', 22, 2, 40570),
    createData(13518002, 'Aqil Abdul Aziz Syafiq', 24, 0, 180139),
    createData(13518003, 'Dimas Lucky Mahendra', 15, 1, 90989),
    createData(13518004, `Qurrata A'Yuni`, 18, 1, 10239),
    createData(13518005, 'Arung Agamani Budi Putera', 16, 1, 83348),
    createData(13518006, 'Ahadi Ihsan Rasyidin', 19, 0, 410780),
    createData(13518007, 'Ade Surya Handika', 20, 2, 70999),
    createData(13518008, 'Hasna Roihan Nafiisah', 21, 2, 10570),
    createData(13518009, 'Aufa Fadhlurohman', 23, 1, 98063),
    createData(13518010, 'Moh. Mirza Maulana Ikhsan', 20, 0, 14001)
];

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

const headCells = [
    {
        id: 'NIM',
        align: 'left',
        disablePadding: false,
        label: 'NIM'
    },
    {
        id: 'name',
        align: 'left',
        disablePadding: true,
        label: 'Student Name'
    },
    {
        id: 'numCourses',
        align: 'left',
        disablePadding: false,
        label: 'Courses taken'
    },
    {
        id: 'emission',
        align: 'left',
        disablePadding: false,
        label: 'Total Emission'
    },
    {
        id: 'level',
        align: 'left',
        disablePadding: false,
        label: 'Emission Level'
    }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function EmissionTableHead({ order, orderBy }) {
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
    const [order] = useState('asc');
    const [orderBy] = useState('NIM');
    const [selected] = useState([]);

    const isSelected = (NIM) => selected.indexOf(NIM) !== -1;

    return (
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
                    <EmissionTableHead order={order} orderBy={orderBy} />
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
                                            {row.NIM}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="left">{row.name}</TableCell>
                                    <TableCell align="left">{row.numCourses}</TableCell>
                                    <TableCell align="left">
                                        <NumberFormat value={row.emission} displayType="text" thousandSeparator />
                                        &nbsp;kg CO<sub>2</sub>
                                    </TableCell>
                                    <TableCell align="center">
                                        <OrderStatus status={row.level} />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
