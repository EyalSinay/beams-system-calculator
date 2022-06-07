import { useContext, useState } from "react";
import BeamsContext from "../../myContext/BeamsContext";


export const useMainService = () => {
    const { beams, beamHandlers } = useContext(BeamsContext);
    const [modifyNewBeamMode, setModifyNewBeamMode] = useState(false);
    const [alertAfterDeleteMessage, setAlertAfterDeleteMessage] = useState(0);

    const { closeBeamsEditMode, confirmAddBeam, openEditModeBy, cancelEditModeBy, confirmEdit, removeBeamBy } = beamHandlers();


    const onAddClick = () => {
        setModifyNewBeamMode(prev => !prev);
        closeBeamsEditMode();
    }

    const onDeleteClick = (id) => setAlertAfterDeleteMessage(id);

    const openEditMode = (id) => {
        setModifyNewBeamMode(false);
        openEditModeBy("id", id);
    }


    const cancelAlertDeleteMessage = () => setAlertAfterDeleteMessage(0);

    const cancelAddBeam = () => {
        setModifyNewBeamMode(false);
    }

    const cancelEditMode = (id) => {
        cancelEditModeBy("id", id);
    }


    const confirmEditBeam = (id, newBeam) => confirmEdit("id", id, newBeam)

    const confirmAlertDeleteMessage = () => {
        setAlertAfterDeleteMessage(0);
        removeBeamBy("id", alertAfterDeleteMessage);
    }

    const confirmAddNewBeam = (newBeam) => {
        confirmAddBeam(newBeam);
        setModifyNewBeamMode(false);
    }


    const mainServiceHandlers = {
        onAddClick,
        cancelAddBeam,
        onDeleteClick,
        confirmAddNewBeam,
        confirmEditBeam,
        openEditMode,
        confirmAlertDeleteMessage,
        cancelAlertDeleteMessage, cancelEditMode
    }

    const mainServiceStates = {
        beams,
        modifyNewBeamMode,
        alertAfterDeleteMessage,
    }

    return { mainServiceStates, mainServiceHandlers }
}