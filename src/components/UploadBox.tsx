/** @format */
"use client";
import { useState } from "react";
import Image from "next/image";

export default function UploadBox() {
	const [preview, setPreview] = useState<string | null>(null);

	function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) return;
		const url = URL.createObjectURL(file);
		setPreview(url);
	}

	return (
		<div className="border border-dashed border-gray-200 rounded-lg p-4">
			<input
				type="file"
				accept="image/*,.pdf"
				onChange={handleFile}
				className="mb-3"
			/>
			{preview ? (
				<Image
					src={preview}
					alt="preview"
					width={176}
					height={128}
					className="w-44 h-32 object-cover rounded-md"
				/>
			) : (
				<div className="text-sm text-strata-stone-light">No file selected</div>
			)}
		</div>
	);
}
