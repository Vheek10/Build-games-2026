/** @format */

"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
	OrbitControls,
	Environment,
	Float,
	Html,
} from "@react-three/drei";

type Property3DViewerProps = {
	modelUrl?: string;
	className?: string;
};

function FallbackTower() {
	return (
		<Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
			<group>
				<mesh castShadow receiveShadow>
					<boxGeometry args={[1.8, 3.6, 1.8]} />
					<meshStandardMaterial
						color="#1d4ed8"
						metalness={0.5}
						roughness={0.2}
					/>
				</mesh>
				<mesh position={[0, -2.2, 0]} receiveShadow>
					<boxGeometry args={[3.5, 0.3, 3.5]} />
					<meshStandardMaterial color="#020617" roughness={1} />
				</mesh>
				<mesh position={[0, 2.1, 0]} castShadow>
					<boxGeometry args={[0.8, 0.12, 0.8]} />
					<meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={0.6} />
				</mesh>
			</group>
		</Float>
	);
}

export function Property3DViewer({ className }: Property3DViewerProps) {
	return (
		<div className={className}>
			<Canvas
				shadows
				camera={{ position: [4, 3, 6], fov: 45 }}
			>
				<color attach="background" args={["#f9fafb"]} />
				<fog attach="fog" args={["#e5e7eb", 12, 28]} />

				{/* Lights */}
				<ambientLight intensity={0.3} />
				<directionalLight
					intensity={1.2}
					position={[5, 8, 5]}
					castShadow
					shadow-mapSize-width={1024}
					shadow-mapSize-height={1024}
				/>
				<spotLight
					intensity={0.7}
					position={[-6, 8, -4]}
					angle={0.5}
					penumbra={0.4}
					color="#22d3ee"
				/>

				<Suspense
					fallback={
						<Html center>
							<div className="px-3 py-1.5 rounded-full bg-slate-900/80 text-[11px] text-slate-200 border border-slate-700/60">
								Loading 3D scene…
							</div>
						</Html>
					}
				>
					{/* TODO: Replace with real GLTF loader when your property models are ready */}
					<FallbackTower />
					<Environment preset="city" />
				</Suspense>

				<OrbitControls
					enablePan={false}
					maxPolarAngle={Math.PI / 2.1}
					minDistance={5}
					maxDistance={12}
				/>
			</Canvas>
		</div>
	);
}


