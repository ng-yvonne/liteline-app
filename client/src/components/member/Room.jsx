const Room = (props) => {

    // Put a random number if no name was given
    var randomN = Math.floor(Math.random()*10000) + 1;

    // Use link given when clicked. Otherwise return to homepage
    var link = props.link ? String(props.link) : "/"
    return(
        <a href={link} className="bg-blue-950 hover:bg-blue-800 text-white font-bold py-6 px-4 rounded flex items-center justify-center">
            {/* Trim length of name to 18 characters */}
            {props.name ? String(props.name).length > 18 ? String(props.name).slice(0,15) + "...": props.name : "Name Not Found!"}
        </a>
    );
};

export default Room;