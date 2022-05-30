import React from "react";
import PinSupport from "./PinSupport";
import RollerSupports from "./RollerSupports";
import FixedSupports from "./FixedSupports";
import PointLoad from "./PointLoad";
import DistributedLoads from "./DistributedLoads";
import Dimension from "./Dimension";
import YGrids from "./YGrids";
import { getMaxLoad, getDimensions } from "../../functions/Beam.functions";

const Beam = ({ data, WSvg, HSvg }) => {

    const W = WSvg;
    const H = HSvg;
    const C = 50;
    const X0 = C;
    const Y0 = H / 2;
    const L = (W - 2 * C);

    const LRelative = L / data.l;
    const PRelative = (H / 2 - C) / getMaxLoad(data.loads);

    return (
        <svg className="Beam" width={W} height={H} version="1.1" xmlns="eyalsinay@gmail.com">

            <line x1={C} y1={H / 2} x2={W - C} y2={H / 2} stroke="black" strokeWidth={3} />

            {data.loads.distributedLoads.map(distributedLoad =>
                <DistributedLoads key={`loads-${distributedLoad.name}`}
                    name={distributedLoad.name}
                    X0={X0}
                    Y0={Y0}
                    position1={distributedLoad.position1 * LRelative}
                    position2={distributedLoad.position2 * LRelative}
                    loadValue1={distributedLoad.value1 * PRelative}
                    loadValue2={distributedLoad.value2 * PRelative}
                />)}

            {data.loads.pointLoads.map(pointLoad =>
                <PointLoad
                    key={`loads-${pointLoad.name}`}
                    name={pointLoad.name}
                    X0={X0}
                    Y0={Y0}
                    position={pointLoad.position * LRelative}
                    loadValue={pointLoad.value * PRelative} />)}

            {data.supports.pinSupports.map(pinSupport => <PinSupport
                key={`support-${pinSupport.name}`}
                name={pinSupport.name}
                X0={X0}
                Y0={Y0}
                position={pinSupport.position * LRelative}
            />)}

            {data.supports.rollerSupports.map(rollerSupport => <RollerSupports
                key={`support-${rollerSupport.name}`}
                name={rollerSupport.name}
                X0={X0}
                Y0={Y0}
                position={rollerSupport.position * LRelative}
            />)}

            {data.supports.fixedSupports.map(fixedSupport => <FixedSupports
                key={`support-${fixedSupport.name}`}
                name={fixedSupport.name}
                X0={X0}
                Y0={Y0}
                position={fixedSupport.position * LRelative}
            />)}

            {getDimensions(data).map((support, index) => <Dimension
                key={`support-dimension-${index}`}
                X0={X0}
                Y0={H - 30}
                position={support.position * LRelative}
                dimensionValue={support.dimensionValue}
                dimensionRelative={support.dimensionValue * LRelative}
            />)}
            <line x1={C} y1={H - 30} x2={W - C} y2={H - 30} stroke="black" strokeWidth={1} />

            {getDimensions(data, true).map((allDimension, index) => <Dimension
                key={`allDimension-dimension-${index}`}
                X0={X0}
                Y0={H - 60}
                position={allDimension.position * LRelative}
                dimensionValue={allDimension.dimensionValue}
                dimensionRelative={allDimension.dimensionValue * LRelative}
            />)}
            <line x1={C} y1={H - 60} x2={W - C} y2={H - 60} stroke="black" strokeWidth={1} />

            {getDimensions(data, true).map((YGrid, index) => <YGrids
                key={`YGrid-${index}`}
                X0={X0}
                Y0={0}
                Y1={H}
                position={YGrid.position * LRelative}
            />)}




            {/* add reactions! */}

            {/* <rect x={0} y={0} width={W} height={H} fill="none" stroke="black" /> */}
        </svg>
    );

}

export default Beam;