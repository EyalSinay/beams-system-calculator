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

    // ------------------------------------------------------------
    //Beam Handlers:
    const handleAddBeam = (newBeam) => setBeams(prevBeams => [...prevBeams, newBeam]);
    const closeBeamsEditMode = () => {
        const prevBeams = [...beams];
        prevBeams.forEach(beam => (beam.onEdit = false));
        setBeams(prevBeams);
    }

    const confirmAddBeam = (newBeam) => {
        const prevBeams = [...beams];
        let maxId = 0;
        prevBeams.forEach(beam => {
            if (beam.id > maxId) {
                maxId = beam.id;
            }
        });
        prevBeams.push({
            name: newBeam.newName,
            id: maxId + 1,
            material: newBeam.newMaterial,
            steelProperty: newBeam.steelsData || {},
            b: newBeam.newDimensionsB,
            h: newBeam.newDimensionsH,
            onEdit: false,
        });
        setBeams(prevBeams);
    }


    const removeBeamBy = (key, identifier) => {
        const prevBeams = [...beams];
        const beamIndex = prevBeams.findIndex(beam => beam[key] === identifier);
        prevBeams.splice(beamIndex, 1);
        setBeams(prevBeams);
    }


    const openEditModeBy = (key, identifier) => {
        const prevBeams = [...beams];
        prevBeams.forEach(beam => {
            beam.onEdit = beam[key] === identifier ? true : false;
        });
        setBeams(prevBeams)
    }
    const cancelEditModeBy = (key, identifier) => {
        const prevBeams = [...beams];
        prevBeams.forEach(beam => {
            if (beam[key] === identifier) beam.onEdit = false;
        });
        setBeams(prevBeams);
    }

    const confirmEdit = (key, identifier, newBeam) => {
        const prevBeams = [...beams];
        const beamIndex = prevBeams.findIndex(beam => beam[key] === identifier);
        prevBeams[beamIndex] = {
            ...prevBeams[beamIndex],
            name: newBeam.newName,
            material: newBeam.newMaterial,
            steelProperty: newBeam.steelsData || {},
            b: newBeam.newDimensionsB,
            h: newBeam.newDimensionsH,
            onEdit: false,

        }
        setBeams(prevBeams);
    }

    const beamHandlers = () => {
        return {
            handleAddBeam,
            closeBeamsEditMode,
            confirmAddBeam,
            removeBeamBy,
            openEditModeBy,
            cancelEditModeBy,
            confirmEdit
        }
    }
    // ------------------------------------------------------------

    // ------------------------------------------------------------
    // Valid Checks:
    const isValidName = (newName, outstanding = "") => {
        const isNameNotExist = beams.some(beam => beam.name === newName && beam.name !== outstanding);
        return isNameNotExist;
    }

    const validChecks = {
        isValidName,
    }
    // ------------------------------------------------------------


    return (
        <BeamsContext.Provider value={{ beams, setBeams, beamHandlers, validChecks }}>
            {children}
        </BeamsContext.Provider>
    )
}

export default BeamProvider;