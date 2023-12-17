import './App.css';
import DisplayScale from "./Components/Scales/DisplayScale";
import {
    createAllPossibleChordsInRootScale,
    createChord,
    createTriadChordFromRoot,
    MajorTriad
} from "./Concepts/ChordConstruction.ts";
import { useMemo, useState } from "react";
import {
    createScale,
    createScaleFromMajor,
    MajorScale,
    MinorAccidental,
    PhrygianDominantAccidental
} from "./Concepts/ScaleConstruction.ts";

const App = () => {
    const [root, setRoot] = useState("G");
    const scale = useMemo(() => createScaleFromMajor(PhrygianDominantAccidental, root), [root]);

    return (
        <div className='resume-bg w-[1300px] m-auto flex justify-center'>
            <div className='relative font-lato-meduim flex flex-col h-[1650px] mt-16'>
                <DisplayScale notes={scale} />
                <div className={"my-2"}>{scale.map((note) =>
                    <div key={note} className={"flex items-center my-4"}>
                        {createAllPossibleChordsInRootScale(note, scale).map(({chordName, notes}) => <div key={chordName}><div className={"w-[37px]"}>{note}{chordName}:</div><DisplayScale notes={notes} /></div>)}
                    </div>
                )}</div>
            </div>
        </div>
    );
}

export default App;
