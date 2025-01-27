import { useState } from 'react';
// import { useUserStore } from '@/state/userStore';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import VerifiedIcon from '@mui/icons-material/Verified';
import TableContainer from '@mui/material/TableContainer';
import SearchwordComponent from '@/components/sunday/SearchwordComponent';
import NotificationComponent from '@/components/sunday/NotificationComponent';
import CustomBgTab, { menuItemsInterface } from '@/components/sunday/dashboard/CustomBgTab';
import { useNavigate } from 'react-router-dom';



const UsersPage = () => {
    const navigate = useNavigate();

    const [usersTypeMenuItems, setUsersTypeMenuItems] = useState([
        {
            label: "All",
            active: true,
        },
        {
            label: "Free",
            active: false,
        },
        {
            label: "Premium",
            active: false,
        },
        {
            label: "Verified",
            active: false,
        },
        {
            label: "Not verified",
            active: false,
        },
    ]);
    
    const handleSearch = (searchword: string) => {
        console.log(searchword);

    }
    
    const handleUsersTypeMenuItems = (menuItems: menuItemsInterface) => {
        const newMenuItems = usersTypeMenuItems.filter((item) => {
            if (menuItems.label != item.label) {
                item.active = false;
            } else {
                item.active = true;
            }
            return item
        });
        setUsersTypeMenuItems(newMenuItems);

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


            <Box mt={5}>
                <Box>
                    <Typography
                        sx={{
                            fontWeight: "600",
                            fontSize: "16px",
                            lineHeight: "19.36px",
                            color: kolors.dark,
                        }}
                    >Users</Typography>

                    <Typography
                        sx={{
                            fontWeight: "400",
                            fontSize: "16px",
                            lineHeight: "19.36px",
                            color: kolors.border,
                        }}
                    >Track user signup</Typography>
                </Box>

                <Box
                    sx={{
                        border: `1px solid ${kolors.border}`,
                        borderRadius: "8px",
                        p: 2, my: 2,
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: "600",
                            fontSize: "12px",
                            color: kolors.tertiary,
                        }}
                    >Total users</Typography>

                    <Typography
                        sx={{
                            fontWeight: "600",
                            fontSize: "40px",
                            color: kolors.primary,
                        }}
                    >10,000</Typography>

                    <Box mt={3} width={{xs: "100%", sm: "80%", md: "70%", lg: "50%"}}>
                        <Typography
                            sx={{
                                fontWeight: "400",
                                fontSize: "12px",
                                color: kolors.tertiary,
                            }}
                        >Select by user type</Typography>

                        <CustomBgTab 
                            menuItems={usersTypeMenuItems} 
                            action={(item) => handleUsersTypeMenuItems(item)}
                        />
                    </Box>

                </Box>
                

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
                                    <TableCell>Name</TableCell>
                                    <TableCell>Location</TableCell>
                                    <TableCell>Gender</TableCell>
                                    <TableCell>Age </TableCell>
                                    <TableCell>Account type</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                <TableRow hover
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    onClick={() => navigate("/admin/users/_id_2345654321")}
                                >
                                    <TableCell component="th" scope="row">
                                        <Stack direction='row' spacing="5px"
                                            alignItems="center"
                                        >
                                            <Stack direction="row" spacing="5px" alignItems="center">
                                                <Typography
                                                    sx={{
                                                        fontWeight: "600"
                                                    }}
                                                >Joshua</Typography>

                                                <VerifiedIcon
                                                    sx={{
                                                        fontSize: "18px",
                                                        color: kolors.primary,
                                                    }}
                                                />

                                            </Stack>
                                        </Stack>
                                    </TableCell>
                                    
                                    <TableCell>South, london</TableCell>
                                    <TableCell>Male</TableCell>
                                    <TableCell>27</TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontWeight: "700",
                                                fontSize: "16px",
                                                background: "linear-gradient(80.09deg, #9D5900 3.97%, #F7C028 53.75%, #B88C08 97.81%)",
                                                WebkitBackgroundClip: "text",
                                                backgroundClip: "text",
                                                WebkitTextFillColor: "transparent",
                                            }}
                                        >Premium</Typography>
                                    </TableCell>
                                </TableRow>

                                <TableRow hover
                                    onClick={() => navigate("/admin/users/_id_2345654321")}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Stack direction='row' spacing="5px"
                                            alignItems="center"
                                        >
                                            <Stack direction="row" spacing="5px" alignItems="center">
                                                <Typography
                                                    sx={{
                                                        fontWeight: "600"
                                                    }}
                                                >Joshua</Typography>

                                                <VerifiedIcon
                                                    sx={{
                                                        fontSize: "18px",
                                                        color: kolors.primary,
                                                    }}
                                                />

                                            </Stack>
                                        </Stack>
                                    </TableCell>
                                    
                                    <TableCell>South, london</TableCell>
                                    <TableCell>Male</TableCell>
                                    <TableCell>27</TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontWeight: "700",
                                                fontSize: "16px",
                                                color: kolors.primary,
                                                // background: "linear-gradient(80.09deg, #9D5900 3.97%, #F7C028 53.75%, #B88C08 97.81%)",
                                                // WebkitBackgroundClip: "text",
                                                // backgroundClip: "text",
                                                // WebkitTextFillColor: "transparent",
                                            }}
                                        >Free</Typography>
                                    </TableCell>
                                </TableRow>
                                
                                <TableRow hover
                                    onClick={() => navigate("/admin/users/_id_2345654321")}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Stack direction='row' spacing="5px"
                                            alignItems="center"
                                        >
                                            <Stack direction="row" spacing="5px" alignItems="center">
                                                <Typography
                                                    sx={{
                                                        fontWeight: "600"
                                                    }}
                                                >Joshua</Typography>
                                            </Stack>
                                        </Stack>
                                    </TableCell>
                                    
                                    <TableCell>South, london</TableCell>
                                    <TableCell>Male</TableCell>
                                    <TableCell>27</TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontWeight: "700",
                                                fontSize: "16px",
                                                color: kolors.primary,
                                                // background: "linear-gradient(80.09deg, #9D5900 3.97%, #F7C028 53.75%, #B88C08 97.81%)",
                                                // WebkitBackgroundClip: "text",
                                                // backgroundClip: "text",
                                                // WebkitTextFillColor: "transparent",
                                            }}
                                        >Free</Typography>
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

export default UsersPage;
