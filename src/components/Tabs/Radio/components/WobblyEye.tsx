import { useEffect, useRef, useState } from "react";
import Matter from "matter-js"; // Matter.js import ediyoruz
import { useMusicPlayer } from "../../../../context/useMusicPlayer";

type WobblyEyeProps = {
  ballSize?: number;
};

export const WobblyEye = ({ ballSize = 50 }: WobblyEyeProps) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ball, setBall] = useState<Matter.Body | null>(null); // Ball'ı state ile tutacağız
  const engineRef = useRef<Matter.Engine | null>(null); // Engine'in referansını tut
  const { bassLevel } = useMusicPlayer();
  const clampedBassLevel = Math.max(bassLevel, 110);

  const createCircleWalls = (
    clampedBassLevel: number,
    _Bodies: typeof Matter.Bodies
  ) => {
    const centerX = 125; // Çemberin merkezi X koordinatı
    const centerY = 125; // Çemberin merkezi Y koordinatı
    const sides = 32; // Çevreyi oluşturacak kenar sayısı
    let circleWalls: Matter.Body[] = [];

    for (let i = 0; i < sides; i++) {
      let angle = (i / sides) * Math.PI * 2;
      let x = centerX + (Math.cos(angle) * clampedBassLevel) / 2;
      let y = centerY + (Math.sin(angle) * clampedBassLevel) / 2;
      let wall = Matter.Bodies.rectangle(x, y, 5, 30, {
        isStatic: true,
        angle: angle,
        render: {
          fillStyle: "black",
        },
      });
      circleWalls.push(wall);
    }

    return circleWalls;
  };

  useEffect(() => {
    let Engine = Matter.Engine;
    let Render = Matter.Render;
    let World = Matter.World;
    let Bodies = Matter.Bodies;
    let Runner = Matter.Runner; // Import the Runner

    let engine = Engine.create({});
    engine.gravity.y = -1;

    engineRef.current = engine; // Engine'i kaydediyoruz

    let runner = Runner.create(); // Create a Runner instance

    if (boxRef.current && canvasRef.current) {
      let render = Render.create({
        element: boxRef.current,
        engine: engine,
        canvas: canvasRef.current,
        options: {
          width: 250,
          height: 250,
          background: "transparent",
          wireframes: false,
        },
      });

      // Topu çemberin merkezine yerleştiriyoruz (İlk seferde)
      let initialBall = Bodies.circle(150, 150, ballSize, {
        restitution: 1.15,
        frictionAir: 0,
        render: {
          fillStyle: "black",
        },
      });

      setBall(initialBall); // Ball state'ini kaydediyoruz

      // Dünya'ya bariyerleri ve topu ekle
      World.add(engine.world, [
        ...createCircleWalls(clampedBassLevel, Bodies),
        initialBall,
      ]);

      Runner.run(runner, engine); // Use Runner to run the engine
      Render.run(render); // This starts the render loop
    }

    return () => {
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
    };
  }, []); // İlk başta 1 kez çalışır

  useEffect(() => {
    if (engineRef.current) {
      let World = Matter.World;
      let Bodies = Matter.Bodies;
      let engine = engineRef.current;

      // Önce eski duvarları temizle
      World.clear(engine.world, false);

      // Yeni duvarları ekle, ancak topu koru
      let circleWalls = createCircleWalls(clampedBassLevel, Bodies);
      if (ball) {
        World.add(engine.world, [...circleWalls, ball]); // Ball'u tekrar eklemeye gerek yok, zaten var
      }
    }
  }, [clampedBassLevel]); // Sadece radius değiştiğinde çalışır

  return (
    <div>
      <div
        ref={boxRef}
        style={{
          width: 250,
          height: 250,
        }}
      >
        <canvas ref={canvasRef} />
      </div>
      {/* Yarıçapı değiştirmek için buton */}
    </div>
  );
};
