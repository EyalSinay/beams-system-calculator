import React, { useContext } from 'react'
import BeamsContext from '../../../myContext/BeamsContext';
import ButtonIcon from '../../buttons/ButtonIcon';
import FixedSupportsDetails from './FixedSupportsDetails';
import PinSupportsDetails from './PinSupportsDetails';
import RollerSupports from './RollerSupportsDetails';

function SupportsCrud({ index }) {
  const { beams, setBeams } = useContext(BeamsContext);

  const getAllSupports = () => {
    return (
      <>
    {beams[index].supports.fixedSupports.map(support => <FixedSupportsDetails key={support.name} details={support}/>)}
    {beams[index].supports.pinSupports.map(support => <PinSupportsDetails key={support.name} details={support}/>)}
    {beams[index].supports.rollerSupports.map(support => <RollerSupports key={support.name} details={support}/>)}
      </>
    );
  }

  return (
    <div className='supports-cruds-main-container'>
      <h3 className='beam-crud-title'>Supports</h3>
        <ButtonIcon type="add" />
        {getAllSupports()}
    </div>
  )
}

export default SupportsCrud