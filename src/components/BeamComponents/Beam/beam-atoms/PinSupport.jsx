import React from "react";
import PinReactionY from "./PinReactionY";
import PinReactionX from "./PinReactionX";

const PinSupport = ({ X0, Y0, position, name, reactionY, reactionX }) => {

    // support:
    const W = 30;
    const H = 30;
    const F_S = 15;

    return (
        <g className="PinSupport-main">
            <g className="PinSupport">
                <polygon points={`${X0 + position}, ${Y0} ${X0 - W / 2 + position}, ${Y0 + H} ${X0 + W / 2 + position}, ${Y0 + H}`} />
                <line x1={X0 - W / 2 + position} y1={Y0 + H + 5} x2={X0 + W / 2 + position} y2={Y0 + H + 5} stroke="black" strokeWidth={3} />
                <text fontSize={F_S} x={X0 + position - F_S / 2} y={Y0 + H + F_S + 5} >{name}</text>
            </g>

            <PinReactionY X0={X0} Y0={Y0} position={position} H={H} reactionY={reactionY} />
            <PinReactionX X0={X0} Y0={Y0} position={position} B={W} reactionX={reactionX} />
        </g>
    );

}

export default PinSupport;