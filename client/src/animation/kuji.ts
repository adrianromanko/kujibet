
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { AppConfig } from '../app.config';
import logo from '../logo.png';
import { text } from 'body-parser';

export const create = (): { renderer: THREE.WebGLRenderer; start: () => void } => {
    var img = new Image();

    img.src = logo;
    var tex = new THREE.Texture(img);

    (img as any).tex = tex;

    img.onload = function () {

        (this as any).tex.needsUpdate = true;
    };

    const nearDist = 0.1;
    const farDist = 10000;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        nearDist,
        farDist
    );
    camera.position.x = farDist * -2;
    camera.position.z = 500;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor("#000");
    renderer.setPixelRatio(window.devicePixelRatio); // For HiDPI devices to prevent bluring output canvas
    renderer.setSize(window.innerWidth, window.innerHeight);


    const cubeSize = 150;
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize); // BufferAttribute allows for more efficient passing of data to the GPU

    const positionAttribute = geometry.getAttribute('position');

    const colors = [];
    const color = new THREE.Color();

    for (let i = 0; i < positionAttribute.count; i += 3) {

        color.set(Math.random() * 0xffffff);

        // define the same color for each vertex of a triangle

        colors.push(color.r, color.g, color.b);
        colors.push(color.r, color.g, color.b);
        colors.push(color.r, color.g, color.b);

    }

    // define the new attribute

    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));


    const coneMesh = new THREE.MeshBasicMaterial({ map: tex, vertexColors: true });

    const normalMesh = new THREE.MeshNormalMaterial();
    const group = new THREE.Group();
    for (let i = 0; i < 350; i++) {
        const mesh = new THREE.Mesh(geometry, coneMesh);
        const dist = farDist / 3;
        const distDouble = dist * 2;
        const tau = 2 * Math.PI;

        mesh.position.x = Math.random() * distDouble - dist;
        mesh.position.y = Math.random() * distDouble - dist;
        mesh.position.z = Math.random() * distDouble - dist;
        mesh.rotation.x = Math.random() * tau;
        mesh.rotation.y = Math.random() * tau;
        mesh.rotation.z = Math.random() * tau;

        // Manually control when 3D transformations recalculation occurs for better performance
        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();

        group.add(mesh);
    }
    scene.add(group);

    const loader = new FontLoader();
    const textMesh = new THREE.Mesh();
    const createTypo = (font: any) => {
        const word = AppConfig.applicatioName;
        const typoProperties = {
            font: font,
            size: cubeSize,
            height: cubeSize / 2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 2,
            bevelOffset: 1,
            bevelSegments: 8
        };
        const text = new TextGeometry(word, typoProperties);


        textMesh.geometry = text;
        textMesh.material = normalMesh;
        textMesh.position.x = cubeSize * -2;
        textMesh.position.z = cubeSize * -1;
        scene.add(textMesh);
    };
    loader.load(
        "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
        createTypo
    );

    let mouseX = 0;
    let mouseY = 0;
    const mouseFX = {
        windowHalfX: window.innerWidth / 2,
        windowHalfY: window.innerHeight / 2,
        coordinates: function (coordX: number, coordY: number) {
            mouseX = (coordX - mouseFX.windowHalfX) * 10;
            mouseY = (coordY - mouseFX.windowHalfY) * 10;
        },
        onMouseMove: function (e: any) {
            mouseFX.coordinates(e.clientX, e.clientY);
        },
        onTouchMove: function (e: any) {
            mouseFX.coordinates(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        }
    };
    document.addEventListener("mousemove", mouseFX.onMouseMove, false);
    document.addEventListener("touchmove", mouseFX.onTouchMove, false);

    const start = () => {
        requestAnimationFrame(start);

        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (mouseY * -1 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        const t = Date.now() * 0.001;
        const rx = Math.sin(t * 0.7) * 0.5;
        const ry = Math.sin(t * 0.3) * 0.5;
        const rz = Math.sin(t * 0.2) * 0.5;
        group.rotation.x = rx;
        group.rotation.y = ry;
        group.rotation.z = rz;
        textMesh.rotation.x = rx;
        textMesh.rotation.y = ry;
        textMesh.rotation.z = rx;

        renderer.render(scene, camera);
    };
    return {
        renderer,
        start
    }
}
