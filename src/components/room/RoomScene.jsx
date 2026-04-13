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
    scene.background = new THREE.Color(0x0a0a14);
    scene.fog = new THREE.Fog(0x0a0a14, 6, 14);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.set(0, 2.2, 3.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.9;

    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0x303050, 0.4));

    const pointLight = new THREE.PointLight(0xffa54d, 0.7, 8);
    pointLight.position.set(-1.6, 2.5, -0.4);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.set(512, 512);
    scene.add(pointLight);

    const monitorGlow = new THREE.PointLight(0x5b8af5, 0.6, 4);
    monitorGlow.position.set(0, 1.7, -0.8);
    scene.add(monitorGlow);

    const rimLight = new THREE.DirectionalLight(0x8888cc, 0.2);
    rimLight.position.set(3, 4, 2);
    scene.add(rimLight);

    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1209,
      roughness: 0.85,
    });

    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0x1c1c2a,
      roughness: 0.92,
    });

    const deskMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a1a0e,
      roughness: 0.65,
    });

    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.25,
      metalness: 0.85,
    });

    const keyboardMaterial = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.5,
    });

    const screenMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a2a4a,
      emissive: 0x2244aa,
      emissiveIntensity: 0.6,
    });

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), wallMaterial);
    backWall.position.set(0, 2.5, -2.5);
    scene.add(backWall);

    const deskTop = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.07, 1.1), deskMaterial);
    deskTop.position.set(0, 1, -1.2);
    deskTop.castShadow = true;
    deskTop.receiveShadow = true;
    scene.add(deskTop);

    [
      [-1.3, -1.7],
      [-1.3, -0.7],
      [1.3, -1.7],
      [1.3, -0.7],
    ].forEach(([x, z]) => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1, 0.06), deskMaterial);
      leg.position.set(x, 0.5, z);
      leg.castShadow = true;
      scene.add(leg);
    });

    const monitorFrame = new THREE.Mesh(
      new THREE.BoxGeometry(1.1, 0.65, 0.04),
      metalMaterial
    );
    monitorFrame.position.set(0, 1.6, -1.55);
    monitorFrame.castShadow = true;
    scene.add(monitorFrame);

    const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.02, 0.57), screenMaterial);
    screen.position.set(0, 1.6, -1.529);
    scene.add(screen);

    const standNeck = new THREE.Mesh(
      new THREE.BoxGeometry(0.07, 0.28, 0.07),
      metalMaterial
    );
    standNeck.position.set(0, 1.19, -1.55);
    scene.add(standNeck);

    const standBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.22, 0.03, 16),
      metalMaterial
    );
    standBase.position.set(0, 1.04, -1.55);
    scene.add(standBase);

    const keyboard = new THREE.Mesh(
      new THREE.BoxGeometry(0.52, 0.015, 0.18),
      keyboardMaterial
    );
    keyboard.position.set(-0.05, 1.05, -0.95);
    scene.add(keyboard);

    const mouse = new THREE.Mesh(
      new THREE.BoxGeometry(0.055, 0.015, 0.09),
      keyboardMaterial
    );
    mouse.position.set(0.42, 1.05, -0.95);
    scene.add(mouse);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const mouseParallax = { x: 0, y: 0 };

    const cameraStart = new THREE.Vector3(0, 2.2, 3.8);
    const cameraEnd = new THREE.Vector3(0, 1.6, -0.6);
    const lookStart = new THREE.Vector3(0, 1.4, -1.2);
    const lookEnd = new THREE.Vector3(0, 1.6, -1.55);
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
          stateRef.current.progress + delta / 1.4,
          1
        );

        const t = easeInOutCubic(stateRef.current.progress);

        camera.position.lerpVectors(cameraStart, cameraEnd, t);
        lookTarget.lerpVectors(lookStart, lookEnd, t);
        camera.lookAt(lookTarget);

        screenMaterial.emissiveIntensity = 0.6 + t * 3;
        monitorGlow.intensity = 0.6 + t * 2;

        if (stateRef.current.progress >= 1) {
          enterOS();
          return;
        }
      } else {
        camera.position.x = cameraStart.x + mouseParallax.x * 0.15;
        camera.position.y = cameraStart.y - mouseParallax.y * 0.08;
        lookTarget.set(0, 1.4, -1.2);
        camera.lookAt(lookTarget);

        const pulse = 0.55 + Math.sin(Date.now() * 0.003) * 0.08;
        screenMaterial.emissiveIntensity = stateRef.current.hovered ? 0.9 : pulse;
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
    <div ref={mountRef} style={{ width: "100%", height: "100%", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          color: "#6b7280",
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