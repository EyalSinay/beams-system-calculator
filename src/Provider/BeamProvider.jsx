import React, { useEffect, useState } from 'react'
import BeamsContext from '../myContext/BeamsContext'

const BeamProvider = ({ children }) => {
    const [beams, setBeams] = useState([]);

    useEffect(() => {
        if(localStorage.getItem("beams")){
            setBeams(JSON.parse(localStorage.getItem("beams")));
        }
    },[]);
    useEffect(() => {
        localStorage.setItem("beams", JSON.stringify(beams));
    },[beams]);

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
            l: parseInt(newBeam.newLength),
            id: maxId + 1,
            material: newBeam.newMaterial,
            steelProperty: newBeam.steelsData || {},
            b: parseInt(newBeam.newDimensionsB),
            h: parseInt(newBeam.newDimensionsH),
            onEdit: false,
            supports: {
                pinSupports: [],
                rollerSupports: [],
                fixedSupports: [],
            },
            loads: {
                pointLoads: [],
                distributedLoads: [],
            }
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
            l: parseInt(newBeam.newLength),
            material: newBeam.newMaterial,
            steelProperty: newBeam.steelsData || {},
            b: parseInt(newBeam.newDimensionsB),
            h: parseInt(newBeam.newDimensionsH),
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
        for (let beam of beams) {
            for (let supportKey in beam.supports) {
                beamsNames.push(!beam.supports[supportKey].some(support => support.name === newName && support.name !== outstanding));
            }
            for (let loadKey in beam.loads) {
                beamsNames.push(!beam.loads[loadKey].some(load => load.name === newName && load.name !== outstanding));
            }
        }

        let isValid = true;
        for (let bool of beamsNames) {
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
        if (pos2) {
            validPos = validPos && pos2 >= 0 && pos2 <= beams[indexBeam].l;
            validPos = validPos && pos1 < pos2;
        }

        return validPos;
    }

    const isValidLength = (beamLength, indexBeam, beamName = "") => {
        if(indexBeam === -1){
            indexBeam = beams.findIndex(beam => beam.name === beamName);
        }
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

    // console.log(beams);
    return (
        <BeamsContext.Provider value={{ beams, setBeams, beamHandlers, validChecks }}>
            {children}
        </BeamsContext.Provider>
    )
}

export default BeamProvider;