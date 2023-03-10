import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import ClientCaseView from './ClientCaseView';
import { getDatabase, ref, child, get } from "firebase/database";


const ClientSearch = () => {
  const [showSearch, setShowSearch] = useState(true);
  const [clientCaseId, setClientCaseId] = React.useState('');
  const [currCaseDetails, setCurrCaseDetails] = React.useState('');

  const GetCaseData = React.useCallback((clientCaseId) => {
    if (true) {
      console.log(clientCaseId)
      const dbRef = ref(getDatabase());
      get(child(dbRef, `Cases/${clientCaseId}`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setCurrCaseDetails(snapshot.val())
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [true])

  const handleClientCaseId = (event) => {
    setClientCaseId(event.target.value);
  };

  const OnSearchClick = () => {
    GetCaseData(clientCaseId)
  };

  useEffect(() => {
    if (currCaseDetails !== '') {
      setShowSearch(false)
    }
  }, [currCaseDetails]);

  const backToSearchBar = () => {
    setShowSearch(true)
  };

  return (
    <>
      {showSearch ?
        <div className='container' style={{ justifyContent: 'center', display: 'grid' }}>
          <TextField id="filled-basic" label='מספר תיק' onChange={handleClientCaseId} variant="filled" />
          <div>
            <button onClick={OnSearchClick} className="btn-casetype" style={{ width: '100%', marginTop: '20px' }}>חפש</button>
          </div>
          {/* <Button onClick={OnSearchClick}  variant="contained">חפש</Button> */}
        </div>
        :
        <>
          <ClientCaseView currCaseDetails={currCaseDetails} backToSearchBar={backToSearchBar}/>
        </>
      }
    </>

  )
}
export default ClientSearch