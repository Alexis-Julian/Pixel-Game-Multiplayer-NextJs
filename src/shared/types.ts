import { DataSnapshot } from "firebase/database";
import { COLORS } from "./constants";

export type Color = (typeof COLORS)[number];

export interface Grid {
	tiles: Color[];
	versionstamps: string[];
}

export interface FirebaseTiles {
	_node: { value: Color };
	_path: { pieces_: string[] };
}
