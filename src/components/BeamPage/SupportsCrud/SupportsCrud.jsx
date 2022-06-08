import React, { useContext } from 'react'
import BeamsContext from '../../../myContext/BeamsContext';
import ButtonIcon from '../../buttons/ButtonIcon';
import FixedSupportsDetails from './FixedSupportsDetails';
import PinRollerSupportsDetails from './PinRollerSupportsDetails';

function SupportsCrud({ index }) {
  const { beams } = useContext(BeamsContext);

  const getAllSupports = () => {
    return (
      <>
    {beams[index].supports.fixedSupports.map((support, supportIndex) => <FixedSupportsDetails key={"fixedSupports_" + support.name} details={support} beamIndex={index} supportIndex={supportIndex}/>)}
    {beams[index].supports.pinSupports.map((support, supportIndex) => <PinRollerSupportsDetails key={"pinSupports_" + support.name} type="pinSupports" details={support} beamIndex={index} supportIndex={supportIndex}/>)}
    {beams[index].supports.rollerSupports.map((support, supportIndex) => <PinRollerSupportsDetails key={"rollerSupports_" + support.name} type="rollerSupports" beamIndex={index} supportIndex={supportIndex}/>)}
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