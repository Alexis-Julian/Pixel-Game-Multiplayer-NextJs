"use client";
import { Color } from "@/shared/types";
import { COLORS } from "@/shared/constants";
import { Dispatch, SetStateAction } from "react";

export default function ColorPicker({
	setColor,
	useColor,
}: {
	setColor: Dispatch<SetStateAction<Color>>;
	useColor: Color;
}) {
	return (
		<div className="fixed flex bottom-0 mb-5 left-[43%] gap-4   ">
			{COLORS.map((color, index) => {
				return (
					<div
						key={index}
						className={`h-8 w-8   ${
							useColor === color
								? "outline outline-offset-4 outline-2 outline-white "
								: "outline-none"
						}`}
						style={{ backgroundColor: `${color}` }}
						onClick={() => setColor(color)}
					></div>
				);
			})}
		</div>
	);
}
