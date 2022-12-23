import { Card, Typography, Stack, Button } from '@mui/material';
import React from 'react'

import { nameList } from './Constants'


const Setting = ({toggleSetting, useTableHeader, handleTableOperation}) => {
  

  const toggleCheck = (event, element) => {

    if(element.id === 'app_id' || element.id === 'date')
      return;

    if(element.p) event.target.style.borderLeft = '1px solid #ddd8d8';
    else event.target.style.borderLeft = '0.3rem solid #136fed';

    const index = useTableHeader.findIndex((ele) => ele.id === element.id);
    useTableHeader[index].p = !useTableHeader[index].p;
  }

  return (
    <Card style={{padding:'1.5rem',marginTop:'1rem'}}>
     <Typography variant='h7' fontWeight={'500'}>Dimensions and Metrics</Typography> 
     <Stack style={{flexDirection:'row', paddingTop:'1rem'}}>
     {
        useTableHeader.map((element) => {
          return(
            <Button 
              key={element.id} 
              variant={'outlined'}
              onClick={(event) => toggleCheck(event,element)}
              style={{
               border:'1px solid #ddd8d8',
               borderLeft:(element.p ? '0.3rem solid #136fed' : '1px solid #ddd8d8'),
               marginRight:'1rem',
               color:'grey'
              }}
            >
             {nameList.get(element.id)}
            </Button>
          );
        })
      }
     </Stack>

      <Stack 
        style={{
          flexDirection:'row', 
          paddingTop:'1rem', 
          paddingRight:'2.3rem',
          justifyContent:'flex-end'
        }}
      >
        <Button 
          variant='outlined'
          style={{marginRight:'1rem'}}
          onClick={(e)=>toggleSetting()}
        >
          Close
        </Button>
        <Button
          variant='contained'
          onClick={(e) => {
           toggleSetting();  
           handleTableOperation([...useTableHeader]);
          }}
        >
          Apply Changes
        </Button>
      </Stack>
    </Card>
  )
}

export default Setting;
