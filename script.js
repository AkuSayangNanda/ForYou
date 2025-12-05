console.clear();

/* SETUP THREE.JS */
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  5000
);
camera.position.z = 1100;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const controlsWebGL = new THREE.OrbitControls(camera, renderer.domElement);

/* PARTICLES HEART */
const tl = gsap.timeline({
  repeat: -1,
  yoyo: true,
});

const path = document.querySelector("svg path");
const length = path.getTotalLength();
const vertices = [];

for (let i = 0; i < length; i += 0.1) {
  const point = path.getPointAtLength(i);
  const vector = new THREE.Vector3(point.x, -point.y, 0);

  vector.x += (Math.random() - 0.5) * 30;
  vector.y += (Math.random() - 0.5) * 30;
  vector.z += (Math.random() - 0.5) * 70;

  vertices.push(vector);

  tl.from(
    vector,
    {
      x: 600 / 2,
      y: -552 / 2,
      z: 0,
      ease: "power2.inOut",
      duration: gsap.utils.random(2, 5),
    },
    i * 0.002
  );
}

const geometry = new THREE.BufferGeometry().setFromPoints(vertices);

const material = new THREE.PointsMaterial({
  color: 0xee5282,
  blending: THREE.AdditiveBlending,
  transparent: true,
  size: 3,
});

const particles = new THREE.Points(geometry, material);
particles.position.x -= 600 / 2;
particles.position.y += 552 / 2;
scene.add(particles);

/* ROTASI SCENE PELAN2 */
gsap.fromTo(
  scene.rotation,
  { y: -0.2 },
  {
    y: 0.2,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut",
    duration: 3,
  }
);

/* ANIMASI TEKS "I Love Nanda ..." */
gsap.fromTo(
  ".love-text",
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    duration: 2.5,
    delay: 2.0,
    ease: "power3.out",
  }
);

gsap.to(".love-text", {
  textShadow:
    "0 0 14px rgba(255,105,180,1), 0 0 32px rgba(255,20,147,0.9)",
  repeat: -1,
  yoyo: true,
  duration: 2.2,
  ease: "sine.inOut",
});

/* RENDER LOOP */
function render() {
  requestAnimationFrame(render);
  geometry.setFromPoints(vertices);
  renderer.render(scene, camera);
}

/* RESPONSIVE */
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);

render();
