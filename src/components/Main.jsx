import React from "react";
import BeamSection from "./BeamComponents/BeamSection";
import Beam from "./BeamComponents/Beam/Beam";

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
                ],
                fixedSupports: [
                    { name: "s5", position: 300 },
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
            id: 1,
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