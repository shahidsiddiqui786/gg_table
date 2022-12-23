import { useSearchParams } from 'react-router-dom';

//React Redux
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import { getData } from './actions/dataFetch';

//Components
import Header from './components/Header';
import Setting from './components/Setting';
import Table from './components/Table';

//Constants, Service
import { tableHeaderList } from './components/Constants';
import { encrypt, decrypt } from './components/Service';
import { Card, Container, Typography } from '@mui/material';
import { useState } from 'react';


const App = ({data:{data},getData}) => {

  const [openSetting, setOpenSetting] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const useTableHeader = decrypt(searchParams.get('tableheader') || encrypt(tableHeaderList));
 
  const toggleSetting = () => {
    setOpenSetting(!openSetting);
  }

  const fetchDataInRange = (start,end)=> {
    getData(start,end);
  }

  const handleSearchParams =(start, end, headerlist)=>{
    setSearchParams({start:start, end:end, tableheader:encrypt(headerlist)});
  }

  const handleTableOperation =(headerlist) => {
    let start = searchParams.get('start') || '2021-05-01';
    let end = searchParams.get('end') || '2021-05-03';
    handleSearchParams(start, end, headerlist);
  }

  const handleDateOperation = (start, end) => {
    let list = [];

    if(searchParams.get('tableheader') === null)
     list = tableHeaderList;
    else
     list = decrypt(searchParams.get('tableheader')); 

    handleSearchParams(start, end, list);
  }

  return(
    <Container>
      <Header 
        toggleSetting={toggleSetting} 
        fetchDataInRange={fetchDataInRange} 
        searchParams={searchParams} 
        handleDateOperation={handleDateOperation}
      />
      {openSetting && 
      <Setting 
        toggleSetting={toggleSetting} 
        useTableHeader={useTableHeader} 
        handleTableOperation={handleTableOperation} 
      />
      }
      {data ?
      <Table 
        data={data} 
        useTableHeader={useTableHeader} 
        handleTableOperation={handleTableOperation} 
      />
      :
      <Card
       style={{
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:'0.5rem',
        background:`url('https://cdn.dribbble.com/userupload/2905354/file/original-92212c04a044acd88c69bedc56b3dda2.png?compress=1&resize=1000x550')`
       }}
      >
      </Card>
      }
    </Container>
  )
}

App.propTypes = {
  data: PropTypes.object.isRequired,
  getData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps,{getData})(App);
