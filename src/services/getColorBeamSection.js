const getColorBeam = (beamMaterial) => {
    switch (beamMaterial) {
        case "concrete":
            return "gray";
        case "wood":
            return "SaddleBrown";
        default:
            return "black";
    }
}

export default getColorBeam;