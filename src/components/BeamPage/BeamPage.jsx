import '../css/beam-page.style.css'
import React, { useContext, useEffect, useRef, useState } from "react";
import Beam from "../BeamComponents/Beam/Beam";
// import Shear from "../BeamComponents/Shear/Shear";
import BeamsContext from "../../myContext/BeamsContext";
// import getSupportReactions from "../../services/getSupportReactions";
import BeamDetails from './BeamDetails';
import SupportsCrud from './SupportsCrud/SupportsCrud';
import LoadsCrud from './LoadsCrud/LoadsCrud';
import BeamLengthCrud from './BeamLengthCrud';


const BeamPage = (props) => {
    const { beams } = useContext(BeamsContext);
    const [CURRENT_INDEX, setCURRENT_INDEX] = useState(0);
    const containerRef = useRef("");
    const [containerWidth, SetContainerWidth] = useState(0);

    // useEffect(() => {
    //     if (localStorage.getItem("beams")) {
    //         setBeams(JSON.parse(localStorage.getItem("beams")));
    //     }
    // }, []);

    useEffect(() => {
        SetContainerWidth(containerRef.current.getBoundingClientRect().width)
    }, [containerWidth]);

    window.onresize = () => {
        SetContainerWidth(containerRef.current.getBoundingClientRect().width);
    }

    useEffect(() => {
        setCURRENT_INDEX(() => {
            return beams.findIndex(beam => beam.name === props.match.params.name);
        });
        // eslint-disable-next-line
    }, [CURRENT_INDEX]);

    // useEffect(() => {
    //     setBeams(prev => {
    //         const newBeamsArr = [...prev];
    //         const supportReactions = getSupportReactions(newBeamsArr[CURRENT_INDEX]);
    //         for (let i = 0; i < supportReactions.length; i++) {
    //             newBeamsArr[CURRENT_INDEX].supports[supportReactions[i].type].find(item => item.name === supportReactions[i].name).reactionY = supportReactions[0].reactionY;
    //             if (supportReactions[0].type === "fixedSupports") {
    //                 newBeamsArr[CURRENT_INDEX].supports[supportReactions[i].type].find(item => item.name === supportReactions[i].name).reactionM = supportReactions[0].reactionM;
    //             }
    //         }
    //         return newBeamsArr;
    //     });
    // eslint-disable-next-line
    // }, []);

    return (
        <div ref={containerRef} className="beam-page-container">
            <BeamDetails beam={beams[CURRENT_INDEX]} />
            <BeamLengthCrud index={CURRENT_INDEX} />
            <div className="supports_loads-container">
                <SupportsCrud index={CURRENT_INDEX} />
                <LoadsCrud index={CURRENT_INDEX} />
            </div>
            <br />
            <Beam data={beams[CURRENT_INDEX]} WSvg={containerWidth} HSvg={400} />
            <br />
            {/* <Shear data={beams[CURRENT_INDEX]} WSvg={containerWidth} HSvg={400} /> */}
        </div>
    );
}

export default BeamPage;