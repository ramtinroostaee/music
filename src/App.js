import './App.css';
import DisplayScale from "./Components/Scales/DisplayScale";
import { createChord, CreateScale, MajorScale, MajorTriad, MinorTriad } from "./Components/Scales/calc.ts";

const AMajor = CreateScale(MajorScale, "A");

function App() {
    return (
        <div className='resume-bg w-[1300px] m-auto flex justify-center'>
            <div className='relative font-lato-meduim flex flex-col h-[1650px] mt-16'>
                <DisplayScale notes={AMajor} />
                <div className={"flex items-center my-8"}>
                    AMin: <DisplayScale notes={createChord(AMajor, MinorTriad)} />
                </div>
                <div  className={"flex items-center"}>
                    AMaj: <DisplayScale notes={createChord(AMajor, MajorTriad)} />
                </div>
            </div>
        </div>
    );
}

export default App;
