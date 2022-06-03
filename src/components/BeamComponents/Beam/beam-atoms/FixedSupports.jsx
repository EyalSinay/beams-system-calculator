import React from "react";
import PinReactionY from "./PinReactionY";
import PinReactionX from "./PinReactionX";
import MomentPower from "./MomentPower";

const FixedSupports = ({ X0, Y0, position, name, reactionY, reactionX, reactionM }) => {

    const H = 60;
    const F_S = 15;

    const hatch = () => {
        const newArr = []
        for (let i = 0; i <= H; i += 5) {
            newArr.push(i);
        }
        return newArr
    }

    return (
        <g className="FixedSupports">

            <line x1={X0 + position} y1={Y0 - H / 2} x2={X0 + position} y2={Y0 + H / 2} stroke="black" strokeWidth={3} />

            {hatch().map(line => <line key={`support-${name}-${line}`} x1={X0 + position} y1={Y0 - H / 2 + line} x2={X0 + position + (position === 0 ? -7 : 7)} y2={Y0 - H / 2 - 7 + line} stroke="black" strokeWidth={1} />)}

            <text fontSize={F_S} x={X0 + position - F_S / 2} y={Y0 + H / 2 + F_S + 5} >{name}</text>

            <PinReactionY X0={X0} Y0={Y0} position={position} H={H / 2} reactionY={reactionY} />
            <PinReactionX X0={X0} Y0={Y0} position={position} B={H / 2} reactionX={reactionX} />
            <MomentPower X0={X0} Y0={Y0} position={position} reactionM={reactionM} />


        </g>
    );

}

export default FixedSupports;