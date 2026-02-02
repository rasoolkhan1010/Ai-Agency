import { Canvas } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";

function Net() {
  const points = Array.from({length: 20}, () => [
    (Math.random()-0.5)*3,
    (Math.random()-0.5)*3,
    (Math.random()-0.5)*3
  ]);
  return (
    <>
      {points.map((p,i)=>(
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.05,16,16]} />
          <meshStandardMaterial color="#22d3ee" />
        </mesh>
      ))}
      <Line points={points} color="#22d3ee" lineWidth={1} />
    </>
  );
}

export default function Neural3D(){
  return (
    <Canvas className="h-[300px]">
      <ambientLight />
      <Net />
      <OrbitControls autoRotate enableZoom={false}/>
    </Canvas>
  );
}
