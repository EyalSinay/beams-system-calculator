import React from "react";
import PinSupport from "./PinSupport";
import PointLoad from "./PointLoad";
import DistributedLoads from "./DistributedLoads";

const Beam = ({ data }) => {

    const W = 800;
    const H = 400; // !find the biggest load and add it
    const C = 50;
    const X0 = C;
    const Y0 = H / 2;
    const L = (W - 2 * C);

    const LRelative = L / data.l;

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
                    loadValue1={distributedLoad.value1}
                    loadValue2={distributedLoad.value2}
                />)}

            {data.loads.pointLoads.map(pointLoad =>
                <PointLoad
                    key={`loads-${pointLoad.name}`}
                    name={pointLoad.name}
                    X0={X0}
                    Y0={Y0}
                    position={pointLoad.position * LRelative}
                    loadValue={pointLoad.value} />)}

            {data.supports.pinSupports.map(pinSupport => <PinSupport
                key={`support-${pinSupport.name}`}
                name={pinSupport.name}
                X0={X0}
                Y0={Y0}
                position={pinSupport.position * LRelative}
            />)}

            {/* add reactions! */}
            {/* add grids! */}

            <rect x={0} y={0} width={W} height={H} fill="none" stroke="black" />
        </svg>
    );

}

export default Beam;