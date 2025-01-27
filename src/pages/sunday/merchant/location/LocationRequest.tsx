import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import kolors from '@/constants/kolors';
import NotificationComponent from '@/components/sunday/NotificationComponent';
import BackNavigationArrowBtn from '@/components/sunday/BackNavigationArrowBtn';
import placeProvider from "@/assets/images/dashboard/placeProvider.jpeg"
import ModalWrapper from '@/components/ModalWrapper';
import { themeBtnStyle } from '@/util/mui';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';


const LocationRequestPage = () => {
    const navigate = useNavigate();
    const [imagePreviewModal, setImagePreviewModal] = useState(false);


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
                <BackNavigationArrowBtn />

                <NotificationComponent />
            </Stack>

            <Box mt={5}>
                <Box
                    sx={{
                        maxWidth: "570px",
                        borderRadius: "8px",
                        boxShadow: "0px 5px 11px 0px #00000014",
                        p: 2,
                        mx: "auto"
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: "600",
                            fontSize: "24px",
                            color: kolors.dark,
                        }}
                    >Location request</Typography>


                    <Stack direction="row" gap="20px" flexWrap="wrap"
                        my={3}
                        // alignItems="start"
                    >
                        <Box>
                            <Avatar variant="rounded"
                                alt=""
                                src={placeProvider}
                                sx={{ 
                                    width: "100px", height: "100px",
                                    bgcolor: kolors.secondary
                                }}
                            />
                        </Box>

                        <Box>
                            <Typography
                                sx={{
                                    fontWeight: "700",
                                    fontSize: "16px",
                                    color: kolors.dark,
                                    lineHeight: "27.69px"
                                }}
                            >Fine house resturant</Typography>

                            <Typography
                                sx={{
                                    fontWeight: "500",
                                    fontSize: "16px",
                                    color: "#595757",
                                    lineHeight: "27.69px"
                                }}
                            >Abuja, Nigeria</Typography>

                            <Typography
                                sx={{
                                    fontWeight: "400",
                                    fontSize: "13px",
                                    color: "#BCBABA",
                                    lineHeight: "27.69px"
                                }}
                            >Open 8am-10pm(week days)</Typography>

                            <Typography
                                sx={{
                                    fontWeight: "400",
                                    fontSize: "13px",
                                    color: "#BCBABA",
                                    lineHeight: "27.69px"
                                }}
                            >Open 8am-10pm(weekends)</Typography>
                        </Box>
                    </Stack>

                    <Box my={2}>
                        <Typography
                            sx={{
                                fontWeight: "600",
                                fontSize: "13px",
                                lineHeight: "16px",
                                color: kolors.dark,
                                mb: 1
                            }}
                        >Description</Typography>

                        <Typography
                            sx={{
                                fontWeight: "400",
                                fontSize: "13px",
                                lineHeight: "16px",
                                color: "#595757",
                            }}
                        >
                            Lacus sed viverra tellus in hac habitasse platea dictumst. 
                            Malesuada nunc vel risus commodo. 
                            In mollis nunc sed id semper risus in hendrerit. 
                        </Typography>
                    </Box>

                    <Box my={2}>
                        <Typography
                            sx={{
                                fontWeight: "600",
                                fontSize: "13px",
                                lineHeight: "16px",
                                color: kolors.dark,
                                mb: 1,
                            }}
                        >Category</Typography>

                        <Chip label="Resturant" variant="outlined" />
                    </Box>

                    <Box my={2}>
                        <Typography
                            sx={{
                                fontWeight: "600",
                                fontSize: "13px",
                                lineHeight: "16px",
                                color: kolors.dark,
                                mb: 1
                            }}
                        >Reservation options</Typography>
                        
                        <Stack direction="row" gap="15px" flexWrap="wrap" alignItems="center">
                            <Chip label="VIP-$20" variant="outlined" />
                            <Chip label="VVIP-$50" variant="outlined" />
                        </Stack>
                    </Box>

                    <Box my={2}>
                        <Typography
                            sx={{
                                fontWeight: "600",
                                fontSize: "13px",
                                lineHeight: "16px",
                                color: kolors.dark,
                                mb: 1
                            }}
                        >Location image</Typography>
                        
                        <Stack direction="row" gap="15px" flexWrap="wrap">
                            <Avatar variant="rounded"
                                alt=""
                                src={placeProvider}
                                sx={{ 
                                    width: "100px", height: "100px",
                                    bgcolor: kolors.secondary
                                }}
                            />

                            <Avatar variant="rounded"
                                alt=""
                                src={placeProvider}
                                sx={{ 
                                    width: "100px", height: "100px",
                                    bgcolor: kolors.secondary
                                }}
                            />

                            <Avatar variant="rounded"
                                alt=""
                                src={placeProvider}
                                sx={{ 
                                    width: "100px", height: "100px",
                                    bgcolor: kolors.secondary
                                }}
                            />
                        </Stack>
                        
                        <Stack direction="row" gap="15px" flexWrap="wrap" mt={2}>
                            <IconButton size='small'>
                                <InstagramIcon />
                            </IconButton>

                            <IconButton size='small'>
                                <XIcon />
                            </IconButton>

                            <IconButton size='small'>
                                <FacebookIcon />
                            </IconButton>
                        </Stack>
                    </Box>
                    

                    <Stack direction="row" spacing="20px"
                        alignItems="center" mt={5} 
                    >
                        <Typography sx={{ minWidth: "120px" }}
                        > </Typography>


                        <Stack direction='row' gap='20px' alignItems="center">
                            <Button variant="contained" size='small'
                                type="button"
                                onClick={() => { navigate("/admin/merchant/available-merchants") }}
                                
                                sx={{
                                    ...themeBtnStyle,
                                    fontSize: "15px",
                                    fontWeight: "400",
                                    // lineHeight: 14.52px;
                                }}
                            > Accept </Button>

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
                            > Reject </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Box>


            <ModalWrapper 
                closeModal={() => setImagePreviewModal(false)}
                openModal={imagePreviewModal}
            >
                <Box>
                    <img 
                        src={placeProvider} 
                        alt='official Id'
                        style={{
                            width: "100%",
                            // borderRadius: "8px",
                            height: "100%",
                            objectFit: "contain",
                        }}
                    />
                </Box>
            </ModalWrapper>
        </Box>
    );
};

export default LocationRequestPage;
