import { getDivision } from "./Beam.functions";

const getFields = (beam) => {
    const divisionSupportsArr = getDivision(beam);

    const fields = [];

    let start = 0;
    for (let i = 1; i < divisionSupportsArr.length; i++) {
        const arr = divisionSupportsArr.slice(start, i + 1);
        fields.push({ elements: [{...arr[0]},{...arr[1]}] });
        start = i;
    }


    for (let i = 0; i < fields.length; i++) {
        if (i === 0) {
            if (fields[i].elements[0].type === "startPoint") {
                fields[i].type = "Z";
                fields[i].stiffness = 0;
            } else if (fields[i].elements[0].type === "pinSupport" || fields[i].elements[0].type === "rollerSupport") {
                if (fields.length > 1 || fields[i].elements[1].type === "fixedSupport") {
                    fields[i].type = "S-Z";
                    fields[i].stiffness = 0.75 / fields[i].elements[1].dimensionValue;
                } else {
                    fields[i].type = "S-S";
                    fields[i].stiffness = null;
                }
            } else {
                if (fields.length > 1 || fields[i].elements[1].type === "fixedSupport") {
                    fields[i].type = "Z-Z";
                    fields[i].stiffness = 1 / fields[i].elements[1].dimensionValue;
                } else {
                    fields[i].type = "Z-S";
                    fields[i].stiffness = 0.75 / fields[i].elements[1].dimensionValue;
                }
            }
        } else if (i > 0 && i < fields.length - 1) {
            if (i === 1 && fields[0].elements[0].type === "startPoint") {
                fields[i].type = "S-Z";
                fields[i].stiffness = 0.75 / fields[i].elements[1].dimensionValue;
            } else if (i === fields.length - 2 && fields[fields.length - 1].elements[1].type === "endPoint") {
                fields[i].type = "Z-S";
                fields[i].stiffness = 0.75 / fields[i].elements[1].dimensionValue;
            } else {
                fields[i].type = "Z-Z";
                fields[i].stiffness = 1 / fields[i].elements[1].dimensionValue;
            }
        } else if (i === fields.length - 1) {
            if (fields[i].elements[1].type === "endPoint") {
                fields[i].type = "Z";
                fields[i].stiffness = 0;
            } else if (fields[i].elements[1].type === "pinSupport" || fields[i].elements[1].type === "rollerSupport") {
                if (fields.length > 1 || fields[i].elements[0].type === "fixedSupport") {
                    fields[i].type = "Z-S";
                    fields[i].stiffness = 0.75 / fields[i].elements[1].dimensionValue;
                } else {
                    fields[i].type = "S-S";
                    fields[i].stiffness = null;
                }
            } else {
                if (fields.length > 1 || fields[i].elements[0].type === "fixedSupport") {
                    fields[i].type = "Z-Z";
                    fields[i].stiffness = 1 / fields[i].elements[1].dimensionValue;
                } else {
                    fields[i].type = "S-Z";
                    fields[i].stiffness = 0.75 / fields[i].elements[1].dimensionValue;
                }
            }
        }
    }

    for (let i = 0; i < fields.length; i++) {
        if (i === 0) {
            fields[i].elements[1].relativeStiffness = fields[i].stiffness / (fields[i].stiffness + fields[i + 1].stiffness);
        } else if (i > 0 && i < fields.length - 1) {
            fields[i].elements[0].relativeStiffness = fields[i].stiffness / (fields[i].stiffness + fields[i - 1].stiffness);
            fields[i].elements[1].relativeStiffness = fields[i].stiffness / (fields[i].stiffness + fields[i + 1].stiffness);
        } else {
            fields[i].elements[0].relativeStiffness = fields[i].stiffness / (fields[i].stiffness + fields[i - 1].stiffness);
        }
    }

    return fields;
}

const setResults = (beam) => {
    const fields = getFields(beam);



    return fields; // !delete
}

export default setResults;