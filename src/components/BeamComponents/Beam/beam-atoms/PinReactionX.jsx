import React from "react";

const PinReactionX = ({ X0, Y0, position, B, reactionX }) => {

    // reactions:
    const WReaction = 10;
    const HReaction = 10;
    const F_SReaction = 12;

    return (
        <g className="PinReactionX PinReaction">
            <polygon points={`${X0 + position - 0.5*B}, ${Y0 + 2*HReaction} ${X0 + position - 0.5*B - WReaction}, ${Y0 + 1.5*HReaction} ${X0 + position - 0.5*B - WReaction}, ${Y0 + 2.5*HReaction}`} />

            <line x1={X0 + position - 0.5*B} y1={Y0 + 2*HReaction} x2={X0 + position - 1.5*B} y2={Y0 + 2*HReaction} stroke="black" strokeWidth={2} />

            <text fontSize={F_SReaction} x={X0 + position - 1.5*B - (F_SReaction / 2)} y={Y0 + 2*HReaction - (F_SReaction / 2)} >{Math.abs(reactionX).toFixed(2)}</text>
        </g>
    );

}

export default PinReactionX;