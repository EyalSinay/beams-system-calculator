import BeamSection from "../components/BeamComponents/BeamSection";

export const getColorBeam = (beamMaterial) => {
    switch (beamMaterial) {
        case "concrete":
            return "gray";
        case "wood":
            return "SaddleBrown";
        default:
            return "black";
    }
}

const getImage = (beam) => {
    if(beam.material === "concrete" || beam.material === "wood"){
        return <BeamSection b={beam.b} h={beam.h} WHSvg={150} fillColor={getColorBeam(beam.material)} />
    }else if(beam.material === "steel"){
        return <div className={`profile-img profile-img-${beam.steelProperty.name.slice(0, 3)}`} /> 
    }else{
        return <div>No image</div>
    }
}

export default getImage;