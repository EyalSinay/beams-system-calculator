import React from "react";

const BeamSection = ({ b, h, WHSvg, fillColor = "black" }) => {

    const F_S = 15;

    const ratio = (WHSvg - F_S * 3) / Math.max(b, h);
    const bRatio = b * ratio;
    const hRatio = h * ratio;

    return (
        <svg className="BeamSection" width={WHSvg} height={WHSvg} version="1.1" xmlns="eyalsinay@gmail.com">

            <rect x={0.5 * WHSvg - bRatio / 2} y={0.5 * WHSvg - hRatio / 2} width={bRatio} height={hRatio} fill={fillColor} stroke="black" />

            <text fontSize={F_S} x={0.5 * WHSvg - F_S / 2} y={0.5 * WHSvg + hRatio / 2 + F_S}>{b}</text>
            <text fontSize={F_S} transform={`rotate(-90,${0.5 * WHSvg - bRatio / 2 - 0.5 * F_S},${0.5 * WHSvg + F_S / 2})`} x={0.5 * WHSvg - bRatio / 2 - 0.5 * F_S} y={0.5 * WHSvg + F_S / 2}>{h}</text>

        </svg>
    );

}

export default BeamSection;