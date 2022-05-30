import React from "react";

const Dimension = ({ X0, Y0, position, dimensionValue, dimensionRelative }) => {

    const F_S = 12;

    return (
        <g className="Dimension">
            <line x1={X0 + position} y1={Y0 + 10} x2={X0 + position} y2={Y0 - 10} stroke="black" strokeWidth={1} />
            <line x1={X0 + position + 5} y1={Y0 + 5} x2={X0 + position - 5} y2={Y0 - 5} stroke="black" strokeWidth={1} />

            <text fontSize={F_S} x={X0 + position - (dimensionRelative / 2) - (F_S / 2)} y={Y0 - 0.5 * F_S} >{dimensionValue !== 0 ? dimensionValue : ""}</text>
        </g>
    );

}

export default Dimension;