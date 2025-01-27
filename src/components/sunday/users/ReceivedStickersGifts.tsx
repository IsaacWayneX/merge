import React from 'react';
// import { useState } from 'react';
// import { Outlet, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import kolors from '@/constants/kolors';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import pinkDiamond from "@/assets/images/stickers/pinkDiamondIcon.png";
import gamer from "@/assets/images/stickers/gamerIcon.png";
import oxygen from "@/assets/images/stickers/oxygenIcon.png";
import iphone13 from "@/assets/images/gifts/iphone13.jpeg";


interface _Props {
    // menuItems: {
    //     title: string;
    //     status: boolean;
    //     baseLink: string;
    // }[],
    // value: number, 
    // setValue: (data: number) => void
};

const ReceivedStickersGiftsComponent: React.FC<_Props> = ({
    // menuItems, value, setValue
}) => {
    // const navigate = useNavigate();


    return (
        <Box 
            sx={{
                p: 2,
                // alignSelf: "stretch",
            }}
        >
            <Box>
                <Box
                    sx={{
                        borderRadius: "8px",
                        border: `0.5px solid ${kolors.border}`,
                        bgcolor: "#F8F8F8",
                        p: 1
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: "600",
                            fontSize: "13px",
                            color: kolors.border,
                        }}
                    >Received Stickers</Typography>
                </Box>

                <Stack direction="row" gap="10px" my={2}
                    alignItems="center" flexWrap="wrap"
                >
                    <Box 
                        sx={{
                            width: "80px",
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: "600",
                                fontSize: "13px",
                                color: kolors.primary,
                                top: 0,
                                right: 0,
                                textAlign: "right"
                            }}
                        >10x</Typography>

                        <Box>
                            <img 
                                src={pinkDiamond} 
                                alt="Received Stickers" 
                                style={{ width: "80%", objectFit: "contain" }} 
                            />
                        </Box>

                        <Box textAlign="center">
                            <Typography
                                sx={{
                                    fontWeight: "600",
                                    fontSize: "13px",
                                    color: kolors.border,
                                    lineHeight: "14.52px"
                                }}
                            >Pink diamond</Typography>

                            <Typography
                                sx={{
                                    fontWeight: "600",
                                    fontSize: "13px",
                                    color: kolors.border,
                                }}
                            >$10</Typography>
                        </Box>
                         
                    </Box>

                    <Box 
                        sx={{
                            width: "80px",
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: "600",
                                fontSize: "13px",
                                color: kolors.primary,
                                top: 0,
                                right: 0,
                                textAlign: "right"
                            }}
                        >1x</Typography>

                        <Box>
                            <img 
                                src={oxygen} 
                                alt="Received Stickers" 
                                style={{ width: "80%", objectFit: "contain" }} 
                            />
                        </Box>

                        <Box textAlign="center">
                            <Typography
                                sx={{
                                    fontWeight: "600",
                                    fontSize: "13px",
                                    color: kolors.border,
                                    lineHeight: "14.52px"
                                }}
                            >Pink diamond</Typography>

                            <Typography
                                sx={{
                                    fontWeight: "600",
                                    fontSize: "13px",
                                    color: kolors.border,
                                }}
                            >$10</Typography>
                        </Box>
                         
                    </Box>
                    
                    <Box 
                        sx={{
                            width: "80px",
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: "600",
                                fontSize: "13px",
                                color: kolors.primary,
                                top: 0,
                                right: 0,
                                textAlign: "right"
                            }}
                        >4x</Typography>

                        <Box>
                            <img 
                                src={gamer} 
                                alt="Received Stickers" 
                                style={{ width: "80%", objectFit: "contain" }} 
                            />
                        </Box>

                        <Box textAlign="center">
                            <Typography
                                sx={{
                                    fontWeight: "600",
                                    fontSize: "13px",
                                    color: kolors.border,
                                    lineHeight: "14.52px"
                                }}
                            >Pink diamond</Typography>

                            <Typography
                                sx={{
                                    fontWeight: "600",
                                    fontSize: "13px",
                                    color: kolors.border,
                                }}
                            >$10</Typography>
                        </Box>
                         
                    </Box>

                </Stack>

            </Box>

            <Box mt={3}>
                <Box
                    sx={{
                        borderRadius: "8px",
                        border: `0.5px solid ${kolors.border}`,
                        bgcolor: "#F8F8F8",
                        p: 1
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: "600",
                            fontSize: "13px",
                            color: kolors.border,
                        }}
                    >Received Gifts</Typography>
                </Box>

                <Stack direction="row" gap="10px" my={2}
                    alignItems="center" flexWrap="wrap"
                >

                    <Box maxWidth="100px">
                        <Box
                            sx={{
                                maxWidth: "80px",
                                maxHeight: "80px",
                                borderRadius: "8px",
                                overflow: "hidden"
                            }}
                        >
                            <img 
                                src={iphone13} alt='gifts'
                                style={{
                                    width: "100%",
                                    // borderRadius: "8px",
                                    // height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </Box>

                        <Typography
                            sx={{
                                fontWeight: "600",
                                fontSize: "13px",
                                lineHeight: "14.52px",
                                color: kolors.border,
                                mt: 1,
                                textAlign: "center"
                            }}
                        >Iphone 13 pro</Typography>
                    </Box>

                </Stack>

            </Box>
        </Box>
    );
}

export default ReceivedStickersGiftsComponent;