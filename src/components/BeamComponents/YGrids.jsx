import React from "react";

const YGrids = ({ X0, Y0, Y1, position }) => {

    return (
        <g className="YGrids">
            <line x1={X0 + position} y1={Y0} x2={X0 + position} y2={Y1} stroke="rgba(128, 128, 128, 0.5)" strokeWidth={0.5} />
        </g>
    );

}

export default YGrids;