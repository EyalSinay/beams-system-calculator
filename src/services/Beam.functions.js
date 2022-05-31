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


export const getDimensions = (data, withLoads = false) => {
    const newArr = [];

    // push all supports position:
    data.supports.pinSupports.forEach(pinSupport => {
        newArr.push({ position: pinSupport.position });
    });
    data.supports.rollerSupports.forEach(rollerSupport => {
        newArr.push({ position: rollerSupport.position });
    });
    data.supports.fixedSupports.forEach(fixedSupport => {
        newArr.push({ position: fixedSupport.position });
    });

    // push all loads position if true:
    if (withLoads) {
        data.loads.pointLoads.forEach(pointLoad => {
            newArr.push({ position: pointLoad.position });
        });
        data.loads.distributedLoads.forEach(distributedLoad => {
            newArr.push({ position: distributedLoad.position1 });
            newArr.push({ position: distributedLoad.position2 });
        });
    }

    // push start point and end point if not exist:
    if (!newArr.some(element => element.position === 0)) {
        newArr.push({ position: 0 });
    }
    if (!newArr.some(element => element.position === data.l)) {
        newArr.push({ position: data.l });
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