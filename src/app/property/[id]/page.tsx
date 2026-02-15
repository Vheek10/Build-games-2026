/** @format */

import Link from "next/link";
import Image from "next/image";
import { sampleProperties } from "../../../lib/dummy-data";

export default async function PropertyPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id: idString } = await params;
	const id = Number(idString);
	const prop = sampleProperties.find((p) => p.id === id);

	if (!prop) return <div>Property not found</div>;

	return (
		<section className="max-w-4xl mx-auto">
			<div className="card-glass p-6 mb-6">
				<img
					src={prop.image}
					className="w-full rounded-lg mb-4 object-cover"
					alt={prop.title}
				/>
				<h1 className="text-2xl font-bold">{prop.title}</h1>
				<p className="text-sm text-strata-stone-light mt-2">{prop.location}</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="col-span-2 card-glass p-6">
					<h3 className="font-semibold mb-2">Description</h3>
					<p className="text-sm text-strata-stone-light">{prop.description}</p>
				</div>

				<aside className="card-glass p-6">
					<div className="mb-4">
						<div className="text-sm text-strata-stone-light">Valuation</div>
						<div className="text-lg font-semibold">
							${prop.price.toLocaleString()}
						</div>
					</div>
					<Link
						href="/marketplace"
						className="w-full px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold inline-flex items-center justify-center">
						Buy Property
					</Link>
				</aside>
			</div>
		</section>
	);
}
