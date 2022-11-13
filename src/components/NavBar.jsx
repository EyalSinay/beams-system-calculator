import "./css/navbar.style.css";
// import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
// import BeamsContext from "../myContext/BeamsContext";

function NavBar() {
    // const { beams } = useContext(BeamsContext);
    // const [CURRENT_INDEX, setCURRENT_INDEX] = useState(-1);
    // const [pathName, setPathName] = useState("");

    // useEffect(() => {
    //     setPathName(window.location.pathname.substring(1));
    // }, []);

    // useEffect(() => {
    //     setCURRENT_INDEX(() => {
    //         return beams.findIndex((beam) => beam.name === pathName);
    //     });
    //     // eslint-disable-next-line
    // }, [pathName]);

    // const getNextIndex = () => {
    //     if (CURRENT_INDEX === beams.length - 1) {
    //         return 0;
    //     }
    //     return CURRENT_INDEX + 1;
    // };

    // const getPrevIndex = () => {
    //     if (CURRENT_INDEX === 0) {
    //         return beams.length - 1;
    //     }
    //     return CURRENT_INDEX - 1;
    // };

    // const getPath = (direction) => {
    //     if (CURRENT_INDEX < 0) {
    //         return "";
    //     } else {
    //         // return beams[CURRENT_INDEX].name;
    //         switch (direction) {
    //             case "next":
    //                 return beams[getNextIndex()].name;
    //             case "prev":
    //                 return beams[getPrevIndex()].name;
    //             default:
    //                 return CURRENT_INDEX;
    //         }
    //     }
    // };

    // console.log(CURRENT_INDEX);

    return (
        <nav className="nav-container">
            {/* <div className="nav-link btn-menu"> */}
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30px" height="30px"><path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z" /></svg> */}
            {/* </div> */}
            <div className="links-container">
                {/* <NavLink
                    className="nav-link"
                    data-allowed={CURRENT_INDEX < 0 ? "false" : "true"}
                    to={`/${getPath("next")}`}
                >
                    ←
                </NavLink> */}
                <NavLink className="nav-link" to="/">
                    Main
                </NavLink>
                {/* <NavLink
                    className="nav-link"
                    data-allowed={CURRENT_INDEX < 0 ? "false" : "true"}
                    to={`/${getPath("prev")}`}
                >
                    →
                </NavLink> */}
            </div>
            {/* <div className='about-contact-container'>
        <NavLink className="nav-link" to="/">{'About&Contact'}</NavLink>
      </div> */}
        </nav>
    );
}

export default NavBar;
