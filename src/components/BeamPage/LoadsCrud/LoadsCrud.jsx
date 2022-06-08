import React, { useContext } from 'react'
import BeamsContext from '../../../myContext/BeamsContext';
import ButtonIcon from '../../buttons/ButtonIcon';
import DistributedLoadsDetails from './DistributedLoadsDetails';
import PointLoadsDetails from './PointLoadsDetails';

function LoadsCrud({index}) {
    const { beams, setBeams } = useContext(BeamsContext);



    const getAllLoads = () => {
        return (
          <>
        {beams[index].loads.distributedLoads.map((load, loadIndex) => <DistributedLoadsDetails key={load.name} details={load} beamIndex={index} loadIndex={loadIndex} />)}
        {beams[index].loads.pointLoads.map((load, loadIndex) => <PointLoadsDetails key={load.name} details={load} beamIndex={index} loadIndex={loadIndex} />)}
          </>
        );
      }

    return (
        <div className='loads-cruds-main-container'>
            <h3 className='beam-crud-title'>Loads</h3>
            <ButtonIcon type="add" />
            {getAllLoads()}
        </div >
    )
}

export default LoadsCrud