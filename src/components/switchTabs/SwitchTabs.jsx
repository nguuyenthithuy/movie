import React, { useState } from 'react'
import "./style.scss"
const SwitchTabs = ({ data, onTabChange }) => {

    console.log('check data', data);
    console.log("check onTabChange", onTabChange)
    const [selectedTab, setSelectedTab] = useState(0);
    const [left, setLeft] = useState(0);


    const activeTab = (tab, index) => {
        setLeft(index * 100)
        setTimeout(() => {
            setSelectedTab(index)
        }, 300);
        onTabChange(tab, index)
        console.log("check tab", tab)
        console.log("check index", index)
        console.log('check onTabChange1', onTabChange)
        console.log("check selectedTab", setSelectedTab)
    }


    return (
        <div className='switchingTabs'>
            <div className="tabItems">
                {data.map((tab, index) => (
                    <span key={index}
                        className={`tabItem ${selectedTab === index ? "active" : ""}`}
                        onClick={() => activeTab(tab, index)}
                    >
                        {tab}
                    </span>
                ))}
                <span className="movingBg" style={{ left }} />

            </div>
        </div>
    )
}

export default SwitchTabs
