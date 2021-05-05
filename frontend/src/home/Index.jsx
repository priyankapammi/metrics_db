import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Dashboard</h1>
            <div className="wrapper">
                <div className="icons">
                    <div className="icons-text">
                        <a href="http://10.57.71.82:8501/" target="_blank">EIP NLP</a>
                    </div>
                </div>
                <div className="icons">
                    <div className="icons-text">
                        <a href="https://bp365.sharepoint.com/SitePages/Home.aspx" target="_blank">BP</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Home };