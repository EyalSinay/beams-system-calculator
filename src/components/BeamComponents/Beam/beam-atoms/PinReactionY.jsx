import React from "react";

const PinReactionY = ({ X0, Y0, position, H, reactionY }) => {

    // reactions:
    const WReaction = 10;
    const HReaction = 10;
    const F_SReaction = 12;
    const reactionDirection = reactionY ? reactionY / Math.abs(reactionY) : 1;
    const reactionY_H = 35;

    return (
        <g  className="PinReactionY PinReaction">
            <polygon points={`${X0 + position}, ${Y0 + H + 25 + (reactionDirection < 0 ? reactionY_H : 0)} ${X0 - WReaction / 2 + position}, ${Y0 + H + 25 + (reactionDirection < 0 ? reactionY_H : 0) + reactionDirection * HReaction} ${X0 + WReaction / 2 + position}, ${Y0 + H + 25 + (reactionDirection < 0 ? reactionY_H : 0) + reactionDirection * HReaction}`} />

            <line x1={X0 + position} y1={Y0 + H + 25} x2={X0 + position} y2={Y0 + H + 25 + reactionY_H} stroke="black" strokeWidth={2} />

            <text fontSize={F_SReaction} x={X0 + position + (F_SReaction / 2) * reactionDirection} y={Y0 + H + 25 + 0.5 * reactionY_H + (reactionDirection < 0 ? reactionY_H : 0)} transform={`rotate(${90 * reactionDirection},${X0 + position + (F_SReaction / 2) * reactionDirection},${Y0 + H + 25 + 0.5 * reactionY_H + (reactionDirection < 0 ? reactionY_H : 0)})`} >{Math.abs(reactionY).toFixed(2)}</text>
        </g>
    );

}

export default PinReactionY;