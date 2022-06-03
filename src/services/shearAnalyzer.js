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
    console.log(fields)

    const getNextValue = (p1, p2, delta, cIntegral) => {
        let yEnd;
        if(p1 !== p2){
        const DelYX = (p1 - p2) / (0 - delta);
        yEnd = 0.5 * DelYX * p1 + (0 - DelYX * p1) * p1 + cIntegral;
    }else{
        yEnd = p1 * delta;
    }
        console.log("yoyoyo", p1, p2, delta, cIntegral)

        let dx1 = 0*yEnd;
        let dy1 = 0*yEnd;
        console.log("haaaaaaaaaa", dx1, dy1, yEnd);
        return [dx1, dy1, yEnd];
    }

    let cIntegral = 0;

    // <path d="M X0 Y0...
    let path = "";
    for (let i = 0; i < fields.length - 1; i++) {
        if (fields[i].type === "startPoint") {
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
            path += ` q ${dx1 * xRatio} ${dy1 * yRatio} ${xEnd * xRatio} ${yEnd * yRatio}`;
            cIntegral += yEnd;
        } else if (fields[i].type === "pinSupports") {
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
            path += ` v ${fields[i].reactionY * yRatio} q ${dx1 * xRatio} ${dy1 * yRatio} ${xEnd * xRatio} ${yEnd * yRatio}`;
            cIntegral += yEnd + fields[i].reactionY;
        } else if (fields[i].type === "rollerSupports") {
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
            path += ` v ${fields[i].reactionY * yRatio} q ${dx1 * xRatio} ${dy1 * yRatio} ${xEnd * xRatio} ${yEnd * yRatio}`;
            cIntegral += yEnd + fields[i].reactionY;
        } else if (fields[i].type === "fixedSupports") {
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
            path += ` v ${fields[i].reactionY * yRatio} q ${dx1 * xRatio} ${dy1 * yRatio} ${xEnd * xRatio} ${yEnd * yRatio}`;
            cIntegral += yEnd + fields[i].reactionY;
        } else if (fields[i].type === "pointLoad") {
            console.log("meeeeeeeeeeee",cIntegral)

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
            path += ` v ${fields[i].value * yRatio} q ${dx1 * xRatio} ${dy1 * yRatio} ${xEnd * xRatio} ${yEnd * yRatio}`;
            cIntegral += yEnd + fields[i].value;
        } else if (fields[i].type === "distributedLoad-start") {
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
            path += ` q ${dx1 * xRatio} ${dy1 * yRatio} ${xEnd * xRatio} ${yEnd * yRatio}`;
            cIntegral += yEnd;
        } else if (fields[i].type === "distributedLoad-end") {
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
            path += ` q ${dx1 * xRatio} ${dy1 * yRatio} ${xEnd * xRatio} ${yEnd * yRatio}`;
            cIntegral += yEnd;
        } else if (fields[i].type === "endPoint") {
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
            path += ` q ${dx1 * xRatio} ${dy1 * yRatio} ${xEnd * xRatio} ${yEnd * yRatio}`;
        }
    }
    if (fields[fields.length - 1].type.includes("Supports")) {
        console.log(fields[fields.length - 1].reactionY * yRatio)
        path += ` v ${fields[fields.length - 1].reactionY * yRatio}`;
    } else if (fields[fields.length - 1].type === "pointLoad") {
        path += ` v ${fields[fields.length - 1].value * yRatio}`;
    }

    console.log("c",cIntegral)

    return path;
}

export const getShearFunction = (beam, xRatio, yRatio) => {
    const fields = getDivision(beam, true, true, true);
    setTheValueOfDistributedLoadInStartEveryField(fields, beam.loads.distributedLoads);
    const path = getPath(fields, xRatio, yRatio);
    return path;
}