import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { DH_CHECK_P_NOT_SAFE_PRIME } from 'constants';


function createData(img,name, startDate, endDate,max_participants, current_pariticipants, fee, id) {
    return { img,name, startDate, endDate, max_participants,current_pariticipants, fee , id};
  }
 
function StudyList(props) {
    const {setCard} = props;
    const [dataList, setdata] = useState([]);
    useEffect(async  ()=>{
        const response = axios
        .get("http://localhost:5000/api/getChallengeList", {
    
        })
        .then((response) => {
            setdata(response['data']['data'])
        
        })
        .catch((error) => {
            console.log(error);
        });
    },[])
    const rows = [];

    const handleClick = (rows, key) => {
        setCard(rows[key])

    }

    for(var i = 0; i < dataList.length; i++){
        const data = dataList[i]
        if(data['category'] === "Study"){
            if(typeof data['startDate'] != "undefined" && typeof data['endDate'] != "undefined" ){
                rows.push(createData(data['img'],data['name'],  data['startDate'].split('T')[0], data['endDate'].split('T')[0], data['max_participants'], 
                data['current_participants'],data['fee'], data['id']))
            }
        }
    }

    

    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Chanllenge Name</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row, key) => (
                <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <button onClick = {(e) => handleClick(rows, key)}>
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                </button>
                <TableCell >{row.startDate}</TableCell>
                <TableCell >{row.endDate}</TableCell>
             
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}

export default StudyList
