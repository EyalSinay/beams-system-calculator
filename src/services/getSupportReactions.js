// import getFields from "./getFields";
import { getDivision } from "./Beam.functions";

const getLoadsConcentrated = ({ loads }) => {
    const newArr = [];
    loads.pointLoads.forEach(load => {
        newArr.push(load);
    });
    loads.distributedLoads.forEach(load => {
        const loadDirection = load.value1 / Math.abs(load.value1);
        const minValue = Math.min(Math.abs(load.value1), Math.abs(load.value2)) * loadDirection;

        const pos1 = (load.position1 + load.position2) / 2;
        const val1 = minValue * (load.position2 - load.position1);
        newArr.push({ name: load.name + "-rectangle", position: pos1, value: val1 });

        let pos2;
        let val2;
        if (load.value1 === minValue) {
            pos2 = (load.position1 + load.position2) * (2 / 3);
            val2 = ((load.value2 - minValue) * (load.position2 - load.position1)) / 2;
        } else if (load.value2 === minValue) {
            pos2 = (load.position1 + load.position2) * (1 / 3);
            val2 = ((load.value1 - minValue) * (load.position2 - load.position1)) / 2;
        }
        newArr.push({ name: load.name + "-triangular", position: pos2, value: val2 });
    });
    return newArr;
}

const getSupportReactions = (beam) => {
    const supports = getDivision(beam, false, true, false);
    const loads = getLoadsConcentrated(beam);

    let sigmaLoads = 0;
    let sigmaLoadsXPos = 0;
    for (let i = 0; i < loads.length; i++) {
        sigmaLoads += loads[i].value;
        sigmaLoadsXPos += loads[i].value * loads[i].position;
    }
    if (supports[0].type !== "fixedSupports") {
        supports[0].reactionY = (supports[1].position * sigmaLoads - sigmaLoadsXPos) / (supports[0].position - supports[1].position);
        supports[1].reactionY = -1 * (supports[0].reactionY + sigmaLoads);
    } else {
        supports[0].reactionY = -1 * sigmaLoads;
    }

    for (let i = 0; i < supports.length; i++) {
        if (supports[i].type !== "rollerSupports") {
            supports[i].reactionX = 0;
        }
    }

    return supports;
}

export default getSupportReactions;