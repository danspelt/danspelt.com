import { useProgress } from "@react-three/drei";
import { useEffect } from "react";

export default function Loader({ started, onStarted }) {
  const { progress } = useProgress();
  useEffect(() => {
    if (progress === 100) {
      onStarted();
    }
  }, [progress, onStarted]);
  return (
    <div className={started ? "z-20 bg-black w-full h-full absolute" : "hidden"}>
      <div className="w-full h-2 bg-gray-2000">
        <div
          className="h-full bg-blue-500"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
      <div className="text-center  h-full flex justify-center items-center">
        <img src="/images/logo.png" alt="logo" className="w-40 h-40" />
      </div>
    </div>
  );
}
