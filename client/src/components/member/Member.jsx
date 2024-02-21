import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import green from "@material-ui/core/colors/green";

const Member = (props) => {
  // Put a random number if no name was given
  var randomN = Math.floor(Math.random() * 10000) + 1;

  // Change icon color based on status
  var iconColor =
    String(props.isOwner) === "true"
      ? String(props.isAFK) === "true"
        ? "black"
        : "gold"
      : String(props.isAFK) === "true"
      ? "grey"
      : "green";

  return (
    <section className="flex-shrink-0 rounded-full border-2 border-blue-200 bg-blue-50">
      <span>
        <AccountCircleIcon style={{ color: String(iconColor) }} />
      </span>
      {/* Give a guest name if no name was given, otherwise put the given name and shorted it if it's over 18 characters */}
      <span className="mx-2">
        {props.name
          ? String(props.name).length > 18
            ? String(props.name).slice(0, 15) + "..."
            : props.name
          : "Guest " + randomN}
      </span>
    </section>
  );
};

export default Member;
