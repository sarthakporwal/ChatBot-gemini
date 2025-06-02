import React from "react";
import "./Main.css";
import { assets } from "../../assets/assets";


const Main = () => {
    return (
        <div className="main">
            <div className="nav">
                <p>ChatBot</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                <div className="greet">
                    <p><span>Hemlooo...</span></p>
                    <p>How can I help u ?</p>
                </div>
                <div className="main-bottom">
                    <div className="search-box">
                        <input type="text" placeholder="Enter text here..."/>
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            <img src={assets.send_icon} alt="" />
                        </div>
                    </div>
                    
                </div>  
            </div>
        </div>
    );
}

export default Main;