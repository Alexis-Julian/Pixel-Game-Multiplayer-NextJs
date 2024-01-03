"use client";
import { Color } from "@/shared/types";
import ColorPicker from "./ColorPicker";
import Tiles from "./Tiles";
import { useState } from "react";
import { COLORS_NAME } from "@/shared/constants";
import { ref, onValue } from "firebase/database";
import { database as db } from "@/shared/db";
export default function Game() {
	const [useColor, SetColor] = useState<Color>(COLORS_NAME.white);

	return (
		<>
			<Tiles colorBackground={useColor} />
			<ColorPicker useColor={useColor} setColor={SetColor} />
		</>
	);
}
