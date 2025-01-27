import React from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { themeBtnStyle } from '@/util/mui';


interface _Props {
    // title: "Merchant order" | "Bondyt order";
    // // value: number, 
    // setView: (view: "list" | "details") => void
};

const MerchantTopOptionsComponent: React.FC<_Props> = ({
    // title, setView
}) => {
    const navigate = useNavigate();


    return (
        <Stack direction='row' gap='10px' flexWrap="wrap" mt={5}
            alignItems="center" justifyContent="space-between"
        >
            <Stack direction='row' gap='20px' alignItems="center">
                <Button variant="contained" size='small'
                    type="button"
                    onClick={() => { }}
                    
                    sx={{
                        ...themeBtnStyle,
                        fontSize: "15px",
                        fontWeight: "400",
                        // lineHeight: 14.52px;
                    }}
                > Block merchant </Button>

                <Button variant="contained" size='small'
                    type="button"
                    onClick={() => { }}
                    
                    sx={{
                        ...themeBtnStyle,

                        bgcolor: kolors.secondary,
                        color: kolors.primary,

                        "&:hover": {
                            bgcolor: kolors.secondary,
                            color: kolors.primary
                        },
                        "&:active": {
                            bgcolor: kolors.primary,
                            color: "#fff"
                        },
                        "&:focus": {
                            bgcolor: kolors.secondary,
                            color: kolors.primary
                        },

                        fontSize: "15px",
                        fontWeight: "400",
                        // lineHeight: 14.52px;
                    }}
                > Delete account </Button>
            </Stack>

            <Box>
                <Typography 
                    onClick={() => {
                        navigate({
                            pathname: "/admin/merchant/pending-merchant-deatils",
                            search: `?${createSearchParams({ viewType: "credentials" })}`,
                        });
                    }}
                    sx={{
                        fontWeight: "400",
                        fontSize: "16px",
                        color: kolors.primary,
                        cursor: "pointer",
                    }}
                >View Credentials</Typography>
            </Box>
        </Stack>
    );
}

export default MerchantTopOptionsComponent;