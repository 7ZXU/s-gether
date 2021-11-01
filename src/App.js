import React from "react";
import {Route, Switch} from "react-router-dom";
import ChanllengePage from "./pages/ChanllengePage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={ChanllengePage}/>
            
            </Switch>
        </div>
    )
};

export default App;