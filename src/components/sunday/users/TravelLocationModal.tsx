import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import kolors from '@/constants/kolors';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PlaceIcon from '@mui/icons-material/Place';



interface _Props {
    openTravelLocationsModal: boolean,
    closeTravelLocationsModal: (state: boolean) => void,
    travelLocations: string[],
}

export const TravelLocationModal: React.FC<_Props> = ({
    openTravelLocationsModal, closeTravelLocationsModal, travelLocations
}) => {
 
    

    return (
        <Modal
            open={openTravelLocationsModal}
            onClose={() => closeTravelLocationsModal(false) }
            aria-labelledby="payout-modal-title"
            aria-describedby="payout-modal-description"
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",

                    outline: "none",

                    // position: 'absolute',
                    // top: '50%',
                    // left: '50%',
                    // transform: 'translate(-50%, -50%)',

                    // maxWidth: {xs: "92%", sm: "496px"},
                }}
            >
                <Box p={2}
                    sx={{
                        bgcolor: "#fff",
                        width: "100%",
                        maxWidth: {xs: "92%", sm: "496px"},
                        // maxHeight: "605px",
                        maxHeight: "95%",
                        borderRadius: "12px",
                        // p: "25px",
                        color: kolors.dark,
                        overflow: "scroll"
                    }}
                >
                    <Box id='payout-modal-title'>
                        <Stack direction="row" spacing="20px"
                            alignItems="center" justifyContent="space-between"
                        >
                            <Typography
                                sx={{
                                    fontWeight: "400",
                                    fontSize: "13px",
                                    lineHeight: "16px",
                                    // textAlign: "center",
                                }}
                            >Travel mode locations</Typography>

                            <IconButton onClick={() => closeTravelLocationsModal(false)}>
                                <CloseIcon sx={{color: kolors.primary, fontSize: "20px"}} />
                            </IconButton>
                        </Stack>
                    </Box>

                    <Box id='payout-modal-description'>
                        <List dense={false}>
                            {
                                travelLocations.map((location, index) => (
                                    <ListItem key={index}>
                                        <ListItemIcon>
                                            <PlaceIcon sx={{ color: kolors.primary, fontSize: "18px" }}/>
                                        </ListItemIcon>
                                        
                                        <ListItemText
                                            primary={location}
                                        />
                                    </ListItem>
                                ))
                                
                            }
                        </List> 
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}
