import { getDivision } from "./Beam.functions";

const getValueOfDistributedLoadByPosition = ({ position1, position2, value1, value2 }, pos) => {
    const DelYX = (value1 - value2) / (position1 - position2);
    return (DelYX) * pos + value1 - (DelYX) * position1;
}

const setTheValueOfDistributedLoadInStartEveryField = (fieldsArr, distributedLoads) => {
    let fieldOn = [];
    fieldsArr.forEach((field, index) => {
        if (field.type.includes("distributedLoad-start")) {
            fieldOn.push(field.name);
        }
        if (field.type.includes("distributedLoad-end")) {
            const indexOfFieldName = fieldOn.indexOf(field.name);
            fieldOn.splice(indexOfFieldName + 1, 1);
        }
        fieldOn.forEach(nameDis => {
            const currentDis = distributedLoads.find(element => element.name === nameDis);
            const value = getValueOfDistributedLoadByPosition(currentDis, field.position);
            if (!field[`currentDistributedLoadValue`]) {
                field[`currentDistributedLoadValue`] = value;
            } else {
                field[`currentDistributedLoadValue`] += value;
            }
        });
    });

}

const getPath = (fields, xRatio, yRatio) => {

    const getNextValue = (p1, p2, delta, cIntegral) => {
        let yEnd;
        if (p1 !== p2) {
            const DelYX = (p1 - p2) / (0 - delta);
            yEnd = 0.5 * DelYX * p1 + (0 - DelYX * p1) * p1 + cIntegral;
        } else {
            yEnd = p1 * delta;
        }

        let dx1 = 0 * yEnd;
        let dy1 = 0 * yEnd;
        return [dx1, dy1, yEnd];
    }

    const getVerticalValues = (field) => {
        if (field.type.includes("Supports")) {
            console.log(field)
            return field.reactionY * yRatio;
        } else if (field.type === "pointLoad") {
            return field.value * yRatio;
        } else {
            return 0;
        }
    }

    let cIntegral = 0;

    // <path d="M X0 Y0...
    let path = "";
    for (let i = 0; i < fields.length - 1; i++) {
        const xEnd = fields[i + 1].dimensionValue;
        let dx1 = 0;
        let dy1 = 0;
        let yEnd = 0;
        if (i > 0
            &&
            fields[i].hasOwnProperty("currentDistributedLoadValue")
            &&
            fields[i + 1].hasOwnProperty("currentDistributedLoadValue")
            &&
            xEnd !== 0) {
            [dx1, dy1, yEnd] = getNextValue(fields[i].currentDistributedLoadValue, fields[i + 1].currentDistributedLoadValue, xEnd, cIntegral);
        }
        path += ` v ${getVerticalValues(fields[i])} q ${dx1 * xRatio} ${dy1 * yRatio} ${xEnd * xRatio} ${yEnd * yRatio}`;
        cIntegral += yEnd + getVerticalValues(fields[i]);
    }
    if (fields[fields.length - 1].type.includes("Supports")) {
        path += ` v ${fields[fields.length - 1].reactionY * yRatio}`;
    } else if (fields[fields.length - 1].type === "pointLoad") {
        path += ` v ${fields[fields.length - 1].value * yRatio}`;
    }

    return path;
}

export const getShearFunction = (beam, xRatio, yRatio) => {
    const fields = getDivision(beam, true, true, true);
    setTheValueOfDistributedLoadInStartEveryField(fields, beam.loads.distributedLoads);
    const path = getPath(fields, xRatio, yRatio);
    return path;
}