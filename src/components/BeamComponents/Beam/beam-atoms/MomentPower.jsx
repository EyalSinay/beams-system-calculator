import React from "react";

const MomentPower = ({ X0, Y0, position, reactionM }) => {

    const F_SReaction = 12;
    const reactionDirection = reactionM ? reactionM / Math.abs(reactionM) : 1;

    return (
        <g className="MomentPower">

            <path d={`M ${X0 + position + 10*reactionDirection} ${Y0} A 15 15, 0, 1, ${position === 0 ? 0 : 1}, ${X0 + position + 25*reactionDirection} ${Y0 + 15}`} stroke="black" strokeWidth={2} fill="none" />

            <polygon points={`${X0 + position + 25*reactionDirection}, ${Y0 + 10} ${X0 + position + 25*reactionDirection}, ${Y0 + 20} ${X0 + position + 15*reactionDirection}, ${Y0 + 15}`} />

            <text fontSize={F_SReaction} x={X0 + position + 20*reactionDirection + (position === 0 ? -20 : 0)} y={Y0 + 33} >{Math.abs(reactionM).toFixed(2)}</text>

        </g>
    );

}

export default MomentPower;