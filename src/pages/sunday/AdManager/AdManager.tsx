import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddIcon from '@mui/icons-material/Add';
import TuneIcon from '@mui/icons-material/Tune';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import NotificationComponent from '@/components/sunday/NotificationComponent';
import SearchwordComponent from '@/components/sunday/SearchwordComponent';
import { themeBtnStyle } from '@/util/mui';

import mtnLogo from "@/assets/images/mtn2.png";


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
  
function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

const AdManagerPage = () => {
    const navigate = useNavigate();
    const [tabsValue, setTabsValue] = useState(0);

    const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
    const openFilterMenu = Boolean(filterAnchorEl);
    const handleClickFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
      setFilterAnchorEl(event.currentTarget);
    };
    const handleCloseFilter = () => {
      setFilterAnchorEl(null);
    };

    


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
                <SearchwordComponent 
                    performSearch={() => {}}
                />

                <NotificationComponent />
            </Stack>

            <Box mt={5}>
                <Stack direction='row' spacing="10px"
                    alignItems="center" justifyContent="space-between"
                >
                    <Button variant="contained" size='small'
                        type="button"
                        onClick={() => { 
                            navigate("/admin/ad-manager/edit/new")
                        }}
                        
                        sx={{
                            ...themeBtnStyle,
                            fontSize: "12px",
                            fontWeight: "600",
                            // lineHeight: 14.52px;
                        }}
                    >
                        Add Promotion
                        <AddIcon sx={{ fontSize: "16px", ml: 1 }} />
                    </Button>

                    {
                        tabsValue ? 
                            <div>
                                <IconButton size='small'
                                    aria-controls={openFilterMenu ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={openFilterMenu ? 'true' : undefined}
                                    onClick={handleClickFilter}
                                    id="basic-button"
                                >
                                    <TuneIcon sx={{ color: kolors.primary, fontSize: "18px" }} />
                                </IconButton>

                                <Menu
                                    id="basic-menu"
                                    anchorEl={filterAnchorEl}
                                    open={openFilterMenu}
                                    onClose={handleCloseFilter}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={() => {

                                        handleCloseFilter();
                                    }}
                                    >All</MenuItem>
                                    <MenuItem onClick={() => {

                                        handleCloseFilter();
                                    }}
                                    >Inprofile</MenuItem>
                                    <MenuItem onClick={() => {

                                       handleCloseFilter(); 
                                    }}>Banner</MenuItem>
                                </Menu>
                            </div>
                        : <></>
                    }


                </Stack>

                <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 3 }}>
                    <Tabs 
                        value={tabsValue}
                        onChange={(_e, newValue) => {
                            setTabsValue(newValue);
                        }} 
                        aria-label="basic tabs example"
                        textColor="secondary"
                        indicatorColor="secondary"
                      
                    >
                        <Tab label="Ad review" 
                            id="simple-tab-0"
                            aria-controls="simple-tabpanel-0"
                        />

                        <Tab label="Live Ads" 
                            id="simple-tab-1"
                            aria-controls="simple-tabpanel-1"
                        />
                    </Tabs>
                </Box>

                <CustomTabPanel value={tabsValue} index={0}>
                    <List disablePadding >
                        <AdsComponent 
                            onClick={() => navigate("review-details")}
                        />
                        <AdsComponent 
                            onClick={() => navigate("review-details")}
                        />
                        <AdsComponent 
                            onClick={() => navigate("review-details")}
                        />
                        <AdsComponent 
                            onClick={() => navigate("review-details")}
                        />
                    </List>
                </CustomTabPanel>

                <CustomTabPanel value={tabsValue} index={1}>
                    <List disablePadding >
                        <AdsComponent 
                            btnText='View details' 
                            onClick={() => navigate("live-details")}
                        />
                        <AdsComponent 
                            btnText='View details' 
                            onClick={() => navigate("live-details")}
                        />
                        <AdsComponent 
                            btnText='View details' 
                            onClick={() => navigate("live-details")}
                        />
                        <AdsComponent 
                            btnText='View details' 
                            onClick={() => navigate("live-details")}
                        />
                    </List>
                </CustomTabPanel>
            </Box>
            
        </Box>
    );
};

export default AdManagerPage;


interface _Props {
    // performSearch: (searchword: string) => void,
    btnText?: string;
    onClick: (data: any) => void,
};

const AdsComponent: React.FC<_Props> = ({
    btnText = "View", onClick
}) => {


    return (
        <ListItem alignItems="flex-start"
            secondaryAction={
                <Button variant="contained" size='small'
                    type="button"
                    onClick={() => onClick("")}
                    
                    sx={{
                        ...themeBtnStyle,
                        fontSize: "12px",
                        fontWeight: "600",
                        // lineHeight: 14.52px;
                    }}
                >{ btnText }</Button>
            }
        >
            <ListItemButton onClick={() => onClick("")}>
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
            </ListItemButton>
        </ListItem>
    )
}