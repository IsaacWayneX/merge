import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import kolors from '@/constants/kolors';
import { currencyDisplay, formatedNumber } from '@/util/resources';
// import pinkDiamondIcon from "@/assets/images/stickers/pinkDiamondIcon.png";


interface _Props {
    selectedSticker: {
        id: string;
        name: string;
        icon: string;
        price: string;
        purchase: string;
    },

    editStickerBtn: (editSticker: boolean) => void
};

// const sticker = {
//     id: "1",
//     name: "Pink diamond",
//     icon: pinkDiamondIcon,
//     price: '300',
//     purchase: "30000"
// };


const StickerDetailsComponent: React.FC<_Props> = ({
    selectedSticker, editStickerBtn
}) => {
      
    
    return (
        <Box
            sx={{
                border: `1px solid ${kolors.border}`,
                // bgcolor: "#fff",
                borderRadius: 2,
                p: 1.5,
                my: 3,
                width: "220px"
            }}
        >
            <Typography 
                onClick={() => editStickerBtn(true)}
                sx={{
                    fontWeight: "600",
                    fontSize: "14px",
                    color: kolors.primary,
                    cursor: "pointer",
                    width: "fit-content"
                }}
            >Edit sticker </Typography>

            <Box
                sx={{
                    width: "100px",
                    borderRadius: "8px",
                    bgcolor: "#EFEFEF",
                    textAlign: "center",
                    mx: "auto",
                    my: 2, py: 1,
                }}
            >
                <img 
                    src={selectedSticker.icon} alt='stickers image'
                    style={{
                        // width: "100%",
                        maxWidth: "60px",
                        // borderRadius: "8px",
                        // height: "100%",
                        objectFit: "contain",
                    }}
                />
            </Box>

            <Box>
                <Stack direction="row" spacing="10px" alignItems="center">
                    <Typography
                        sx={{
                            fontWeight: "600",
                            fontSize: "16px",
                            color: kolors.dark,
                        }}
                    >Name: </Typography>

                    <Typography
                        sx={{
                            fontWeight: "400",
                            fontSize: "16px",
                            color: "#595757"
                        }}
                    > Pink diamond</Typography>
                </Stack>

                <Stack direction="row" spacing="10px" alignItems="center">
                    <Typography
                        sx={{
                            fontWeight: "600",
                            fontSize: "16px",
                            color: kolors.dark,
                        }}
                    >Price: </Typography>

                    <Box
                        sx={{
                            py: "10px",
                            px: "20px",
                            bgcolor: kolors.secondary,
                            borderRadius: "12px",
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: "600",
                                fontSize: "16px",
                                color: kolors.primary,
                            }}
                        > { currencyDisplay(Number(selectedSticker.price)) }</Typography>
                    </Box>

                </Stack>

                <Stack direction="row" spacing="10px" alignItems="center">
                    <Typography
                        sx={{
                            fontWeight: "600",
                            fontSize: "16px",
                            color: kolors.dark,
                        }}
                    >Purchase: </Typography>

                    <Typography
                        sx={{
                            fontWeight: "400",
                            fontSize: "16px",
                            color: "#595757"
                        }}
                    > {formatedNumber(Number(selectedSticker.purchase))}</Typography>
                </Stack>
            </Box>
        </Box>
    )
}

export default StickerDetailsComponent;
