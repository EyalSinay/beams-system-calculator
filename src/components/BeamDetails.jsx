import React from 'react'
import getImage from '../services/getImagesSections'
import StatusLights from './StatusLights'


function BeamDetails({ beam }) {

    const profileDetails = () => {
        if (beam.material === "steel") {
            return <ul>
                <li>{`h: ${beam.steelProperty.h} mm`}</li>
                <li>{`b: ${beam.steelProperty.b} mm`}</li>
                <li>{`tw: ${beam.steelProperty.tw} mm`}</li>
                <li>{`tf: ${beam.steelProperty.tf} mm`}</li>
                <li>{`r: ${beam.steelProperty.r} mm`}</li>
                <li>{`d: ${beam.steelProperty.d} mm`}</li>
                <li>{`A: ${beam.steelProperty.A} cm²`}</li>
                <li>{`G: ${beam.steelProperty.G} kg/m`}</li>
                <li>{`Iy: ${beam.steelProperty.Iy} cm⁴`}</li>
                <li>{`Wy: ${beam.steelProperty.Wy} cm³`}</li>
                <li>{`iiy: ${beam.steelProperty.iiy} cm`}</li>
                <li>{`Iz: ${beam.steelProperty.Iz} cm⁴`}</li>
                <li>{`Wz: ${beam.steelProperty.Wz} cm³`}</li>
                <li>{`iiz: ${beam.steelProperty.iiz} cm`}</li>
            </ul>
        }
    }

    const profileName = () => {
        if (beam.material === "steel"){
            return <span className='profile-name'>{` - ${beam.steelProperty.name}`}</span>
        } else {
            return <span className='profile-name'>{` - ${beam.b}/${beam.h}`}</span>
        }
    }

    return (
        <div className='beam-details-container'>
            <div className='img-status-container'>
            <StatusLights green="on" />
                {getImage(beam)}
            </div>
            <div className='details-text-container'>
                <h2>{`${beam.name}`}{profileName()}</h2>
                <div className="details-text-sub-container">
                    {profileDetails()}
                </div>
            </div>
        </div>
    )
}

export default BeamDetails