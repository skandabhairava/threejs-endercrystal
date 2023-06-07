import * as THREE from 'three'

const textureLoader = new THREE.TextureLoader()

export function genCubeSimple(width, height, depth, texture, transparent) {
    let cubeGeo = new THREE.BoxGeometry(width, height, depth)
    let cubeMaterial = new THREE.MeshBasicMaterial({
        map: textureLoader.load(texture),
        transparent: transparent,
        side: transparent? THREE.DoubleSide : THREE.FrontSide,
        depthWrite: transparent? false : true
    })
    let cube = new THREE.Mesh(cubeGeo, cubeMaterial)

    console.log(cube.material)

    cube.material.map.minFilter = cube.material.map.magFilter = THREE.NearestFilter
    return cube
}

export function genCube(width, height, depth, texture) {
    let cubeGeo = new THREE.BoxGeometry(width, height, depth)
    let materials = texture.map((item) => new THREE.MeshBasicMaterial({map: textureLoader.load(item)}))
    let cube = new THREE.Mesh(cubeGeo, materials)

    cube.material.map((mat) => {mat.map.minFilter = mat.map.magFilter = THREE.NearestFilter})
    return cube
}