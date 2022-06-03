export const getMaxLoad = (loads) => {
    let maxLoad = 0;
    loads.pointLoads.forEach(load => {
        if (Math.abs(load.value) > maxLoad) {
            maxLoad = Math.abs(load.value);
        }
    });
    loads.distributedLoads.forEach(load => {
        if (Math.abs(load.value1) > maxLoad) {
            maxLoad = Math.abs(load.value1);
        }
        if (Math.abs(load.value2) > maxLoad) {
            maxLoad = Math.abs(load.value2);
        }
    });
    return maxLoad;
}

export const getMaxReaction = (supports) => {
    let MaxReaction = 0;
    supports.fixedSupports.forEach(support => {
        if (Math.abs(support.reactionY) > MaxReaction) {
            MaxReaction = Math.abs(support.reactionY);
        }
    });
    supports.pinSupports.forEach(support => {
        if (Math.abs(support.reactionY) > MaxReaction) {
            MaxReaction = Math.abs(support.reactionY);
        }
    });
    supports.rollerSupports.forEach(support => {
        if (Math.abs(support.reactionY) > MaxReaction) {
            MaxReaction = Math.abs(support.reactionY);
        }
    });
    return MaxReaction;
}

export const getMaxPower = (beamData) => {
    const maxLoad = getMaxLoad(beamData.loads);
    const MaxReaction = getMaxReaction(beamData.supports);
    return Math.max(maxLoad, MaxReaction);
}


export const getDivision = (data, withLoads = false, withSupports = true, withStartEndPoints = true) => {
    const newArr = [];

    // push all supports position if true:
    if (withSupports) {
        data.supports.pinSupports.forEach(pinSupport => {
            newArr.push({ ...pinSupport, type: "pinSupports"});
        });
        data.supports.rollerSupports.forEach(rollerSupport => {
            newArr.push({ ...rollerSupport, type: "rollerSupports"});
        });
        data.supports.fixedSupports.forEach(fixedSupport => {
            newArr.push({ ...fixedSupport, type: "fixedSupports"});
        });
    }

    // push all loads position if true:
    if (withLoads) {
        data.loads.pointLoads.forEach(pointLoad => {
            newArr.push({ position: pointLoad.position, type: "pointLoad", value: pointLoad.value });
        });
        data.loads.distributedLoads.forEach(distributedLoad => {
            newArr.push({
                position: distributedLoad.position1,
                type: "distributedLoad-start",
                value: distributedLoad.value1,
                name: distributedLoad.name
            });
            newArr.push({
                position: distributedLoad.position2,
                type: "distributedLoad-end",
                value: distributedLoad.value2,
                name: distributedLoad.name
            });
        });
    }

    // push start point and end point if not exist and if true:
    if (withStartEndPoints) {
        if (!newArr.some(element => element.position === 0)) {
            newArr.push({ position: 0, type: "startPoint" });
        }
        if (!newArr.some(element => element.position === data.l)) {
            newArr.push({ position: data.l, type: "endPoint" });
        }
    }

    // sort:
    newArr.sort((a, b) => {
        if(a.position !== b.position){
            return a.position - b.position;
        } else {
            if(a.type !== "distributedLoad-end" && b.type === "distributedLoad-end"){
                return 1;
            } else if(a.type === "distributedLoad-end" && b.type !== "distributedLoad-end"){
                return -1;
            } else {
                return 0;
            }
        }
    });

    // add dimension values:
    let prevValue = 0;
    newArr.forEach(element => {
        element.dimensionValue = element.position - prevValue;
        prevValue = element.position;
    });
    return newArr;
}


export const getMarksArr = (lBeam) => {
    let skipping;
    if (lBeam >= 50) {
        skipping = Math.ceil(lBeam / 150) * 5;
    } else if (lBeam < 50 && lBeam >= 20) {
        skipping = Math.ceil(lBeam / 150) * 1;
    } else if (lBeam < 20) {
        skipping = Math.ceil(lBeam / 150) * 0.5;
    }

    const newArr = [];
    for (let i = 0; i <= lBeam; i += skipping) {
        newArr.push(i);
    }
    return newArr;
}