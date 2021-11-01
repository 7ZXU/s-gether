import React from 'react'
import Typography from '@mui/material/Typography';
import studyBackground from "../img/studyBackground.jpg";


import Box from '@mui/material/Box';
function SpecificCard() {
    return (
        <div className = "SpecificCard">
            <Box sx = {{border : 2, borderRadius : 4 , height : "0%", width : "70%" , align :"center"}}>
                <div className = "Imgcenter">
                    <img className="img" src={studyBackground} heigth = "200" width = "200"></img>   
                </div>             
                
                <Typography variant="h5" component="div" align = "center">
                    Wake-up Early
                </Typography>
                <Typography variant="h6" component="div" align = "center">
                    Date : 2021-09 ~ 2021-12 
                </Typography>
                <Typography variant="h6" component="div" align = "center">
                    People : 0/10
                </Typography>
                <Typography variant="h6" component="div" align = "center">
                    Point : 10pt
                </Typography>
            </Box>
            
        </div>
    )
}

export default SpecificCard
