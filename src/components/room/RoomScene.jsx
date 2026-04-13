import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useDesktopStore } from "../../store/useDesktopStore";

export default function RoomScene() {
  const mountRef = useRef(null);
  const enterOS = useDesktopStore((state) => state.enterOS);
  const stateRef = useRef({
    transitioning: false,
    progress: 0,
    hovered: false,
    clock: new THREE.Clock(),
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070b1a);
    scene.fog = new THREE.Fog(0x070b1a, 7, 18);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.set(0, 2.2, 4.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x8fa8ff, 0.9);
    scene.add(ambientLight);

    const warmLight = new THREE.PointLight(0xffb56b, 1.8, 12);
    warmLight.position.set(-1.8, 2.6, -0.3);
    warmLight.castShadow = true;
    warmLight.shadow.mapSize.set(1024, 1024);
    scene.add(warmLight);

    const monitorGlow = new THREE.PointLight(0x4f7dff, 2.2, 7);
    monitorGlow.position.set(0, 1.7, -1.2);
    scene.add(monitorGlow);

    const fillLight = new THREE.DirectionalLight(0x7c8cff, 0.8);
    fillLight.position.set(2.8, 4, 2.5);
    scene.add(fillLight);

    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x2b1d12,
      roughness: 0.85,
    });

    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0x1b2340,
      roughness: 0.95,
    });

    const deskMaterial = new THREE.MeshStandardMaterial({
      color: 0x5b3a22,
      roughness: 0.7,
    });

    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0x2e3445,
      roughness: 0.35,
      metalness: 0.8,
    });

    const keyboardMaterial = new THREE.MeshStandardMaterial({
      color: 0x2d2d35,
      roughness: 0.6,
    });

    const screenMaterial = new THREE.MeshStandardMaterial({
      color: 0x163a8a,
      emissive: 0x2d6dff,
      emissiveIntensity: 1.4,
    });

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(12, 12), floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(12, 6), wallMaterial);
    backWall.position.set(0, 3, -3);
    scene.add(backWall);

    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(12, 6), wallMaterial);
    leftWall.position.set(-6, 3, 0);
    leftWall.rotation.y = Math.PI / 2;
    scene.add(leftWall);

    const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(12, 6), wallMaterial);
    rightWall.position.set(6, 3, 0);
    rightWall.rotation.y = -Math.PI / 2;
    scene.add(rightWall);

    const deskTop = new THREE.Mesh(
      new THREE.BoxGeometry(3, 0.08, 1.2),
      deskMaterial
    );
    deskTop.position.set(0, 1, -1.4);
    deskTop.castShadow = true;
    deskTop.receiveShadow = true;
    scene.add(deskTop);

    [
      [-1.35, -1.9],
      [-1.35, -0.9],
      [1.35, -1.9],
      [1.35, -0.9],
    ].forEach(([x, z]) => {
      const leg = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 1, 0.08),
        deskMaterial
      );
      leg.position.set(x, 0.5, z);
      leg.castShadow = true;
      scene.add(leg);
    });

    const monitorFrame = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.72, 0.05),
      metalMaterial
    );
    monitorFrame.position.set(0, 1.62, -1.72);
    monitorFrame.castShadow = true;
    scene.add(monitorFrame);

    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(1.1, 0.62),
      screenMaterial
    );
    screen.position.set(0, 1.62, -1.69);
    scene.add(screen);

    const standNeck = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.3, 0.08),
      metalMaterial
    );
    standNeck.position.set(0, 1.22, -1.72);
    scene.add(standNeck);

    const standBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.25, 0.04, 20),
      metalMaterial
    );
    standBase.position.set(0, 1.05, -1.72);
    scene.add(standBase);

    const keyboard = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.02, 0.2),
      keyboardMaterial
    );
    keyboard.position.set(-0.1, 1.05, -1.05);
    keyboard.castShadow = true;
    scene.add(keyboard);

    const mouse = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.02, 0.1),
      keyboardMaterial
    );
    mouse.position.set(0.48, 1.05, -1.02);
    mouse.castShadow = true;
    scene.add(mouse);

    const pcTower = new THREE.Mesh(
      new THREE.BoxGeometry(0.38, 0.78, 0.8),
      new THREE.MeshStandardMaterial({
        color: 0x1c2230,
        roughness: 0.4,
        metalness: 0.35,
      })
    );
    pcTower.position.set(1.1, 1.4, -1.3);
    pcTower.castShadow = true;
    scene.add(pcTower);

    const chairSeat = new THREE.Mesh(
      new THREE.BoxGeometry(0.62, 0.08, 0.58),
      new THREE.MeshStandardMaterial({
        color: 0x20232f,
        roughness: 0.65,
      })
    );
    chairSeat.position.set(0, 0.72, 0.15);
    chairSeat.castShadow = true;
    scene.add(chairSeat);

    const chairBack = new THREE.Mesh(
      new THREE.BoxGeometry(0.62, 0.68, 0.07),
      new THREE.MeshStandardMaterial({
        color: 0x20232f,
        roughness: 0.65,
      })
    );
    chairBack.position.set(0, 1.08, 0.48);
    chairBack.castShadow = true;
    scene.add(chairBack);

    const chairPole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.035, 0.5, 12),
      metalMaterial
    );
    chairPole.position.set(0, 0.42, 0.15);
    scene.add(chairPole);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const mouseParallax = { x: 0, y: 0 };

    const cameraStart = new THREE.Vector3(0, 2.2, 4.2);
    const cameraEnd = new THREE.Vector3(0, 1.65, -0.45);
    const lookStart = new THREE.Vector3(0, 1.45, -1.4);
    const lookEnd = new THREE.Vector3(0, 1.62, -1.72);
    const lookTarget = new THREE.Vector3();

    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const onMove = (event) => {
      const rect = container.getBoundingClientRect();

      mouseParallax.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseParallax.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObject(screen);

      stateRef.current.hovered = hits.length > 0;
      container.style.cursor = hits.length > 0 ? "pointer" : "default";
    };

    const onClick = (event) => {
      const rect = container.getBoundingClientRect();

      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObject(screen);

      if (hits.length > 0 && !stateRef.current.transitioning) {
        stateRef.current.transitioning = true;
        stateRef.current.progress = 0;
      }
    };

    container.addEventListener("mousemove", onMove);
    container.addEventListener("click", onClick);

    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = stateRef.current.clock.getDelta();

      if (stateRef.current.transitioning) {
        stateRef.current.progress = Math.min(
          stateRef.current.progress + delta / 1.25,
          1
        );

        const t = easeInOutCubic(stateRef.current.progress);

        camera.position.lerpVectors(cameraStart, cameraEnd, t);
        lookTarget.lerpVectors(lookStart, lookEnd, t);
        camera.lookAt(lookTarget);

        screenMaterial.emissiveIntensity = 1.4 + t * 3.2;
        monitorGlow.intensity = 2.2 + t * 2.5;

        if (stateRef.current.progress >= 1) {
          enterOS();
          return;
        }
      } else {
        camera.position.x = cameraStart.x + mouseParallax.x * 0.18;
        camera.position.y = cameraStart.y - mouseParallax.y * 0.1;
        lookTarget.set(0, 1.45, -1.4);
        camera.lookAt(lookTarget);

        const pulse = 1.2 + Math.sin(Date.now() * 0.003) * 0.18;
        screenMaterial.emissiveIntensity = stateRef.current.hovered ? 1.8 : pulse;
      }

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      const nextWidth = container.clientWidth;
      const nextHeight = container.clientHeight;
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight);
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);

      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [enterOS]);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          color: "#8a93b8",
          fontFamily: "monospace",
          fontSize: 13,
          letterSpacing: 2,
          textTransform: "uppercase",
          pointerEvents: "none",
          textShadow: "0 0 20px rgba(91,138,245,0.25)",
        }}
      >
        click the monitor to enter
      </div>
    </div>
  );
}