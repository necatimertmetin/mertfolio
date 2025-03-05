import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { useMusicPlayer } from "../../../../context/useMusicPlayer";

type WobblyEyeProps = {
  ballSize?: number;
};

export const WobblyEye = ({ ballSize = 50 }: WobblyEyeProps) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ball, setBall] = useState<Matter.Body | null>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const { bassLevel } = useMusicPlayer();
  const clampedBassLevel = Math.max(bassLevel, 110);

  const createCircleWalls = (
    clampedBassLevel: number,
    _Bodies: typeof Matter.Bodies
  ) => {
    const centerX = 125;
    const centerY = 125;
    const sides = 32;
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
    let Runner = Matter.Runner;

    let engine = Engine.create({});
    engine.gravity.y = -1;

    engineRef.current = engine;

    let runner = Runner.create();

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

      let initialBall = Bodies.circle(150, 150, ballSize, {
        restitution: 1.15,
        frictionAir: 0,
        render: {
          fillStyle: "black",
        },
      });

      setBall(initialBall);

      World.add(engine.world, [
        ...createCircleWalls(clampedBassLevel, Bodies),
        initialBall,
      ]);

      Runner.run(runner, engine);
      Render.run(render);
    }

    return () => {
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
    };
  }, []);

  useEffect(() => {
    if (engineRef.current) {
      let World = Matter.World;
      let Bodies = Matter.Bodies;
      let engine = engineRef.current;

      World.clear(engine.world, false);

      let circleWalls = createCircleWalls(clampedBassLevel, Bodies);
      if (ball) {
        World.add(engine.world, [...circleWalls, ball]);
      }
    }
  }, [clampedBassLevel]);

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
    </div>
  );
};
