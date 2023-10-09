export enum change {
	Sharpened,
	Flattened,
}

export interface chordNote {
	noteIndex: number,
	change?: {
		steps: number,
		type: change,
	}
}

export const notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
export const MajorScale = [1, 1, 0.5, 1, 1, 1, 0.5];
export const MajorTriad = [{ noteIndex: 1 }, { noteIndex: 3 }, { noteIndex: 5 }];
export const MinorTriad: chordNote[] = [
	{ noteIndex: 1 },
	{ noteIndex: 3, change: { steps: 0.5, type: change.Flattened } },
	{ noteIndex: 5 }
];

export const CreateScale = (scale, root) => {
	const scaleNotes = [root];
	let currentNoteIndex = notes.findIndex((note) => note === root);

	scale.forEach((step) => {
		scaleNotes.push(notes[(currentNoteIndex + step * 2) % 12]);
		currentNoteIndex = (currentNoteIndex + step * 2) % 12;
	});

	scale.pop();
	return scaleNotes;
};

export const createChord = (scale, chordNotes: chordNote[]) => {
	const ChordNotes = [];

	chordNotes.forEach((chordNote) => {
		let note = scale[chordNote.noteIndex - 1];
		if (chordNote?.change) {
			const chordNoteIndex = notes.findIndex((pitch) => note === pitch);
			note = chordNote.change.type === change.Sharpened ?
				notes[(chordNoteIndex + chordNote.change.steps * 2) % 12]
				: notes[(chordNoteIndex - chordNote.change.steps * 2) % 12];
		}
		ChordNotes.push(note);
	});
	return ChordNotes;
};