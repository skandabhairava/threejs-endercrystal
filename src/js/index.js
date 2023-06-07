import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { genCube, genCubeSimple } from './gen'

const renderer = new THREE.WebGLRenderer()
const textureLoader = new THREE.TextureLoader()

document.body.appendChild(renderer.domElement)

import end_sky from '../img/end_sky.png'
const scene = new THREE.Scene()
scene.background = textureLoader.load(end_sky, (texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.offset.set(0, 1)
    texture.repeat.set(20, 8)
})

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
)

function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = (window.innerWidth/window.innerHeight)
    camera.updateProjectionMatrix()
}

window.addEventListener("resize", () => {
    resize()    
})
resize()

const orbit = new OrbitControls(camera, renderer.domElement)

camera.position.set(-10, 30, 30)
orbit.update()

const axesHelper = new THREE.AxesHelper(10)
scene.add(axesHelper)

//////////////////////////////////////////////////////////////////////////////////////////////////////

// OBJECTS

// MAIN BASE
import base_main from '../img/base_main.png'
import base_side from '../img/base_side.png'
base_scale = 1.2
let base = genCube(8*base_scale, 3*base_scale, 8*base_scale, [base_side, base_side, base_main, base_main, base_side, base_side])
base.position.set(0, 0, 0)
scene.add(base)

import outer_cube_side from '../img/outer_cube_side.png'
// OUTER CUBE
let outerCube = genCubeSimple(6.5, 6.5, 6.5, outer_cube_side, true)
outerCube.position.set(0, 8, 0)
outerCube.rotation.set(-Math.PI/4, Math.PI/4, 0)
scene.add(outerCube)

// INNER CUBE
let innerCube = genCubeSimple(6, 6, 6, outer_cube_side, true)
innerCube.position.set(0, 8, 0)
innerCube.rotation.set(-Math.PI/4, Math.PI/4, 0)
scene.add(innerCube)


// MAGIC CUBE
import magic_1 from '../img/magic_1.png'
import magic_2 from '../img/magic_2.png'
import magic_3 from '../img/magic_3.png'
import magic_4 from '../img/magic_4.png'
import magic_5 from '../img/magic_5.png'
import magic_6 from '../img/magic_6.png'
let magicCube = genCube(5.3, 5.3, 5.3, [magic_1, magic_2, magic_3, magic_4, magic_5, magic_6])
magicCube.position.set(0, 8, 0)
magicCube.rotation.set(-Math.PI/4, Math.PI/4, 0)
scene.add(magicCube)


//////////////////////////////////////////////////////////////////////////////////////////////////////

function animate(time) {

    outerCube.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 0.025)
    outerCube.position.y = 2*(Math.sin(time/300)) + 10

    innerCube.rotateY(0.025)
    innerCube.rotateZ(0.025)
    innerCube.position.y = 2*(Math.sin(time/300)) + 10

    magicCube.rotateY(-0.025)
    magicCube.rotateZ(0.025)
    magicCube.position.y = 2*(Math.sin(time/300)) + 10

    renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)