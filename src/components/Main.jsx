import React, { useContext, useEffect } from "react";
import BeamSection from "./BeamComponents/BeamSection";
import Beam from "./BeamComponents/Beam/Beam";

import getSupportReactions from "../services/getSupportReactions";
import BeamsContext from "../myContext/BeamsContext";

const Main = () => {
    const { beams, setBeams } = useContext(BeamsContext);
    const CURRENT_INDEX = 1;

    useEffect(() => {
        setBeams(prev => {
            const newBeamsArr = [...prev];
            const supportReactions = getSupportReactions(newBeamsArr[CURRENT_INDEX]);
            for (let i = 0; i < supportReactions.length; i++) {
                newBeamsArr[CURRENT_INDEX].supports[supportReactions[i].type].find(item => item.name === supportReactions[i].name).reactionY = supportReactions[0].reactionY;
            }
            return newBeamsArr;
        });
    }, []);
    // console.log(beams);

    return (
        <>
            <BeamSection b={beams[CURRENT_INDEX].b} h={beams[CURRENT_INDEX].h} WHSvg={150} />
            <br />
            <br />
            <br />
            <Beam data={beams[CURRENT_INDEX]} WSvg={800} HSvg={400} />
        </>
    );
}

export default Main;


// https://steelapi.timskovjacobsen.com/api