import React from "react";

const MomentPower = ({ X0, Y0, position, reactionM, LRelative }) => {

    const F_SReaction = 12;
    const reactionDirection = reactionM ? reactionM / Math.abs(reactionM) : 1;

    const getTransfer = () => {
        if (position === 0){
            return -0.20*LRelative;
        } else {
            return 0;
        }
    }

    return (
        <g className="MomentPower">

            <path d={`M ${X0 + position + 10*reactionDirection + getTransfer()} ${Y0} A 15 15, 0, 1, ${position === 0 ? 0 : 1}, ${X0 + position + 25*reactionDirection + getTransfer()} ${Y0 + 15}`} stroke="black" strokeWidth={2} fill="none" />

            <polygon points={`${X0 + position + 25*reactionDirection + 5 + getTransfer()}, ${Y0 + 10} ${X0 + position + 25*reactionDirection + 5 + getTransfer()}, ${Y0 + 20} ${X0 + position + 15*reactionDirection + 5 + getTransfer()}, ${Y0 + 15}`} />

            <text fontSize={F_SReaction} x={X0 + position + (position === 0 ? reactionDirection + getTransfer() : 20*reactionDirection)} y={position === 0 ? Y0 +45 : Y0 +33} >{Math.abs(reactionM).toFixed(2)}</text>

        </g>
    );

}

export default MomentPower;