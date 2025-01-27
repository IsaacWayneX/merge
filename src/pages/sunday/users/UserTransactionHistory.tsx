// import { useNavigate } from 'react-router-dom';
// import { useUserStore } from '@/state/userStore';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';

import NotificationComponent from '@/components/sunday/NotificationComponent';
import SearchwordComponent from '@/components/sunday/SearchwordComponent';
import Chip from '@mui/material/Chip';
import BackNavigationArrowBtn from '@/components/sunday/BackNavigationArrowBtn';



const UserTransactionHistoryPage = () => {
    // const navigate = useNavigate();
    
    const handleSearch = (searchword: string) => {
        console.log(searchword);

    }


    return (
        <Box mb={5}
            sx={{
                border: `1px solid ${kolors.border}`,
                bgcolor: "#fff",
                borderRadius: 2,
                p: 1.5,
                my: 3
            }}
        >
            <Stack direction='row' gap='10px' flexWrap="wrap"
                alignItems="center" justifyContent="space-between"
            >
                <SearchwordComponent 
                    performSearch={(searchword) => handleSearch(searchword)}
                />

                <NotificationComponent />
            </Stack>

            <Stack direction='row' spacing='10px' mt={3}
                alignItems="center" justifyContent="space-between"
            >
                <BackNavigationArrowBtn />

                <Box></Box>
            </Stack>


            <Box mt={5}>
                <Box>
                    <TableContainer>
                        <Table aria-label="Users table">
                            <TableHead>
                                <TableRow 
                                    sx={{ 
                                        bgcolor: kolors.bg,
                                        border: `1px solid ${kolors.border}`,
                                    }}
                                >
                                    <TableCell>Topup</TableCell>
                                    <TableCell>Withdrawal</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Status </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        $500
                                    </TableCell>
                                    
                                    <TableCell>$500</TableCell>
                                    <TableCell>21/8/2024</TableCell>
                                    <TableCell>
                                        <Chip 
                                            label="Complete"
                                            size='small' color="success"
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        $500
                                    </TableCell>
                                    
                                    <TableCell> </TableCell>
                                    <TableCell>21/8/2024</TableCell>
                                    <TableCell>
                                        <Chip 
                                            label="Pending"
                                            size='small' color="warning"
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>

                        </Table>
                    </TableContainer>
                </Box>
            </Box>
            
            
        </Box>
    );
};

export default UserTransactionHistoryPage;
