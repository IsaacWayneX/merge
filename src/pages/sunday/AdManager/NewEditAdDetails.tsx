import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';

import NotificationComponent from '@/components/sunday/NotificationComponent';
// import mtnLogo from "@/assets/images/mtn2.png";
import NewEditBannerAdsComponent from '@/components/sunday/AdManager/NewEditBannerAds';
import NewEditInprofileAdsComponent from '@/components/sunday/AdManager/NewEditInprofileAds';


// const top100Films = [
//     { label: 'The Shawshank Redemption', year: 1994 },
//     { label: 'The Godfather', year: 1972 },
//     { label: 'The Godfather: Part II', year: 1974 },
//     { label: 'The Dark Knight', year: 2008 },
//     { label: '12 Angry Men', year: 1957 },
//     { label: "Schindler's List", year: 1993 },
//     { label: 'Pulp Fiction', year: 1994 },
//     {
//       label: 'The Lord of the Rings: The Return of the King',
//       year: 2003,
//     },
//     { label: 'The Good, the Bad and the Ugly', year: 1966 },
//     { label: 'Fight Club', year: 1999 },
//     {
//       label: 'The Lord of the Rings: The Fellowship of the Ring',
//       year: 2001,
//     },
// ];

function toggleStringInArray(array: string[], newValue: string) {
    // Find the index of the string in the array
    const index = array.indexOf(newValue);
    
    if (index === -1) {
      // If the string does not exist, add it
      array.push(newValue);
    } else {
      // If the string exists, remove it
      array.splice(index, 1);
    }
  
    return array;
}

const bannerAdsValue = ["Places", "Books", "Events"];

const NewEditAdDetailsPage = () => {
    const navigate = useNavigate();
    // const {_id} = useParams();

    const [selectedPlacement, setSelectedPlacement] = useState("Placement");
    const [bannerAdsLocation, setBannerAdsLocation] = useState<string[]>([]);
    // const [value, setValue] = useState<number>(30);

    // const handleChange = (_event: Event, newValue: number | number[]) => {
    //     setValue(newValue as number);

    //     console.log(_id);
        
    // };
  

    const [placementAnchorEl, setPlacementAnchorEl] = useState<null | HTMLElement>(null);
    const openPlacementMenu = Boolean(placementAnchorEl);
    const handleClickPlacement = (event: React.MouseEvent<HTMLButtonElement>) => {
        setPlacementAnchorEl(event.currentTarget);
    };
    const handleClosePlacement = () => {
        setPlacementAnchorEl(null);
    };

    // const [iconInputValue, setIconInputValue] = useState('');
    // // const [inputIconImage, setInputIconImage] = useState<any>();


    // const handleFileUpload = async (e: any) => {
    //     const file = e.target.files[0]; 
    //     // setInputIconImage(file);

    //     const base64 = await convertToBase64(file);
    //     console.log(base64.result);
    //     setIconInputValue(base64.result);
    
    //     e.target.value = "";
    // }


    
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

                <Box>
                    <Button
                        id="placement-button"
                        aria-controls={openPlacementMenu ? 'placement-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openPlacementMenu ? 'true' : undefined}
                        onClick={handleClickPlacement}
                    > { selectedPlacement } </Button>

                    <Menu
                        id="placement-menu"
                        anchorEl={placementAnchorEl}
                        open={openPlacementMenu}
                        onClose={handleClosePlacement}
                        MenuListProps={{
                            'aria-labelledby': 'placement-button',
                        }}
                    >
                        <MenuItem>
                            <Box>
                                <Stack direction="row" spacing="20px" 
                                    alignItems="center" justifyContent="space-between"
                                    onClick={() => {
                                        setSelectedPlacement("Banner ads")
                                        setBannerAdsLocation(bannerAdsValue);
                                        setPlacementAnchorEl(null);
                                    }}
                                >
                                    <Typography>Banner ads</Typography>

                                    <Checkbox 
                                        checked={selectedPlacement == "Banner ads" ? true : false}
                                        sx={{
                                            color: "#D9D9D9",
                                            '&.Mui-checked': {
                                                color: kolors.primary,
                                            },
                                        }}
                                    />
                                </Stack>
                                
                                <Box>
                                    { 
                                        bannerAdsValue.map((item, index) => (
                                            <MenuItem key={index} component="div">
                                                <Stack direction="row" spacing="20px" 
                                                    alignItems="center" justifyContent="space-between"
                                                    onClick={() => { 
                                                        const newLocations = toggleStringInArray(bannerAdsLocation, item);
                                                        setBannerAdsLocation(newLocations);
                                                        setSelectedPlacement("Banner ads")
                                                        setPlacementAnchorEl(null);
                                                    }}
                                                >
                                                    <Typography>{item}</Typography>

                                                    <Checkbox 
                                                        checked={bannerAdsLocation.includes(item) ? true : false}
                                                        size='small'
                                                        sx={{
                                                            color: "#D9D9D9",
                                                            '&.Mui-checked': {
                                                                color: kolors.primary,
                                                            },
                                                        }}
                                                    />
                                                </Stack>
                                            </MenuItem>
                                        ))
                                    }
                                </Box>
                            </Box>
                        </MenuItem>

                        <MenuItem>
                            <Stack direction="row" spacing="20px" 
                                alignItems="center" justifyContent="space-between"
                                onClick={() => {
                                    setSelectedPlacement("Inprofile Ads")
                                    setBannerAdsLocation([]);
                                    setPlacementAnchorEl(null);
                                }}
                            >
                                <Typography>Inprofile Ads</Typography>

                                <Checkbox 
                                    checked={selectedPlacement == "Inprofile Ads" ? true : false}
                                    sx={{
                                        color: "#D9D9D9",
                                        '&.Mui-checked': {
                                            color: kolors.primary,
                                        },
                                    }}
                                />
                            </Stack>
                        </MenuItem>
                    </Menu>
                </Box>


                <Box maxWidth="520px" mx="auto">
                    {
                        selectedPlacement == "Inprofile Ads" ?
                            <NewEditInprofileAdsComponent />
                        :
                            <NewEditBannerAdsComponent />
                    }

                </Box>
            </Box>
        </Box>
    );
};

export default NewEditAdDetailsPage;
