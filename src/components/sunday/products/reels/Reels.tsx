// import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import kolors from '@/constants/kolors';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import { themeBtnStyle } from '@/util/mui';
// import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
// import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';


interface _Props {
    // performSearch: (searchword: string) => void
};

const ReelsComponent: React.FC<_Props> = ({
    // performSearch
}) => {

    
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
            <Grid container spacing="20px"
                sx={{
                    // justifyContent: "space-between",
                    alignItems: "start",
                    my: 3
                }}
            >

                <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                    <Box>

                    </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 8, md: 9 }}>
                    <Box>

                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ReelsComponent;


