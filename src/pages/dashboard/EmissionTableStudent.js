import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Link, Stack, Table, Grid, Skeleton, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Tag } from 'antd';

// third-party
import NumberFormat from 'react-number-format';
import { formattedDate } from 'utils/format';

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
        id: 'nim',
        align: 'left',
        disablePadding: false,
        label: 'NIM'
    },
    {
        id: 'courses',
        align: 'left',
        disablePadding: true,
        label: 'Courses'
    },
    {
        id: 'commuting',
        align: 'left',
        disablePadding: false,
        label: 'Commuting'
    },
    {
        id: 'outclass',
        align: 'left',
        disablePadding: false,
        label: 'Outclass'
    },
    {
        id: 'total',
        align: 'left',
        disablePadding: false,
        label: 'Total Emission'
    }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function EmissionTableStudentHead({ headCells, order, orderBy }) {
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

EmissionTableStudentHead.propTypes = {
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

const url = 'http://127.0.0.1:5000/summary';

EmissionTableStudent.propTypes = {
    startDate: PropTypes.object,
    endDate: PropTypes.object
};

export default function EmissionTableStudent({ startDate, endDate }) {
    const [rows, setRows] = useState([]);

    const [order] = useState('asc');
    const [orderBy] = useState('total');
    const [selected] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const params = new URLSearchParams({
                level: 'student',
                start_date: startDate && formattedDate(startDate),
                end_date: endDate && formattedDate(endDate)
            });
            try {
                const response = await fetch(`${url}?${params.toString()}`);
                if (response.ok) {
                    const res = await response.json();
                    setRows(res.data);
                    setIsLoading(false);
                } else {
                    console.error('Error: ', response.status);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Error: ', error);
            }
        };
        setIsLoading(true);
        fetchData();
    }, [startDate, endDate]);

    const isSelected = (NIM) => selected.indexOf(NIM) !== -1;
    if (isLoading) {
        return (
            <Grid item xs={12}>
                <Skeleton variant="rounded" height={1000} sx={{ width: 1 / 1 }} />
            </Grid>
        );
    } else
        return (
            rows.length > 0 && (
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
                            <EmissionTableStudentHead headCells={headCells} order={order} orderBy={orderBy} />
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
                                            <TableCell align="left">
                                                <NumberFormat
                                                    value={row.courses_emission.toFixed(2)}
                                                    displayType="text"
                                                    thousandSeparator
                                                />
                                                &nbsp;kg CO<sub>2</sub>e
                                            </TableCell>
                                            <TableCell align="left">
                                                <NumberFormat
                                                    value={row.commuting_emission.toFixed(2)}
                                                    displayType="text"
                                                    thousandSeparator
                                                />
                                                &nbsp;kg CO<sub>2</sub>e
                                            </TableCell>
                                            <TableCell align="left">
                                                <NumberFormat
                                                    value={row.outclass_emission.toFixed(2)}
                                                    displayType="text"
                                                    thousandSeparator
                                                />
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
