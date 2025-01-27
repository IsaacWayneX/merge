import React from 'react';
// import { useState } from 'react';
// import { Outlet, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import kolors from '@/constants/kolors';
import Typography from '@mui/material/Typography';


interface _Props {
    // menuItems: {
    //     title: string;
    //     status: boolean;
    //     baseLink: string;
    // }[],
    // value: number, 
    // setValue: (data: number) => void
};

const LastSeenCardComponent: React.FC<_Props> = ({
    // menuItems, value, setValue
}) => {
    // const navigate = useNavigate();


    return (
        <Box 
            sx={{
                p: 2,
                border: `1px solid ${kolors.border}`,
                borderRadius: "8px",
                width: "230px",
                alignSelf: "stretch",
                // height: "130px",
            }}
        >
            <Box my="auto" height="100%">
                <Typography
                    sx={{
                        fontWeight: "600",
                        fontSize: "13px",
                        color: kolors.border,
                    }}
                >Last seen</Typography>

                <Typography
                    sx={{
                        fontWeight: "600",
                        fontSize: "40px",
                        color: kolors.dark
                    }}
                >51 min</Typography>

            </Box>
        </Box>
    );
}

export default LastSeenCardComponent;