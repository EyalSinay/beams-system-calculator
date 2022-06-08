import React, { useContext, useState } from 'react'
import BeamsContext from '../../../myContext/BeamsContext';
import ButtonIcon from '../../buttons/ButtonIcon';
import AddLoadSupport from '../CrudBeamPage/AddLoadSupport';
import DistributedLoadsDetails from './DistributedLoadsDetails';
import PointLoadsDetails from './PointLoadsDetails';

function LoadsCrud({ index }) {
  const { beams } = useContext(BeamsContext);
  const [createMode, setCreateMode] = useState(false);

  const onAddCancel = () => {
    setCreateMode(false);
  }

  const getAllLoads = () => {
    return (
      <>
        {createMode && <AddLoadSupport type="Loads" beamIndex={index} onCancel={onAddCancel} />}
        {beams[index].loads.distributedLoads.map((load, loadIndex) => <DistributedLoadsDetails key={load.name} details={load} beamIndex={index} loadIndex={loadIndex} />)}
        {beams[index].loads.pointLoads.map((load, loadIndex) => <PointLoadsDetails key={load.name} details={load} beamIndex={index} loadIndex={loadIndex} />)}
      </>
    );
  }

  return (
    <div className='loads-cruds-main-container'>
      <h3 className='beam-crud-title'>Loads</h3>
      {!createMode ? <ButtonIcon type="add" onButtonClick={() => setCreateMode(true)} /> : <ButtonIcon type="cancel" onButtonClick={onAddCancel}/>}
      {getAllLoads()}
    </div >
  )
}

export default LoadsCrud