import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import kolors from '@/constants/kolors';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { themeBtnStyle } from '@/util/mui';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { Typography } from '@mui/material';

import candyIcon from "@/assets/images/stickers/candyIcon.png";
import cupIcon from "@/assets/images/stickers/cupIcon.png";
// import duckIcon from "@/assets/images/stickers/duckIcon.png";
import gamerIcon from "@/assets/images/stickers/gamerIcon.png";
import globalIcon from "@/assets/images/stickers/globalIcon.png";
import happyIcon from "@/assets/images/stickers/happyIcon.png";
// import mysteryBoxIcon from "@/assets/images/stickers/mysteryBoxIcon.png";
import oxygenIcon from "@/assets/images/stickers/oxygenIcon.png";
import pinkDiamondIcon from "@/assets/images/stickers/pinkDiamondIcon.png";
import ringStickerIcon from "@/assets/images/stickers/ringStickerIcon.png";
import { currencyDisplay } from '@/util/resources';
import StickerDetailsComponent from './StickerDetails';
import Grid from '@mui/material/Grid2';
import StickerDetailsEditComponent from './StickerDetailsEdit';
import { UploadStickerModal } from './UploadStickerModal';



interface _Props {
    // performSearch: (searchword: string) => void
};

const _stickersList = [
    {
        id: "1",
        name: "Pink diamond",
        icon: pinkDiamondIcon,
        price: '300',
        purchase: "30000"
    },
    {
        id: "2",
        name: "Happy",
        icon: happyIcon,
        price: '20',
        purchase: "120000"
    },
    {
        id: "3",
        name: "Cup of coffee",
        icon: cupIcon,
        price: '43',
        purchase: "792000"
    },
    {
        id: "4",
        name: "Candy",
        icon: candyIcon,
        price: '35',
        purchase: "5000"
    },
    {
        id: "5",
        name: "Global",
        icon: globalIcon,
        price: '90',
        purchase: "3000"
    },
    {
        id: "6",
        name: "Oxygen",
        icon: oxygenIcon,
        price: '120',
        purchase: "40"
    },
    {
        id: "7",
        name: "Bagle",
        icon: ringStickerIcon,
        price: '10',
        purchase: "90090"
    },
    {
        id: "8",
        name: "Gamer",
        icon: gamerIcon,
        price: '150',
        purchase: "97"
    },
];

const StickersComponent: React.FC<_Props> = ({
    // performSearch
}) => {
    const [stickers, setStickers] = useState(_stickersList);
    const [selectedSticker, setSelectedStickers] = useState(_stickersList[0]);
    const [editStickerState, setEditStickerState] = useState(false);
      
    const [uploadStickerModal, setUploadStickerModal] = useState(false);

    useEffect(() => {
        setStickers(_stickersList);
    }, [])
    

    
    return (
        <Box
            sx={{
                border: `1px solid ${kolors.border}`,
                // bgcolor: "#fff",
                borderRadius: 2,
                p: 1.5,
                my: 3
            }}
        >
            <Button variant="contained" size='small'
                type="button"
                onClick={() => setUploadStickerModal(true)}
                
                sx={{
                    ...themeBtnStyle,
                    fontSize: "12px",
                    fontWeight: "600",
                    // lineHeight: 14.52px;
                }}
            >
                Update sticker pack 
                <CloudUploadOutlinedIcon sx={{ fontSize: "16px", ml: 1 }} />
            </Button>

            <Grid container spacing="20px"
                sx={{
                    justifyContent: "space-between",
                    alignItems: "start",
                    my: 3
                }}
            >
                <Grid size={{ xs: 12, sm: 8, md: 9 }}>
                    <Box>
                        <Stack direction="row" gap="10px" flexWrap="wrap" 
                            alignItems="center"
                        >
                            {
                                stickers.map((item, index) => (
                                    <Box key={index}
                                        onClick={() => setSelectedStickers(item)}
                                    >
                                        <StickerItemCardComponent 
                                            stickerItem={item}
                                            activeStickers={selectedSticker}
                                        />
                                    </Box>
                                ))
                            }
                        </Stack>
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                    <Box>
                        {
                            editStickerState ? 
                                <StickerDetailsEditComponent 
                                    selectedSticker={selectedSticker}
                                    deleteStickerBtn={(sticker: typeof selectedSticker) => {
                                        console.log(sticker);

                                        setEditStickerState(false);
                                    }}
                                    saveStickerBtn={(oldSticker: typeof selectedSticker, newData) => {
                                        console.log(oldSticker);
                                        const newStickerData = {
                                            name: newData.name,
                                            icon: newData.icon,
                                            price: newData.price,
                                            image: newData.image,
                                        };
                                        console.log(newStickerData);


                                        setEditStickerState(false);
                                    }}
                                />
                            :
                            <StickerDetailsComponent 
                                selectedSticker={selectedSticker}
                                editStickerBtn={() => setEditStickerState(true)}
                            />
                        }
                    </Box>
                </Grid>
            </Grid>

            <UploadStickerModal 
                openUploadStickerModal={uploadStickerModal}
                closeUploadStickerModal={() => setUploadStickerModal(false)}
            />
        </Box>
    )
}

export default StickersComponent;




interface StickerItem_Props {
    stickerItem: typeof _stickersList[0]
    activeStickers: typeof _stickersList[0]
    // setActiveSticker: (searchword: string) => void
};

const StickerItemCardComponent: React.FC<StickerItem_Props> = ({
    stickerItem, activeStickers,
    // setActiveSticker
}) => {
    const [activeItem, setActiveItem] = useState(false);

    useEffect(() => {
        if (stickerItem.name == activeStickers.name) {
            setActiveItem(true);
        } else {
            setActiveItem(false);
        }
    }, [activeStickers])
    

    return (
        <Box
            sx={{
                // border: `1px solid ${kolors.border}`,
                bgcolor: activeItem ? kolors.secondary : "#fff",
                borderRadius: "8px",
                p: 1.5,
                width: "130px",
                textAlign: "center",

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                // justifyItems: "center"

                cursor: "pointer",
            }}
        >
            <Box
                sx={{
                    maxWidth: "60px",
                }}
            >
                <img 
                    src={stickerItem.icon} alt='stickers image'
                    style={{
                        width: "100%",
                        // borderRadius: "8px",
                        // height: "100%",
                        objectFit: "contain",
                    }}
                />
            </Box>

            <Box mt={1}>
                <Typography
                    sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        // lineHeight: "19px",
                        color: activeItem ? kolors.primary : kolors.border,
                        textAlign: "center"
                    }}
                >{ stickerItem.name }</Typography>

                <Typography
                    sx={{
                        fontWeight: "400",
                        fontSize: "14px",
                        // lineHeight: "19px",
                        color: activeItem ? kolors.primary : kolors.border,
                        textAlign: "center"
                    }}
                >{ currencyDisplay(Number(stickerItem.price)) }</Typography>
            </Box>
        </Box>
    )
}