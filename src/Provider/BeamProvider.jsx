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
                { name: "beam1s1", position: 0, reactionY: 0, reactionX: 0 },
            ],
            rollerSupports: [
                { name: "beam1s2", position: 2.5, reactionY: 0 },
            ],
            fixedSupports: [

            ],
        },
        loads: {
            pointLoads: [
                { name: "beam1load1", position: 1, value: -5 },
            ],
            distributedLoads: [
                { name: "beam1load2", position1: 0, position2: 1, value1: -10, value2: -10 },
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
                { name: "beam2s1", position: 1, reactionY: 0, reactionX: 0 },
            ],
            rollerSupports: [
                { name: "beam2s2", position: 4, reactionY: 0 },
            ],
            fixedSupports: [

            ],
        },
        loads: {
            pointLoads: [
                { name: "beam2load1", position: 3, value: -5 },
            ],
            distributedLoads: [
                { name: "beam2load2", position1: 0, position2: 5, value1: -5, value2: -15 },
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
                { name: "beam3s1", position: 4, reactionY: 0, reactionX: 0, reactionM: 0 },
            ],
        },
        loads: {
            pointLoads: [
                { name: "beam3load1", position: 2, value: -5 },
            ],
            distributedLoads: [
                { name: "beam3load2", position1: 1, position2: 4, value1: -3, value2: -3 },
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
                { name: "beam4s1", position: 0, reactionY: 0, reactionX: 0 },
            ],
            rollerSupports: [
                { name: "beam4s2", position: 5, reactionY: 0 },
            ],
            fixedSupports: [

            ],
        },
        loads: {
            pointLoads: [
                { name: "beam4load1", position: 2, value: -5 },
            ],
            distributedLoads: [
                { name: "beam4load2", position1: 0, position2: 5, value1: -3, value2: -3 },
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
        const beamsNames = []
        beamsNames.push(!beams.some(beam => beam.name === newName && beam.name !== outstanding));
        for (let beam of beams){
            for(let supportKey in beam.supports){
                beamsNames.push(!beam.supports[supportKey].some(support => support.name === newName && support.name !== outstanding));
            }
            for(let loadKey in beam.loads){
                beamsNames.push(!beam.loads[loadKey].some(load => load.name === newName && load.name !== outstanding));
            }
        }
        
        let isValid = true;
        for (let bool of beamsNames){
            isValid = isValid && bool;
        }
        
        return isValid;
    }

    const isValidPositionSupport = (pos, indexBeam) => {
        // check if some support exist in the beam position:
        const allPositionsSupports = [];
        for (const support in beams[indexBeam].supports) {
            beams[indexBeam].supports[support].forEach(element => {
                allPositionsSupports.push(element.position);
            });
        }
        let validPos = !allPositionsSupports.some(element => Math.abs(element - pos) < 0.3);

        // check if new position is less or more from length beam:
        validPos = validPos && pos >= 0 && pos <= beams[indexBeam].l;
        return validPos;
    }

    const isValidPositionLoad = (indexBeam, pos1, pos2) => {
        let validPos = true;
        validPos = validPos && pos1 >= 0 && pos1 <= beams[indexBeam].l;
        if(pos2){
            validPos = validPos && pos2 >= 0 && pos2 <= beams[indexBeam].l;
            validPos = validPos && pos1 < pos2;
        }

        return validPos;
    }

    const isValidLength = (beamLength, indexBeam) => {
        const doNotPass = [];

        for (const support in beams[indexBeam].supports) {
            beams[indexBeam].supports[support].forEach(element => {
                doNotPass.push(element.position);
            });
        }
        beams[indexBeam].loads.pointLoads.forEach(element => {
            doNotPass.push(element.position);
        });
        beams[indexBeam].loads.distributedLoads.forEach(element => {
            doNotPass.push(element.position2);
        });

        const maxPos = Math.max(...doNotPass);
        return { validBool: beamLength >= maxPos, maxValid: maxPos };
    }

    const validChecks = {
        isValidName,
        isValidLength,
        isValidPositionSupport,
        isValidPositionLoad,
    }
    // ------------------------------------------------------------


    return (
        <BeamsContext.Provider value={{ beams, setBeams, beamHandlers, validChecks }}>
            {children}
        </BeamsContext.Provider>
    )
}

export default BeamProvider;