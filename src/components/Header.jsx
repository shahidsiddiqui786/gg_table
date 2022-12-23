import { Box, Button, Stack, Typography } from '@mui/material';
import React, {useEffect} from 'react';


const Header = ({toggleSetting, fetchDataInRange, searchParams, handleDateOperation}) => {
  
    const start = searchParams.get('start') || '2021-05-01';
    const end = searchParams.get('end') || '2021-05-03';

    useEffect(()=>{
        fetchDataInRange(start,end);
    },[]); 
    
    
    const inputStyle = {
        display:'flex',
        flexDirection: 'row-reverse',
        padding: '0.5rem',
        fontSize: 'large'
    }

    return(
        <Box style={{paddingTop:'1rem'}}>
            <Typography variant='h5' fontWeight={'600'}>Analytics</Typography>
            <Stack style={{flexDirection:'row', paddingTop:'1rem', justifyContent:'space-between'}}>
                <Stack style={{flexDirection:'row'}}>
                    <input 
                        style={inputStyle} 
                        type={'date'}
                        value={start}
                        onChange={(e) => 
                        handleDateOperation(e.target.value, end)}
                    />
                    <input 
                        style={inputStyle} 
                        type={'date'}
                        value={end}
                        onChange={(e) => 
                        handleDateOperation(start, e.target.value)}
                    />

                    <Button
                        variant='contained'
                        onClick={() => {
                        fetchDataInRange(start,end)}}
                        style={{marginLeft:'1rem'}}
                    >
                        Fetch
                    </Button>
                </Stack>
                <Button 
                  variant='outlined'
                  className='settingButton'
                  onClick={(e)=>toggleSetting()}
                >
                    Settings
                </Button>
            </Stack>
        </Box>
    );
}

export default Header;
