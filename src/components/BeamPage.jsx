import React, { useContext, useEffect, useState } from "react";
import BeamSection from "./BeamComponents/BeamSection";
import Beam from "./BeamComponents/Beam/Beam";
import Shear from "./BeamComponents/Shear/Shear";
import BeamsContext from "../myContext/BeamsContext";

import getSupportReactions from "../services/getSupportReactions";
import getColorBeam from "../services/getColorBeamSection";


const BeamPage = (props) => {
    const { beams, setBeams } = useContext(BeamsContext);
    const [CURRENT_INDEX, setCURRENT_INDEX] = useState(0);

    useEffect(() => {
        setCURRENT_INDEX(() => {
            return beams.findIndex(beam => beam.name === props.match.params.name);
        });
    },[CURRENT_INDEX]);

    useEffect(() => {
        setBeams(prev => {
            const newBeamsArr = [...prev];
            const supportReactions = getSupportReactions(newBeamsArr[CURRENT_INDEX]);
            for (let i = 0; i < supportReactions.length; i++) {
                newBeamsArr[CURRENT_INDEX].supports[supportReactions[i].type].find(item => item.name === supportReactions[i].name).reactionY = supportReactions[0].reactionY;
                if (supportReactions[0].type === "fixedSupports") {
                    newBeamsArr[CURRENT_INDEX].supports[supportReactions[i].type].find(item => item.name === supportReactions[i].name).reactionM = supportReactions[0].reactionM;
                }
            }
            return newBeamsArr;
        });
    }, []);

    return (
        <>
            <BeamSection b={beams[CURRENT_INDEX].b} h={beams[CURRENT_INDEX].h} WHSvg={150} fillColor={getColorBeam(beams[CURRENT_INDEX].material)} />
            <br />
            <br />
            <br />
            <Beam data={beams[CURRENT_INDEX]} WSvg={800} HSvg={400} />
            <br />
            <Shear data={beams[CURRENT_INDEX]} WSvg={800} HSvg={400} />
        </>
    );
}

export default BeamPage;