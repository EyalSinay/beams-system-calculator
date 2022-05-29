import React from "react";

const BeamSection = ({ b, h }) => {

    const F_S = 15;

    return (
        <svg className="BeamSection" width={F_S + b + 15} height={F_S + h + 15} version="1.1" xmlns="eyalsinay@gmail.com">

            <rect x={F_S} y={15} width={b} height={h} fill="gray" stroke="black" />

            <text style={{ fontSize: F_S }} x={F_S / 2 + b / 2} y={h + F_S + 15}>{b}</text>
            <text style={{ fontSize: F_S }} transform={`rotate(-90,${F_S - 2},${h / 2 + F_S / 2 + 15})`} x={F_S - 2} y={h / 2 + F_S / 2 + 15}>{h}</text>

        </svg>
    );

}

export default BeamSection;