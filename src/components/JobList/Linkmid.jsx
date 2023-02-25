import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

// import css
import styles from "./linkmid.module.scss";


// import internal components and methods


const Linkmid = (props) => {
    const { id, link, jdpage } = props.data;



    const dasPoptype = useSelector((state) => state.das.dasPoptype);











    return (
        <div>

            <div >


            </div>
        </div>
    );
};

export default Linkmid;
