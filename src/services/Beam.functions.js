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


export const getDivision = (data, withLoads = false, withSupports = true, withStartEndPoints = true) => {
    const newArr = [];

    // push all supports position if true:
    if (withSupports) {
        data.supports.pinSupports.forEach(pinSupport => {
            newArr.push({ position: pinSupport.position, type: "pinSupports", name: pinSupport.name });
        });
        data.supports.rollerSupports.forEach(rollerSupport => {
            newArr.push({ position: rollerSupport.position, type: "rollerSupports", name: rollerSupport.name });
        });
        data.supports.fixedSupports.forEach(fixedSupport => {
            newArr.push({ position: fixedSupport.position, type: "fixedSupports", name: fixedSupport.name });
        });
    }

    // push all loads position if true:
    if (withLoads) {
        data.loads.pointLoads.forEach(pointLoad => {
            newArr.push({ position: pointLoad.position, type: "pointLoad", value: pointLoad.value });
        });
        data.loads.distributedLoads.forEach(distributedLoad => {
            newArr.push({ position: distributedLoad.position1, type: "distributedLoad-start", value: distributedLoad.value1 });
            newArr.push({ position: distributedLoad.position2, type: "distributedLoad-end", value: distributedLoad.value2 });
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
    newArr.sort((a, b) => a.position - b.position);

    // add dimension values:
    let prevValue = 0;
    newArr.forEach(element => {
        element.dimensionValue = element.position - prevValue;
        prevValue = element.position;
    });
    return newArr;
}


export const getMarksArr = (lBeam) => {
    const skipping = Math.ceil(lBeam / 150) * 5;

    const newArr = [];
    for (let i = 0; i <= lBeam; i += skipping) {
        newArr.push(i);
    }
    return newArr;
}