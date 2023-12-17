// @ts-ignore
import { createScale, intervalNote, MajorScale, notes } from "./ScaleConstruction.ts";
// @ts-ignore
import * as AllChords from "./AllChords.ts";
// @ts-ignore
import { chord } from "./AllChords.ts";

export const createChord = (scale, chordNotes: intervalNote[]) => {
	const ChordNotes = [];

	chordNotes.forEach((chordNote) => {
		let note = scale[chordNote.noteIndex - 1];
		if (chordNote?.change) {
			const chordNoteIndex = notes.findIndex((pitch) => note === pitch);
			note = notes[(chordNoteIndex + chordNote.change * 2) % 12];
		}
		ChordNotes.push(note);
	});
	return ChordNotes;
};

// export createChordBasedOnMajor = (chordNotes: intervalNote[]) => createChord(createScale(MajorScale, ), chordNotes);

export const createTriadChordFromRoot = (note, rootScale) => {
	const root = rootScale[0];
	const noteToRootInterval = (notes.findIndex((pitch) => pitch === note) - notes.findIndex((pitch) => pitch === root) + 12) % 12;
	const noteScale = rootScale.map((rootScaleNote) => notes[(notes.findIndex((pitch) => pitch === rootScaleNote) + noteToRootInterval) % 12]);

	const scaleTriad = [noteScale[0], noteScale[2], noteScale[4]];

	/* check up to 2 half steps, there might not be two 3 half steps sequential in a scale */
	const intervalsToCheck = [-0.5, 0.5, -1, 1];
	const scaleTriadCompatibleWithRoot = [];

	console.log(scaleTriad);
	scaleTriad.forEach((triadNote) => {
		if (!rootScale.includes(triadNote)) {
			const triadNoteIndex = notes.findIndex((pitch) => pitch === triadNote);

			intervalsToCheck.find((interval) => {
					const newNote = notes[(triadNoteIndex + interval * 2 + 12) % 12];
					return rootScale.includes(newNote) && scaleTriadCompatibleWithRoot.push(newNote);
				}
			);
		} else { scaleTriadCompatibleWithRoot.push(triadNote); }
	});
	console.log(scaleTriadCompatibleWithRoot);

	return scaleTriadCompatibleWithRoot;
};

export const createAllPossibleChordsInRootScale = (note, rootScale) => {
	// const root = rootScale[0];
	// const noteToRootInterval = (notes.findIndex((pitch) => pitch === note) - notes.findIndex((pitch) => pitch === root) + 12) % 12;
	// const noteScale = rootScale.map((rootScaleNote) => notes[(notes.findIndex((pitch) => pitch === rootScaleNote) + noteToRootInterval) % 12]);

	const possibleChords = [];
	const noteMajorScale = createScale(MajorScale, note);
	Object.keys(AllChords).forEach((chord) => {
		let allNotesAreInScale = true;
		const thisChord: chord = createChord(noteMajorScale, AllChords[chord].intervals);
		thisChord.forEach((pitch) => {
			allNotesAreInScale = allNotesAreInScale && rootScale.includes(pitch);
		});
		if (allNotesAreInScale) { possibleChords.push({ chordName: AllChords[chord].symbol, notes: thisChord }); }
	});

	return possibleChords;
};
