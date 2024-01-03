import { COLORS, COLORS_NAME, HEIGHT, WIDTH } from "@/shared/constants";
import { NextResponse } from "next/server";
import { Color } from "@/shared/types";
import { set, ref, child } from "firebase/database";
import { database as db } from "@/shared/db";

export function GET() {
	return NextResponse.json({});
}

export async function POST(request: Request) {
	const { color, index }: { color: Color; index: number } =
		await request.json();

	if (typeof index !== "number") {
		return NextResponse.json(
			{ error: "index must be a number" },
			{ status: 400 }
		);
	}

	if (index < 0) {
		return NextResponse.json({ error: "index out of bounds" }, { status: 400 });
	}

	if (!COLORS.includes(color)) {
		return NextResponse.json({ error: "Invalid color" }, { status: 400 });
	}

	const refTiles = ref(db, `/${index}`);

	set(refTiles, color)
		.then((snapshot) => {})
		.catch((e) => {
			console.log(e);
		});

	return NextResponse.json({ probando: "1" });
}
