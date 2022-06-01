import React, { useState } from 'react'
import BeamsContext from '../myContext/BeamsContext'

const myBeams = [
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
                { name: "s1", position: 100 },
            ],
            rollerSupports: [
                { name: "s2", position: 400 },
            ],
            fixedSupports: [

            ],
        },
        loads: {
            pointLoads: [
                { name: "load1", position: 300, value: -5 },
            ],
            distributedLoads: [
                { name: "load2", position1: 0, position2: 500, value1: -10, value2: -10 },
            ],
        },
    },
]

const BeamProvider = ({ children }) => {
    const [beams, setBeams] = useState(myBeams);

    return (
        <BeamsContext.Provider value={{ beams, setBeams }}>
            {children}
        </BeamsContext.Provider>
    )
}

export default BeamProvider