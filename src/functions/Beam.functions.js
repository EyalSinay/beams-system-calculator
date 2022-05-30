export const getMaxLoad = (loads) => {
    let maxLoad = 0;
    loads.pointLoads.forEach(load => {
        if (Math.abs(load.value) > maxLoad){
            maxLoad = Math.abs(load.value);
        }
    });
    loads.distributedLoads.forEach(load => {
        if (Math.abs(load.value1) > maxLoad){
            maxLoad = Math.abs(load.value1);
        }
        if (Math.abs(load.value2) > maxLoad){
            maxLoad = Math.abs(load.value2);
        }
    });
    return maxLoad;
}