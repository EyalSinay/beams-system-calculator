import React from 'react'

function ProfileDetails({profile}) {
    return (
        <div className='profile-details-container'>
            <div className={`profile-img profile-img-${profile.name.slice(0, 3)}`} />
            <ul>
                <li>{`h: ${profile.h} mm`}</li>
                <li>{`b: ${profile.b} mm`}</li>
                <li>{`tw: ${profile.tw} mm`}</li>
                <li>{`tf: ${profile.tf} mm`}</li>
                <li>{`r: ${profile.r} mm`}</li>
                <li>{`d: ${profile.d} mm`}</li>
                <li>{`A: ${profile.A} cm²`}</li>
                <li>{`G: ${profile.G} kg/m`}</li>
                <li>{`Iy: ${profile.Iy} cm⁴`}</li>
                <li>{`Wy: ${profile.Wy} cm³`}</li>
                <li>{`iiy: ${profile.iiy} cm`}</li>
                <li>{`Iz: ${profile.Iz} cm⁴`}</li>
                <li>{`Wz: ${profile.Wz} cm³`}</li>
                <li>{`iiz: ${profile.iiz} cm`}</li>
            </ul>
        </div>
    )
}

export default ProfileDetails;