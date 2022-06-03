import React from "react";


const ShearPathShear = ({ X0, Y0, ShearPathStr }) => {


    return (
        <>
            <path d={`M ${X0} ${Y0} ${ShearPathStr} z`} fill="rgba(128, 128, 128, 0.2)" stroke="black" strokeWidth={1}/>
        </>
    );

}

export default ShearPathShear;