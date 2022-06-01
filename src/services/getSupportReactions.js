// import getFields from "./getFields";
import { getDivision } from "./Beam.functions";

const getLoadsConcentrated = ({ loads }) => {
    const newArr = [];
    loads.pointLoads.forEach(load => {
        newArr.push(load);
    });
    loads.distributedLoads.forEach(load => {
        const position = (load.position1 + load.position2) / 2;
        const value = ((load.value1 + load.value2) / 2) * (load.position2 - load.position1);
        newArr.push({ name: load.name, position, value });
    });
    return newArr;
}

const getSupportReactions = (beam) => {
    const supports = getDivision(beam, false, true, false);
    const loads = getLoadsConcentrated(beam);

    if (supports[0].type !== "fixedSupport") {
        let sigmaLoads = 0;
        let sigmaLoadsXPos = 0;
        for (let i = 0; i < loads.length; i++) {
            sigmaLoads += loads[i].value;
            sigmaLoadsXPos += loads[i].value * loads[i].position;
        }
        supports[0].reaction = (supports[1].position * sigmaLoads - sigmaLoadsXPos) / (supports[0].position - supports[1].position);
        supports[1].reaction = -1 * (supports[0].reaction + sigmaLoads);
    } else {
        
    }

    return supports
}

export default getSupportReactions;