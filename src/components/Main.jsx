import React from "react";
import BeamSection from "./BeamComponents/BeamSection";
import Beam from "./BeamComponents/Beam/Beam";

import setResults from "../services/math.functions";

const Main = () => {

    const beams = [
        {
            name: "beam1",
            id: 1,
            b: 20,
            h: 40,
            l: 300,
            supports: {
                pinSupports: [
                    { name: "s1", position: 0 },
                    { name: "s2", position: 75 },
                    { name: "s3", position: 150 },
                ],
                rollerSupports: [
                    { name: "s4", position: 175 },
                    { name: "s5", position: 240 },
                ],
                fixedSupports: [
                    { name: "s6", position: 300 },
                ],
            },
            loads: {
                pointLoads: [
                    { name: "load1", position: 60, value: -100 },
                    { name: "load2", position: 280, value: -50 },
                ],
                distributedLoads: [
                    { name: "load3", position1: 10, position2: 250, value1: -80, value2: -120 },
                    { name: "load4", position1: 30, position2: 230, value1: -60, value2: -40 },
                ],
            },
        },
        {
            name: "beam2",
            id: 2,
            b: 20,
            h: 40,
            l: 500,
            supports: {
                pinSupports: [
                    { name: "s1", position: 0 },
                ],
                rollerSupports: [
                    { name: "s2", position: 500 },
                ],
                fixedSupports: [

                ],
            },
            loads: {
                pointLoads: [

                ],
                distributedLoads: [
                    { name: "load1", position1: 0, position2: 500, value1: -100, value2: -100 },
                ],
            },
        },
    ]

    const fields = setResults(beams[0]);
    console.log(fields);

    return (
        <>
            <BeamSection b={beams[0].b} h={beams[0].h} WHSvg={150} />
            <br />
            <br />
            <br />
            <Beam data={beams[0]} WSvg={800} HSvg={400} />
        </>
    );

}

export default Main;


// https://steelapi.timskovjacobsen.com/api