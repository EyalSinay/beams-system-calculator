import React, { useContext, useEffect } from "react";
import BeamSection from "./BeamComponents/BeamSection";
import Beam from "./BeamComponents/Beam/Beam";

import getSupportReactions from "../services/getSupportReactions";
import BeamsContext from "../myContext/BeamsContext";

const Main = () => {
    const { beams, setBeams } = useContext(BeamsContext);

    useEffect(() => {
        setBeams(prev => {
            const support = getSupportReactions(beams[1]);
            prev[1].supports[support[0].type].find(item => item.name = support[0].name).reaction = support[0].reaction;
            prev[1].supports[support[1].type].find(item => item.name = support[1].name).reaction = support[1].reaction;
            return prev;
        });
    });
    console.log(beams);

    return (
        <>
            <BeamSection b={beams[1].b} h={beams[1].h} WHSvg={150} />
            <br />
            <br />
            <br />
            <Beam data={beams[1]} WSvg={800} HSvg={400} />
        </>
    );

}

export default Main;


// https://steelapi.timskovjacobsen.com/api