import './css/beam-page.style.css'
import React, { useContext, useEffect, useRef, useState } from "react";
import Beam from "./BeamComponents/Beam/Beam";
import Shear from "./BeamComponents/Shear/Shear";
import BeamsContext from "../myContext/BeamsContext";

import getSupportReactions from "../services/getSupportReactions";
import BeamDetails from './BeamDetails';


const BeamPage = (props) => {
    const { beams, setBeams } = useContext(BeamsContext);
    const [CURRENT_INDEX, setCURRENT_INDEX] = useState(0);
    const containerRef = useRef("");
    const [containerWidth,SetContainerWidth] = useState(0);

    useEffect(()=>{
        SetContainerWidth(containerRef.current.getBoundingClientRect().width)
    },[containerWidth]);

    window.onresize = () => {
        SetContainerWidth(containerRef.current.getBoundingClientRect().width);
    }

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
        <div ref={containerRef} className="beam-page-container">
            <BeamDetails beam={beams[CURRENT_INDEX]}/>
            <br />
            <br />
            <br />
            <Beam data={beams[CURRENT_INDEX]} WSvg={containerWidth} HSvg={400} />
            <br />
            <Shear data={beams[CURRENT_INDEX]} WSvg={containerWidth} HSvg={400} />
        </div>
    );
}

export default BeamPage;