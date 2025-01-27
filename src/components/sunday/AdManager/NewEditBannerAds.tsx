import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import kolors from '@/constants/kolors';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

import { themeBtnStyle } from '@/util/mui'; 
import { convertToBase64 } from '@/util/resources';


const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
    {
      label: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    },
    { label: 'The Good, the Bad and the Ugly', year: 1966 },
    { label: 'Fight Club', year: 1999 },
    {
      label: 'The Lord of the Rings: The Fellowship of the Ring',
      year: 2001,
    },
];


const NewEditBannerAdsComponent = () => {
    // const navigate = useNavigate();
    const {_id} = useParams();

    const [value, setValue] = useState<number>(30);

    const handleChange = (_event: Event, newValue: number | number[]) => {
        setValue(newValue as number);

        console.log(_id);
    };
  

    const [iconInputValue, setIconInputValue] = useState('');
    // const [inputIconImage, setInputIconImage] = useState<any>();

    const handleFileUpload = async (e: any) => {
        const file = e.target.files[0]; 
        // setInputIconImage(file);

        const base64 = await convertToBase64(file);
        console.log(base64.result);
        setIconInputValue(base64.result);
    
        e.target.value = "";
    }

    
    return (
        <Box>
            <Box maxWidth="520px" mx="auto">

                <Box
                    sx={{
                        width: "180px",
                        height: "260px",
                        border: `1px solid ${kolors.border}`,
                        borderRadius: "8px",
                        bgcolor: "#EFEFEF66", // "0A000066"
                        textAlign: "center",
                        mx: "auto",
                        my: 2, // py: 1,
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                        // position: "relative",
                    }}
                    onClick={() => {
                        document.getElementById("stickerImage")?.click();
                    }}
                >
                    {
                        iconInputValue ? 
                            <img 
                                src={iconInputValue} alt='stickers image'
                                style={{
                                    width: "100%", // "100%",
                                    height: "100%",
                                    // maxWidth: "100px",
                                    // maxHeight: "100px",
                                    // borderRadius: "8px",
                                    // marginTop: "15px",
                                    margin: "auto",
                                    objectFit: "contain",
                                }}
                            />
                        :
                        <IconButton size='small' sx={{ my: "auto" }}>
                            <CloudUploadOutlinedIcon 
                                sx={{ 
                                    color: kolors.border, 
                                    fontSize: "70px",
                                }} 
                            />
                        </IconButton>
                    }
                </Box>

                {/* <Box sx={{ py: 2 }}>
                    <Typography variant='body1' sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        color: kolors.dark,
                    }}> AD title </Typography>

                    <TextField 
                        variant="outlined" 
                        fullWidth 
                        type='text'
                        inputMode='text'
                        defaultValue=""
                    />
                </Box> */}

                <Box sx={{ py: 2 }}>
                    <Typography variant='body1' sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        color: kolors.dark,
                    }}> AD Link </Typography>

                    <TextField 
                        variant="outlined" 
                        fullWidth 
                        type='text'
                        inputMode='text'
                        defaultValue=""
                    />
                </Box>

                <Box sx={{ py: 2 }}>
                    <Typography variant='body1' sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        color: kolors.dark,
                    }}> Location </Typography>


                    <Autocomplete
                        disablePortal
                        options={top100Films}
                        // sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="" />}
                    />
                </Box>

                {/* <Box sx={{ py: 2 }}>
                    <Typography variant='body1' sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        color: kolors.dark,
                    }}> AD description </Typography>

                    <TextField 
                        variant="outlined" 
                        fullWidth 
                        type='text'
                        inputMode='text'
                        defaultValue=""
                        multiline
                        rows={4}
                    />
                </Box> */}

                <Box sx={{ py: 2 }}>
                    <Typography variant='body1' sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        color: kolors.dark,
                    }}> Set an Duration </Typography>

                    <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }}>
                        <Slider aria-label="Volume" 
                            color='secondary'
                            value={value} 
                            onChange={handleChange} 
                        />
                        
                        <Box
                            sx={{
                                borderRadius: "8px",
                                border: `1px solid ${kolors.border}`,
                                p: 1
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: "400",
                                    fontSize: "13px",
                                    color: kolors.border,
                                }}
                            >Days</Typography>

                            <Typography
                                sx={{
                                    fontWeight: "600",
                                    fontSize: "22px",
                                    color: kolors.primary,
                                }}
                            >10</Typography>
                        </Box>
                    </Stack>
                </Box>

                <Button variant="contained" size='small'
                    fullWidth
                    type="button"
                    onClick={() => { }}
                    
                    sx={{
                        ...themeBtnStyle,
                        fontSize: "16px",
                        fontWeight: "400",
                        // lineHeight: 14.52px;
                    }}
                >Publish</Button>
            </Box>
            
            <input 
                type="file" 
                id='stickerImage' 
                name="stickerImage" 
                accept='image/*' 
                onChange={handleFileUpload}
                style={{display: "none"}}
            />
        </Box>
    );
};

export default NewEditBannerAdsComponent;
