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
        {beams[index].loads.distributedLoads.map(load => <DistributedLoadsDetails key={load.name} details={load} />)}
        {beams[index].loads.pointLoads.map(load => <PointLoadsDetails key={load.name} details={load} />)}
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