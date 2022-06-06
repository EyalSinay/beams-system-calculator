import '../css/Beam-link-modify.style.css'
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ProfileDetails from '../BeamComponents/ProfileDetails';
import BeamSection from '../BeamComponents/BeamSection';
import ButtonIcon from '../buttons/ButtonIcon';

const ignoreCors = "https://nameless-citadel-58066.herokuapp.com/"

function BeamLinkModify({ beam, onConfirmClick, onCancelClick }) {
  const [beamName, setBeamName] = useState("");
  const nameRef = useRef(null)
  const [beamMaterial, setBeamMaterial] = useState("concrete");
  const [profileType, setProfileType] = useState("");
  const [profileName, setProfileName] = useState("");
  const [steelsData, setSteelsData] = useState({});
  const [steelsDataError, setSteelsDataError] = useState("");
  const [beamDimensionsB, setBeamDimensionsB] = useState(20);
  const [beamDimensionsH, setBeamDimensionsH] = useState(40);

  useEffect(() => {
    if (beam && Object.keys(beam).length > 0) {
      setBeamName(beam.name);
      setBeamMaterial(beam.material);
      setSteelsData(beam.steelProperty);
      setBeamDimensionsB(beam.b);
      setBeamDimensionsH(beam.h);
      if(beam && Object.keys(beam.steelProperty).length > 0){
        setProfileType(beam.steelProperty.name.slice(0,3));
      }
    }
  }, []);

  useEffect(() => {
    if (profileType) {
      axios.get(ignoreCors + "https://steelapi.timskovjacobsen.com/api/" + profileType)
        .then(response => {
          setSteelsData(response.data);
        })
        .catch(err => setSteelsDataError(err));
    }
    if(beam && Object.keys(beam.steelProperty).length > 0){
      setProfileName(beam.steelProperty.name);
    }
  }, [profileType])

  const BeamDimensions = () => {
    return (
      <div className="beam-dimensions-main-container">
        <BeamSection b={beamDimensionsB} h={beamDimensionsH} WHSvg={150} />
        <div className='beam-dimensions-container'>
          <div className="beam-dimensions-b-container">
            <label htmlFor="beam-dimensions-b">b: </label>
            <input type="number" className='beam-dimensions' id="beam-dimensions-b" value={beamDimensionsB} onChange={e => e.target.value < 1 ? 1 : setBeamDimensionsB(e.target.value)} />
          </div>
          <div className="beam-dimensions-h-container">
            <label htmlFor="beam-dimensions-h">h: </label>
            <input type="number" className='beam-dimensions' id="beam-dimensions-h" value={beamDimensionsH} onChange={e => e.target.value < 1 ? 1 : setBeamDimensionsH(e.target.value)} />
          </div>
        </div>
      </div>
    );
  }

  const profileDetails = () => {
    if (Object.keys(steelsData).length > 0 && steelsData[profileName]) {
      return <ProfileDetails profile={steelsData[profileName]} />
    }
  }

  const selectSteelProfileName = () => {
    if (profileType) {
      return (
        <div className="select-steel-profile-name-container">
          <label htmlFor="select-profile-name">Profile name:</label>
          <select name="select-profile-name" id="select-profile-name" value={profileName} onChange={e => setProfileName(e.target.value)}>
            <option value="" disabled>{Object.keys(steelsData).length > 0 ? "Select a profile" : "Loading..."}</option>
            {Object.keys(steelsData).map(profile => <option key={profile} value={profile}>{profile}</option>)}
          </select>
        </div>
      );
    }
  }

  const selectSteelProfile = () => {
    return (
      <div className='select-steel-profile-main-container'>
        <div className="select-steel-profile-type-container">
          <label htmlFor="select-steel-profile">Profile type:</label>
          <select name="select-steel-profile" id="select-steel-profile" value={profileType} onChange={e => setProfileType(e.target.value)}>
            <option value="" disabled>Select a profile</option>
            <option value="HEA">HEA</option>
            <option value="HEB">HEB</option>
            <option value="HEM">HEM</option>
            <option value="IPE">IPE</option>
            <option value="IPN">IPN</option>
            <option value="UPN">UPN</option>
          </select>
        </div>
        {selectSteelProfileName()}
        {profileDetails()}
      </div>
    );
  }

  if (steelsDataError) {
    <p>Error {steelsDataError}</p>
  }

  return (
    <div className='beam-link-modify'>
      <div className="beam-name-container">
        <label htmlFor="beam-name">Beam name:</label>
        <input ref={nameRef} type="text" id="beam-name" value={beamName} onChange={(e) => setBeamName(e.target.value)} />
      </div>
      <div className="material-container">
        <label htmlFor="material">Material:</label>
        <select name="material" id="material-selection" value={beamMaterial} onChange={e => setBeamMaterial(e.target.value)}>
          <option value="concrete">Concrete</option>
          <option value="steel">Steel</option>
          <option value="wood">Wood</option>
        </select>
      </div>
      {beamMaterial === "steel" ? selectSteelProfile() : BeamDimensions()}
      <div className="confirm-cancel-container">
        <ButtonIcon type="confirm" onButtonClick={() => {
          if (beamName === "") {
            nameRef.current.focus();
          } else {
            if (beam) {
              onConfirmClick(beam.id, beamName, beamMaterial, steelsData[profileName], beamDimensionsB, beamDimensionsH);
            } else {
              onConfirmClick(beamName, beamMaterial, steelsData[profileName], beamDimensionsB, beamDimensionsH);
            }
          }
        }} />
        <ButtonIcon type="cancel" onButtonClick={() => {
          if (beam) {
            onCancelClick(beam.id);
          } else {
            onCancelClick();
          }
        }} />
      </div>
    </div>
  );
}

export default BeamLinkModify;