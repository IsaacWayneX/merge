import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import IconButton from '@mui/material/IconButton';

import NotificationComponent from '@/components/sunday/NotificationComponent';
import { themeBtnStyle } from '@/util/mui';
import mtnLogo from "@/assets/images/mtn2.png";


const LiveAdDetailsPage = () => {
    const navigate = useNavigate();

    return (
        <Box mb={5}
            sx={{
                border: `1px solid ${kolors.border}`,
                bgcolor: "#fff",
                borderRadius: 2,
                p: 2,
                my: 3
            }}
        >
            <Stack direction='row' gap='10px' flexWrap="wrap"
                alignItems="center" justifyContent="space-between"
            >
                <IconButton size='small' onClick={() => navigate(-1)}>
                    <NavigateBeforeIcon sx={{ fontSize: "24px" }} />
                </IconButton>

                <NotificationComponent />
            </Stack>

            <Box mt={5}>
                <Stack direction="row" gap="10px" flexWrap="wrap"
                    alignItems="start" justifyContent="space-between"
                >
                    <Box 
                        sx={{
                            // flexBasis: {xs: "100%", sm: "70%", md: "60%"},
                            maxWidth: {xs: "100%", sm: "70%", md: "60%"},
                        }}
                    >
                        <ListItem alignItems="flex-start" disablePadding>
                            <ListItemAvatar>
                                <Avatar variant="square"
                                    alt="ads manager" 
                                    src={mtnLogo}
                                    sx={{ 
                                        width: "auto", 
                                        height: "auto",
                                        objectFit: "contain",
                                        maxWidth: "100px", 
                                        maxHeight: "70px",
                                    }}
                                />
                            </ListItemAvatar>

                            <Box px={2}>
                                <ListItemText
                                    primary="MTN every where you go"
                                    secondary="Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat sit quibusdam quas possimus. Ullam blanditiis aut tempora debitis placeat in eligendi fugit? Aut aperiam et natus voluptatibus harum iusto tempore?"
                                />
                            </Box>
                        </ListItem>
                    </Box>

                    <Box
                        sx={{
                            // flexBasis: {sm: "14%", md: "19%"},
                            maxWidth: {sm: "14%", md: "19%"},
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: "600",
                                fontSize: "16px",
                                color: kolors.dark,
                            }}
                        >Oct 18, 2024- Ongoing</Typography>

                        <Typography
                            sx={{
                                fontWeight: "600",
                                fontSize: "16px",
                                color: kolors.dark,
                            }}
                        >Inprofile ads</Typography>
                    </Box>

                    <Box
                        sx={{
                            // flexBasis: {sm: "13%", md: "18%"},
                            width: "fit-content"
                        }}
                    >
                        <Button variant="contained" size='small'
                            type="button"
                            onClick={() => {
                                navigate("/admin/ad-manager/edit/12345678")
                            }}
                            
                            sx={{
                                ...themeBtnStyle,
                                bgcolor: kolors.secondary,
                                fontSize: "15px",
                                fontWeight: "400",
                                // lineHeight: 14.52px;
                                color: kolors.primary
                            }}
                        >Edit</Button>
                    </Box>
                </Stack>

                <Typography
                    sx={{
                        fontWeight: "600",
                        fontSize: "20px",
                        color: kolors.dark,
                    }}
                >Results</Typography>

                <Box
                    sx={{
                        border: `1px solid ${kolors.border}`,
                        borderRadius: "8px",
                        p: 2
                    }}
                >
                    <Stack direction="row" alignItems="center" spacing="20px">
                        <Stack direction="row" alignItems="center" spacing="20px"  
                            sx={{
                                border: `1px solid ${kolors.border}`,
                                p: 1,
                                borderRadius: "8px"
                            }}
                        >
                            <Box
                                sx={{
                                    bgcolor: kolors.secondary,
                                    px: "10px", py: "5px",
                                    borderRadius: "8px",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: "600",
                                        fontSize: "13px",
                                        color: kolors.primary,
                                    }}
                                >Men</Typography>
                            </Box>

                            <Typography
                                sx={{
                                    fontWeight: "600",
                                    fontSize: "16px",
                                    color: kolors.dark
                                }}
                            >1,319</Typography>
                        </Stack>

                        <Stack direction="row" alignItems="center" spacing="20px"  
                            sx={{
                                border: `1px solid ${kolors.border}`,
                                p: 1,
                                borderRadius: "8px"
                            }}
                        >
                            <Box
                                sx={{
                                    bgcolor: kolors.secondary,
                                    px: "10px", py: "5px",
                                    borderRadius: "8px",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: "600",
                                        fontSize: "13px",
                                        color: kolors.primary,
                                    }}
                                >Women</Typography>
                            </Box>

                            <Typography
                                sx={{
                                    fontWeight: "600",
                                    fontSize: "16px",
                                    color: kolors.dark
                                }}
                            >1,319</Typography>
                        </Stack>
                    </Stack>

                    <Box my={2}>
                        <ReviewTextDetailsComponent 
                            title='Link clicks'
                            value='100,000'
                        />
                        <ReviewTextDetailsComponent 
                            title='Cost per click'
                            value='$0.5'
                        />
                        <ReviewTextDetailsComponent 
                            title='Reach'
                            value='38,283'
                        />
                        <ReviewTextDetailsComponent 
                            title='Impressions'
                            value='38,283'
                        />
                        <ReviewTextDetailsComponent 
                            title='Locations'
                            value='Nigeria: Abuja, Lagos Portharcourt'
                        />

                    </Box>

                    <FormControlLabel
                        control={
                            <Switch 
                                // focusVisibleClassName=".Mui-focusVisible" 
                                disableRipple 
                                sx={(_theme) => ({
                                    '& .MuiSwitch-switchBase': {
                                        transitionDuration: '300ms',
                                        '&.Mui-checked': {
                                            transform: 'translateX(16px)',
                                            color: kolors.primary,
                                            '& + .MuiSwitch-track': {
                                                backgroundColor: kolors.secondary,
                                            }
                                        }
                                    }
                                })}
                            />

                        }
                        label="Switch off AD"
                    />
                </Box>


            </Box>
            
        </Box>
    );
};

export default LiveAdDetailsPage;


interface ReviewText_Props {
    title: string;
    value: string;
};

const ReviewTextDetailsComponent: React.FC<ReviewText_Props> = ({
    title, value
}) => {

    return (
        <Box>
            <Stack direction="row" spacing="20px"
                alignItems="center" my={2} 
            >
                <Typography
                    sx={{
                        fontWeight: "400",
                        fontSize: "16px",
                        color: "#595757",
                        flexBasis: "120px"
                    }}
                >{ title }: </Typography>

                <Typography
                    sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        color: kolors.dark,
                    }}
                > { value }</Typography>
            </Stack>
        </Box>
    )
}