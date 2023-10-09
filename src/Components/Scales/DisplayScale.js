const DisplayScale = ({notes}) => {

    return (
        <div className={"flex items-start"}>{notes.map((note) =>
            <div className={"bg-gray-400 rounded-md px-2 py-1 mx-2"}>
                {note}
            </div>)}
        </div>
    );
}

export default DisplayScale;