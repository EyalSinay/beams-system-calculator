import React from "react";

const BeamSection = ({ b, h, WHSvg }) => {

    const F_S = 15;

    const ratio = (WHSvg - F_S * 3) / Math.max(b, h);
    console.log(ratio);
    const bRatio = b * ratio;
    const hRatio = h * ratio;

    return (
        <svg className="BeamSection" width={WHSvg} height={WHSvg} version="1.1" xmlns="eyalsinay@gmail.com">

            <rect x={0.5 * WHSvg - bRatio / 2} y={0.5 * WHSvg - hRatio / 2} width={bRatio} height={hRatio} fill="gray" stroke="black" />

            <text fontSize={F_S} x={0.5 * WHSvg - F_S / 2} y={0.5 * WHSvg + hRatio / 2 + F_S}>{b}</text>
            <text fontSize={F_S} transform={`rotate(-90,${0.5 * WHSvg - bRatio / 2 - 0.5 * F_S},${0.5 * WHSvg + F_S / 2})`} x={0.5 * WHSvg - bRatio / 2 - 0.5 * F_S} y={0.5 * WHSvg + F_S / 2}>{h}</text>

        </svg>
    );
    // return (
    //     <svg className="BeamSection" width={F_S + b + 15} height={F_S + h + 15} version="1.1" xmlns="eyalsinay@gmail.com">

    //         <rect x={F_S} y={15} width={b} height={h} fill="gray" stroke="black" />

    //         <text fontSize={F_S} x={F_S / 2 + b / 2} y={h + F_S + 15}>{b}</text>
    //         <text fontSize={F_S} transform={`rotate(-90,${F_S - 2},${h / 2 + F_S / 2 + 15})`} x={F_S - 2} y={h / 2 + F_S / 2 + 15}>{h}</text>

    //     </svg>
    // );

}

export default BeamSection;