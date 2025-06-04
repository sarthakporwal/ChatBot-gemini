import React, {useContext} from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";


const Main = () => {

    const {onSent, recentPrompts, showResult, loading, resultData, input, setInput} = useContext(Context);

    return (
        <div className="main">
            <div className="nav">
                <p>ChatBot</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">

                {!showResult
                ?<>
                    <div className="greet">
                        <p><span>Hemlooo...</span></p>
                        <p>How can I help u ?</p>
                    </div>
                </>
                :<div className='result'>
                    <div className="result-title">
                        <img src={assets.user_icon} alt="" width={30} />
                        <p>{recentPrompts}</p>
                    </div>
                    <div className="result data">
                        <img src={assets.ulip_icon} alt="" />
                        {loading
                            ? <div className="loader">
                                <hr />
                            </div>
                            : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                        }       
                    </div>
                 </div>   
                } 

                
                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder="Enter text here..."/>
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input?<img onClick={() => onSent()} src={assets.send_icon} alt="" />:null}
                        </div>
                    </div>
                    
                </div>  
            </div>
        </div>
    );
}

export default Main;