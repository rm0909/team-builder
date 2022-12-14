import "./formation.css";
import { Select } from "./formationComponents/Select";
import { Field } from "./formationComponents/Field";
import { useEffect, useState } from "react";

import {
  fourFourTwo,
  fourFourTwoLosangle,
  fourThreeThree,
  fourThreeThreeB,
  threeFiveTwo,
} from "../util/positions";

function Formation({ formation, team }) {

  useEffect(()=>{
    resetAllPlayers()
  },[team]);
  
  const [showPlayersContainer, setShowPlayersContainer] = useState(false);
  const [clickedCircle, setClickedCircle] = useState("");
  const [selectedPlayers, setSelectedPlayers] = useState({});
  const [checkFormation, setCheckFormation] = useState("");
  

  const selectPosition = (e) => {
    if (e.target.getAttribute("clear") === "true") return;
    const circleID = e.currentTarget.id;
    setShowPlayersContainer(true);
    setClickedCircle(circleID);
  };
  const selectPlayer = (player) => {
    setShowPlayersContainer(false);
    const playerAlreadySelected =
      Object.values(selectedPlayers).includes(player);
    if (playerAlreadySelected) return;
    setSelectedPlayers((prevSelected) => {
      return { ...prevSelected, [clickedCircle]: player };
    });
  };
  const clearPlayer =  (e) => {
    const circleID = e.target.getAttribute("value");
    setClickedCircle(circleID);
    if (circleID !== clickedCircle) return;
    setSelectedPlayers((prevSelected) => {
      return { ...prevSelected, [clickedCircle]: null };
    });
  };
  const resetAllPlayers = ()=> setSelectedPlayers({})
  const goBack = (e) => {
    if (e.target.id === "field") setShowPlayersContainer(false);
    return;
  };

  useEffect(() => {
    switch (formation) {
      case "fourfourtwo":
        setCheckFormation(fourFourTwo);
        return;
      case "fourfourtwolosangle":
        setCheckFormation(fourFourTwoLosangle);
        return
      case "fourthreethree":
        setCheckFormation(fourThreeThree);
        return;
        case "fourthreethreeb":
        setCheckFormation(fourThreeThreeB);
        return;
      case "threefivetwo":
        setCheckFormation(threeFiveTwo);
        return;
      default:
        setCheckFormation(fourFourTwo);
        break;
    }
  }, [formation]);

  return (
    <main className="field" id="field" onClick={goBack}>
      <Field
        selectPosition={selectPosition}
        selectedPlayers={selectedPlayers}
        clearPlayer={clearPlayer}
        styles={checkFormation}
      />

      {showPlayersContainer && (
        <Select
         team={team}
          selectPlayer={selectPlayer}
          close={() => setShowPlayersContainer(false)}
        />
      )}
    </main>
  );
}

export { Formation };
