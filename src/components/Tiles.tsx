"use client";
import { COLORS_NAME, HEIGHT, PIXEL_SIZE, WIDTH } from "@/shared/constants";
import { Color } from "@/shared/types";
import { useEffect, useState } from "react";
import { database as db } from "@/shared/db";
import {
	onValue,
	ref,
	onChildChanged,
	get,
	child,
	DataSnapshot,
} from "firebase/database";

export default function Tiles({ colorBackground }: { colorBackground: Color }) {
	const [useTiles, setTiles] = useState<Color[]>([]);

	useEffect(() => {
		const refTiles = ref(db, "/");

		//Fetch Tiles from database
		get(refTiles).then((snapshot: DataSnapshot) => {
			const tiles: Color[] = snapshot.val();
			setTiles(tiles);
		});
	}, []);

	useEffect(() => {
		const refTiles = ref(db, "/");
		//Observer
		onChildChanged(refTiles, (snapshot: any) => {
			const color: Color = snapshot._node.value_;
			const index: number = snapshot.ref._path.pieces_[0];
			if (color && index && useTiles.length > 0) {
				setTiles(useTiles.with(index, color));
			}
		});
	}, [useTiles]);

	const updateGrid = async (index: number, color: Color) => {
		const response = await fetch("/api/tiles", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ index, color }),
		});
		if (!response.ok) {
			console.error("Failed to update");
			return;
		}
	};

	return (
		<div className="flex items-center justify-center h-full w-full">
			<div
				className="h-[800px] w-[800px] bg-white grid"
				style={{ gridTemplateColumns: `repeat(${WIDTH},1fr)` }}
			>
				{useTiles?.map((color, index) => {
					return (
						<div
							key={index}
							style={{ height: `${PIXEL_SIZE}`, backgroundColor: `${color}` }}
							onClick={() => updateGrid(index, colorBackground)}
						></div>
					);
				})}
			</div>
		</div>
	);
}
