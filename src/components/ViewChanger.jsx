import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import GridViewIcon from "@mui/icons-material/GridView";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import ToggleButton from "@mui/material/ToggleButton";
import { useState } from "react";
import "../App.css";

const ViewChanger = (props) => {
  const [alignment, setAlignment] = useState(props.view);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    props.setView(newAlignment);
  };

  return (
    <div className="view-wrapper">
      <ToggleButtonGroup
        aria-label="Medium sizes"
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="card" key="card">
          <TextSnippetIcon />
        </ToggleButton>
        <ToggleButton value="grid" key="grid">
          <GridViewIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default ViewChanger;
