import React from "react";

const PointLoad = ({ X0, Y0, name, position, loadValue, loadValuePRelative }) => {

    const W = 15;
    const H = 15;
    const F_S = 12;

    const loadDirection = loadValue / Math.abs(loadValue);

    return (
        <g className="PointLoad">
            <polygon points={`${X0 + position}, ${Y0} ${X0 - W / 2 + position}, ${Y0 + loadDirection * H} ${X0 + W / 2 + position}, ${Y0 + loadDirection * H}`} />

            <line x1={X0 + position} y1={Y0} x2={X0 + position} y2={Y0 + loadValuePRelative} stroke="black" strokeWidth={2} />

            <text fontSize={F_S} x={X0 + position + (F_S / 2) * loadDirection} y={Y0 + 0.5 * loadValuePRelative} transform={`rotate(${90 * loadDirection},${X0 + position + (F_S / 2) * loadDirection},${Y0 + 0.5 * loadValuePRelative})`} >{`${name} = ${loadValue.toFixed(2)}`}</text>
        </g>
    );

}

export default PointLoad;