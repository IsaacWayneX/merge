import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import NotificationComponent from '@/components/sunday/NotificationComponent';
import { themeBtnStyle } from '@/util/mui';
import mtnLogo from "@/assets/images/mtn2.png";
// import { useNavigate } from 'react-router-dom';
import BackNavigationArrowBtn from '@/components/sunday/BackNavigationArrowBtn';



const AdReviewDetailsPage = () => {
    // const navigate = useNavigate();

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
                <BackNavigationArrowBtn />

                <NotificationComponent />
            </Stack>

            <Box mt={5}>
                <Box width="520px" mx="auto">
                    <Box
                        sx={{
                            // maxWidth: "500px",
                            height: "180px",
                            bgcolor: '#cccccc66',
                            borderRadius: "10px"
                        }}
                    >
                        <img 
                            alt='ads Image'
                            src={mtnLogo}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain"
                            }}
                        />
                    </Box>

                    <Box>
                        <ReviewTextDetailsComponent 
                            title='Placement'
                            value='Banner Ads'
                        />

                        <ReviewTextDetailsComponent 
                            title='Section'
                            value='Places'
                        />
                        <ReviewTextDetailsComponent 
                            title='Location'
                            value='Nigeria: Abuja, Lagos Portharcourt'
                        />
                        <ReviewTextDetailsComponent 
                            title='Budget'
                            value='$200'
                        />
                        <ReviewTextDetailsComponent 
                            title='Duration'
                            value='5 Days'
                        />
                        {/* <ReviewTextDetailsComponent 
                            title=''
                            value=''
                        /> */}
                    </Box>

                    <Stack direction="row" gap="20px" flexWrap="wrap" alignItems="start">
                        <Stack direction="row" spacing="10px" alignItems="center">
                            <Button variant="contained" size='small'
                                type="button"
                                onClick={() => { }}
                                
                                sx={{
                                    ...themeBtnStyle,
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    // lineHeight: 14.52px;
                                }}
                            >Accept</Button>

                            <Button variant="contained" size='small'
                                type="button"
                                onClick={() => { }}
                                
                                sx={{
                                    ...themeBtnStyle,

                                    bgcolor: kolors.secondary,
                                    color: kolors.primary,
                                
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    // lineHeight: 14.52px;
                                }}
                            >Reject</Button>
                        </Stack>

                        <Box>
                            <TextField variant="outlined" 
                                type='text'
                                placeholder='Decline note'
                                inputMode='text'
                                size='small'
                                multiline
                                rows={4}
                      
                                sx={{
                                    // ...authMuiTextFieldStyle
                                }}

                                // value={topUpAmount}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    console.log(value);
                                    // setTopUpAmount(value);
                                }}
                            />
                        </Box>
                    </Stack>
                    
                </Box>
            </Box>
            
        </Box>
    );
};

export default AdReviewDetailsPage;


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
                        color: "#595757"
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