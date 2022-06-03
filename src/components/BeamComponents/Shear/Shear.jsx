import React from "react";
import ShearPathShear from "./PathShear";
import YGrids from "../YGrids";
import { getDivision } from "../../../services/Beam.functions";
import { getShearPath, getShearText } from "../../../services/shearAnalyzer";
import TextInDiagram from "../TextInDiagram";


const Shear = ({ data, WSvg, HSvg }) => {

    const W = WSvg;
    const H = HSvg;
    const C = 50;
    const X0 = C;
    const Y0 = H / 2;
    const L = (W - 2 * C);
    const LRelative = L / data.l;

    return (
        <svg className="Shear" width={W} height={H} version="1.1" xmlns="eyalsinay@gmail.com">
            <line x1={C} y1={H / 2} x2={W - C} y2={H / 2} stroke="black" strokeWidth={3} />

            <ShearPathShear X0={X0} Y0={Y0} ShearPathStr={getShearPath(data, LRelative, -4)} />

            {getShearText(data, LRelative, -4).map((text, index) => <TextInDiagram
                key={`shear-text-${index}`}
                X0={X0}
                Y0={Y0}
                fontSize={15}
                xText={text.x}
                yText={text.y}
                text={text.value}
            />)}

            {getDivision(data, true).map((YGrid, index) => <YGrids
                key={`YGrid-${index}`}
                X0={X0}
                Y0={0}
                Y1={H}
                position={YGrid.position * LRelative}
            />)}
        </svg>
    );

}

export default Shear;