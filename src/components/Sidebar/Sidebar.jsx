import React, {useState, useContext} from "react";
import "./Sidebar.css"; 
import {assets} from "../../assets/assets.js";
import { Context} from "../../context/Context";

const Sidebar = () => {

    const [extended, setExtended] = useState(false);
    const { onSent, previousPrompts, setRecentPrompts, newChat } = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompts(prompt);
        await onSent(prompt);
    }
    

    return (
      <div className="sidebar">
        <div className="top">
          <img
            onClick={() => setExtended((prev) => !prev)}
            className="menu"
            src={assets.menu_icon}
            alt=""
          />
          <div onClick={()=> newChat()} className="new-chat">
            <img src={assets.plus_icon} alt="" />
            {extended ? <p>New Chat</p> : null}
          </div>
          {extended ? (
            <div className="recent">
              <p className="recent title">Recent</p>
              {previousPrompts && previousPrompts.length > 0 ? (
                previousPrompts.map((item, index) => (
                  <div onClick={() => loadPrompt(item)} className="recent-entry" key={index}>
                    <img src={assets.message_icon} alt="" />
                    <p>{item.slice(0, 18)}...</p>
                  </div>
                ))
              ) : (
                <p>No recent prompts</p>
              )}
            </div>
          ) : null}
        </div>
        <div className="bottom">
          <div className="bottom-icon recent-entry">
            <img src={assets.question_icon} alt="" />
            {extended ? <p>Help</p> : null}
          </div>
          <div className="bottom-icon recent-entry">
            <img src={assets.history_icon} alt="" />
            {extended ? <p>Activity</p> : null}
          </div>
          <div className="bottom-icon recent-entry">
            <img src={assets.setting_icon} alt="" />
            {extended ? <p>Settings</p> : null}
          </div>
        </div>
      </div>
    );
}

export default Sidebar;