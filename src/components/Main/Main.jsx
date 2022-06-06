import '../css/main.style.css'
import React, { useContext, useState } from 'react'
import BeamsContext from '../../myContext/BeamsContext';
import BeamLink from './BeamLink';
import ButtonIcon from '../buttons/ButtonIcon';
import BeamLinkModify from './BeamLinkModify';
import DeleteMassage from '../messages/DeleteMassage';

function Main() {
  const { beams, setBeams } = useContext(BeamsContext);
  const [onAdd, setAdd] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(0);

  const onAddClick = () => {
    setAdd(prev => !prev);
    setBeams(prev => {
      const newArr = [...prev];
      newArr.forEach(beam => {
        beam.onEdit = false;
      });
      return newArr;
    });
  }

  const cancelAddBeam = () => {
    setAdd(false);
  }

  const confirmAddBeam = (newName, newMaterial, steelsData, newDimensionsB, newDimensionsH) => {
    setBeams(prev => {
      let maxId = 0;
      for (let beam of prev){
        if(beam.id > maxId){
          maxId = beam.id;
        }
      }
      const newArr = [...prev];
      newArr.push({
        name: newName,
        id: maxId + 1,
        material: newMaterial,
        steelProperty: steelsData,
        b: newDimensionsB,
        h: newDimensionsH,
        onEdit: false,
      });
      return newArr;
    });
    setAdd(false);
  }

  const cancelDeleteMessage = () => {
    setDeleteMessage(0);
  }

  const confirmDeleteMessage = () => {
    setDeleteMessage(0);
    setBeams(prev => {
      const newArr = [...prev];
      const index = newArr.findIndex(beam => beam.id === deleteMessage);
      newArr.splice(index, 1);
      return newArr;
    })
  }

  const onEditClick = (id) => {
    setAdd(false);
    setBeams(prev => {
      const newArr = [...prev];
      newArr.forEach(beam => {
        if (beam.id === id) {
          beam.onEdit = true;
        } else {
          beam.onEdit = false;
        }
      });
      return newArr;
    });
  }

  const cancelEditBeam = (id) => {
    setBeams(prev => {
      const newArr = [...prev];
      newArr.find(beam => beam.id === id).onEdit = false;
      return newArr;
    });
  }

  const confirmEditBeam = (id, newName, newMaterial, steelsData, newDimensionsB, newDimensionsH) => {
    setBeams(prev => {
      const newArr = [...prev];
      const currentBeam = newArr.find(beam => beam.id === id);
      currentBeam.name = newName;
      currentBeam.material = newMaterial;
      currentBeam.steelProperty = steelsData;
      currentBeam.b = newDimensionsB;
      currentBeam.h = newDimensionsH;
      currentBeam.onEdit = false;
      return newArr;
    });
  }

  const onDeleteClick = (id) => {
    setDeleteMessage(id);
  }

  const getBeamsLinks = () => {
    return beams.map(beam => <BeamLink key={beam.id} beam={beam} onEditClick={onEditClick} onDeleteClick={onDeleteClick} onConfirmClick={confirmEditBeam} onCancelClick={cancelEditBeam} />);
  }

  return (
    <div className='main-container'>
      <ButtonIcon type={onAdd ? "minus" : "add"} onButtonClick={onAddClick} />
      {onAdd && <BeamLinkModify onCancelClick={cancelAddBeam} onConfirmClick={confirmAddBeam} />}
      {getBeamsLinks()}
      {deleteMessage !== 0 && <DeleteMassage onBackgroundClick={cancelDeleteMessage} onConfirmClick={confirmDeleteMessage} onCancelClick={cancelDeleteMessage} />}
    </div>
  )
}

export default Main;