import React, { useState } from 'react'
import BeamsContext from '../myContext/BeamsContext'

const myBeams = [
    {
        name: "beam1",
        material: "concrete",
        steelProperty: {

        },
        id: 1,
        b: 30,
        h: 80,
        l: 3,
        onEdit: false,
        supports: {
            pinSupports: [
                { name: "s1", position: 0, reactionY: 0, reactionX: 0 },
            ],
            rollerSupports: [
                { name: "s2", position: 2.5, reactionY: 0 },
            ],
            fixedSupports: [

            ],
        },
        loads: {
            pointLoads: [
                { name: "load1", position: 1, value: -5 },
            ],
            distributedLoads: [
                { name: "load2", position1: 0, position2: 1, value1: -10, value2: -10 },
            ],
        },
    },
    {
        name: "beam2",
        material: "concrete",
        steelProperty: {

        },
        id: 2,
        b: 20,
        h: 40,
        l: 5,
        onEdit: false,
        supports: {
            pinSupports: [
                { name: "s1", position: 1, reactionY: 0, reactionX: 0 },
            ],
            rollerSupports: [
                { name: "s2", position: 4, reactionY: 0 },
            ],
            fixedSupports: [

            ],
        },
        loads: {
            pointLoads: [
                { name: "load1", position: 3, value: -5 },
            ],
            distributedLoads: [
                { name: "load2", position1: 0, position2: 5, value1: -5, value2: -15 },
            ],
        },
    },
    {
        name: "beam3",
        material: "concrete",
        steelProperty: {

        },
        id: 3,
        b: 30,
        h: 60,
        l: 4,
        onEdit: false,
        supports: {
            pinSupports: [

            ],
            rollerSupports: [

            ],
            fixedSupports: [
                { name: "s1", position: 4, reactionY: 0, reactionX: 0, reactionM: 0 },
            ],
        },
        loads: {
            pointLoads: [
                { name: "load1", position: 2, value: -5 },
            ],
            distributedLoads: [
                { name: "load2", position1: 1, position2: 4, value1: -3, value2: -3 },
            ],
        },
    },
    {
        name: "beam4",
        material: "concrete",
        steelProperty: {

        },
        id: 4,
        b: 30,
        h: 60,
        l: 5,
        onEdit: false,
        supports: {
            pinSupports: [
                { name: "s1", position: 0, reactionY: 0, reactionX: 0 },
            ],
            rollerSupports: [
                { name: "s2", position: 5, reactionY: 0 },
            ],
            fixedSupports: [

            ],
        },
        loads: {
            pointLoads: [

            ],
            distributedLoads: [
                { name: "load2", position1: 0, position2: 5, value1: -3, value2: -3 },
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

export default BeamProvider;