import { Float, MeshDistortMaterial, PerspectiveCamera, Sphere } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'

function AnimatedShape() {
	const meshRef = useRef()

	// Subtle rotation and movement following the clock
	useFrame(state => {
		const t = state.clock.getElapsedTime()
		meshRef.current.rotation.set(t / 5, t / 3, 0)
	})

	return (
		<Float speed={3} rotationIntensity={1} floatIntensity={2}>
			<Sphere ref={meshRef} args={[1, 100, 200]} scale={1.5}>
				<MeshDistortMaterial
					color="#0f172a" // Matches your Slate-900 Tailwind color
					speed={4}
					distort={0.4}
					radius={1}
					metalness={0.8}
					roughness={0.1}
				/>
			</Sphere>
		</Float>
	)
}

const Hero3D = () => {
	return (
		<div className="fixed inset-0 -z-10 h-screen w-full overflow-hidden bg-white">
			<Canvas>
				<PerspectiveCamera makeDefault position={[0, 0, 5]} />

				{/* Lighting for that "Premium" 3D look */}
				<ambientLight intensity={0.5} />
				<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
				<pointLight position={[-10, -10, -10]} color="#3b82f6" intensity={1.5} />

				<AnimatedShape />
			</Canvas>

			{/* The Hero Mask: Blends the 3D scene into your 2D Tailwind content */}
			<div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-stone-50 pointer-events-none" />
		</div>
	)
}

export default Hero3D
