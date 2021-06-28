import React from 'react';
import appStyles from './App.css';
import styles from './index.module.css';
import appStyles1 from './app.module.css';

console.log(appStyles, styles, appStyles1);

function App(props) {
    return (<div className={styles.foo}>
        <div>
            <h2>Welcome to React App</h2>
            <h3>Date : {new Date().toDateString()}</h3>
        </div>
    </div>)
}

export default App
