import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getDatabase, ref, update } from "firebase/database";
import { Select, MenuItem } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import styled from '@emotion/styled';


// FormControl

const FormControler = styled(FormControl)({

    ".MuiFormGroup-root":{
      display: 'flow-root',
      marginTop:'10px'
    }
    })

const EdittedCase = ({ currCaseDetails, currHandlingLawyers, setShowCase, setCurrCaseDetails, currCaseTypeDetails }) => {
    const [clientName, setClientName] = React.useState(currCaseDetails.ClientName);
    const [currStage, setCurrStage] = React.useState(currCaseDetails.CurrStage);
    const [handlingLawyer, setHandlingLawyer] = React.useState(currCaseDetails.Lawyer);
    const [statusValue, setStatusValue] = React.useState(currCaseDetails.Status);
    const handleChangeStatus = (event) => {
      setStatusValue(event.target.value);
    };
    const handleNewClientName = (event) => {
        setClientName(event.target.value);
    };
    const handleNewCurrStage = (event) => {
        setCurrStage(event.target.value);
    };
    const handleHandlingLawyer = (event) => {
        setHandlingLawyer(event.target.value);
    };
    const lawyersList = Object.values(currHandlingLawyers)
    const caseTypeList = Object.entries(currCaseTypeDetails)
    const temp = caseTypeList.filter(item => item[0] == currCaseDetails.CaseType)
    console.log(temp)

    function updateCase() {
        const db = getDatabase();
        let plaster = 'Cases/' + currCaseDetails.CaseNum;
        update(ref(db, plaster), {
            ClientName: clientName,
            CurrStage: Number(currStage),
            Lawyer: handlingLawyer,
            Status: Number(statusValue),
        })
        setShowCase(true)
        setCurrCaseDetails()
        alert("?????? ?????????? ????????????")
    }

    return (
        <div style={{display:'grid' , textAlign:'center'} }>
            
            <div>
                <label>???????? ??????</label>
                <input  type='text'
                className='input'
                id="casenum"
                defaultValue={currCaseDetails.CaseNum}
                disabled
                />
            </div>

            <div>
            <label>???? ??????????</label>
                <input  type='text'
                className='input'
                id="clientname"
                label="???? ????????"
                defaultValue={clientName}
                // disabled
                onChange={handleNewClientName}
                
                />
            </div>

            <div>
            <label>?????? ????????</label>
                <input  type='text'
                className='input'
                id="caseType"
                label="?????? ????????"
                defaultValue={currCaseDetails.CaseType}
                disabled
                // onChange={handleNewClientName}
                
                />
            </div>
           




            {/* <TextField
                disabled
                multiline
                margin="dense"
                id="casenum"
                label="???????? ??????"
                fullWidth
                variant="standard"
                defaultValue={currCaseDetails.CaseNum}
            /> */}
            {/* <TextField
                multiline
                margin="dense"
                id="casenum"
                label="???? ????????"
                fullWidth
                variant="standard"
                defaultValue={clientName}
                onChange={handleNewClientName}
            /> */}
            {/* <TextField
                disabled
                multiline
                margin="dense"
                id="casenum"
                label="?????? ??????"
                fullWidth
                variant="standard"
                defaultValue={currCaseDetails.CaseType}
            /> */}


            
            <div style={{marginTop:'10px'}}>

            <label style={{fontSize:'17px',fontWeight:'bold',color:'#523A28', marginLeft:'12px'}}>?????? ??????????</label>
            <Select
                sx={{width:'20%',height:'45px',borderRadius:'4px',border:'1px solid rgb(208, 180, 159)'}}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currStage}
                label="?????? ??????????"
                onChange={handleNewCurrStage}
                
            >
                {temp[0][1].map((stage, index) => (<MenuItem value={index}>{index}</MenuItem>))}
            </Select>
            </div>

            <div style={{marginTop:'10px',marginRight:'19px'}}>

            <label style={{fontSize:'17px',fontWeight:'bold',color:'#523A28', marginLeft:'12px'}}>???????? ??????</label>
            <Select
                sx={{width:'20%',height:'45px',borderRadius:'4px',border:'1px solid rgb(208, 180, 159)'}}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={handlingLawyer}
                label="???????? ?????? ????????"
                onChange={handleHandlingLawyer}
                
            >
                {lawyersList.map((lawyer) => (<MenuItem value={lawyer}>{lawyer}</MenuItem>))}
            </Select>
            </div>


            <FormControler >
                {/* <FormLabel id="demo-controlled-radio-buttons-group">?????????? ??????</FormLabel> */}
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={statusValue}
                    onChange={handleChangeStatus}
                >
                    <label style={{fontSize:'17px',fontWeight:'bold',color:'#523A28', marginLeft:'12px'}}>?????????? ??????</label>
                    <FormControlLabel value="1" control={<Radio color='success' />} label="????????" />
                    <FormControlLabel value="0" control={<Radio color='error' />} label="????????" />
                </RadioGroup>
            </FormControler>
            {/* <Button onClick={updateCase}>???????? ??????</Button> */}

            <div>
                <button onClick={updateCase} className="btn-casetype" style={{marginTop:'20px',width:'33%'}}>???????? ??????</button>
            </div>

        </div>
    )
}

export default??EdittedCase