import React from "react";

const DistributedLoads = ({ X0, Y0, name, position1, position2, loadValue1, loadValue2 }) => {

    const W = 10;
    const H = 10;
    const F_S = 15;

    const loadDirection1 = loadValue1 / Math.abs(loadValue1);
    const loadDirection2 = loadValue2 / Math.abs(loadValue2);

    return (
        <g className="PointLoad">

            <polygon points={`${X0 + position1}, ${Y0} ${X0 + position1}, ${Y0 + loadValue1} ${X0 + position2}, ${Y0 + loadValue2} ${X0 + position2}, ${Y0}`} fill="#EBEDEF" stroke="black" strokeWidth={1} />

            <polygon points={`${X0 + position2}, ${Y0} ${X0 - W / 2 + position2}, ${Y0 + loadDirection2 * H} ${X0 + W / 2 + position2}, ${Y0 + loadDirection2 * H}`} />
            <polygon points={`${X0 + position1}, ${Y0} ${X0 - W / 2 + position1}, ${Y0 + loadDirection1 * H} ${X0 + W / 2 + position1}, ${Y0 + loadDirection1 * H}`} />

            <text style={{ fontSize: F_S }} x={X0 + position1 + (F_S / 2) * loadDirection1} y={Y0 + 0.5 * loadValue1} transform={`rotate(${90 * loadDirection1},${X0 + position1 + (F_S / 2) * loadDirection1},${Y0 + 0.5 * loadValue1})`} >{`${name} = ${loadValue1.toFixed(2)}`}</text>

            <text style={{ fontSize: F_S }} x={X0 + position2 - (F_S) * loadDirection2} y={Y0 + 0.5 * loadValue2} transform={`rotate(${90 * loadDirection2},${X0 + position2 - (F_S) * loadDirection2},${Y0 + 0.5 * loadValue2})`} >{`${name} = ${loadValue2.toFixed(2)}`}</text>
        </g>
    );

}

export default DistributedLoads;