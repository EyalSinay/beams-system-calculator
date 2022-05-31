import React from "react";

const RollerSupports = ({ X0, Y0, position, name }) => {

    const W = 30;
    const H = 30;
    const F_S = 15;

    const R = W / 8;

    return (
        <g className="RollerSupports">
            <polygon points={`${X0 + position}, ${Y0} ${X0 - W / 2 + position}, ${Y0 + H} ${X0 + W / 2 + position}, ${Y0 + H}`} />

            <circle cx={X0 + position - W / 4} cy={Y0 + H + R} r={R} />
            <circle cx={X0 + position + W / 4} cy={Y0 + H + R} r={R} />

            <text fontSize={F_S} x={X0 + position - F_S / 2} y={Y0 + H + F_S + 5} >{name}</text>
        </g>
    );

}

export default RollerSupports;