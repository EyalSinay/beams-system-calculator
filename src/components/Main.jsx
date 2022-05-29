import React from "react";
import BeamSection from "./BeamComponents/BeamSection";
import Beam from "./BeamComponents/Beam";

const Main = () => {

    const beam1 = {
        l: 300,
        supports: {
            pinSupports: [
                { name: "s1", position: 0 },
                { name: "s2", position: 150 },
                { name: "s3", position: 300 },
            ],
            rollerSupports: [

            ],
            fixedSupports: [
                
            ],
        },
        loads: {
            pointLoads: [
                { name: "load1", position: 75, value: -100 },
                { name: "load2", position: 280, value: -50 }
            ],
            distributedLoads: [
                { name: "load3", position1: 10, position2: 250, value1: -80, value2: -120 },
                { name: "load4", position1: 30, position2: 230, value1: -60, value2: -40 },
            ],
        }
    }


    return (
        <>
            <BeamSection b={100} h={100} />
            <br />
            <br />
            <br />
            <Beam data={beam1} />
        </>
    );

}

export default Main;


// https://steelapi.timskovjacobsen.com/api