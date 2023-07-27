import ReturnToolButton from "./ReturnToolButton";
import "./Tool.css";
const Tool = ({ tool, index }) => {
  function formatDate(dateString) {
    const dateSegments = dateString.split("T");
    const datePart = dateSegments[0].split("-").reverse().join(".");
    const timePart = dateSegments[1].split(":").slice(0, 2).join(":");
    return `${datePart} - ${timePart}`;
  }
  return (
    <div className="project-table-row">
      <div
        className={
          tool?.takenBy == undefined
            ? index % 2 == 0
              ? "tool-tr-zugi"
              : "tool-tr-notzugi"
            : index % 2 == 0
            ? "tool-tr-zugi-taken"
            : "tool-tr-notzugi-taken"
        }
      >
        <div className="tool-table-leftpart">{`${
          tool?.date != undefined ? formatDate(tool?.date) : ""
        }`}</div>
        <div className="tool-table-part">
          {tool?.signed == true ? `כן` : tool?.signed == undefined ? "" : "לא"}
        </div>
        <div className="tool-table-part">{`${
          tool?.takenBy != undefined ? tool?.takenBy : ""
        }`}</div>
        <div className="tool-table-toolpart">
          {`${tool?.toolName}`}
          {tool?.takenBy?.length > 0 && (
            <ReturnToolButton toolId={tool?._id} toolName={tool?.toolName} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Tool;
