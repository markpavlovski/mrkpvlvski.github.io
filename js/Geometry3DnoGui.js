
class Geometry3DnoGui extends BasicSceneMtStHelens {
  constructor(container = document.body, data = {}, scale, radius) {
    super(container)
    this.data = data
    this.scale = scale
    this.radius = radius
    this.initObjects()
    this.gElevationScale = 1
  }

  initObjects() {
    let group = this.group

    super.clearGroup(group)


    let size = this.data.length

    let minElv = this.data
      .map(el => el.reduce(
        (acc, el) => Math.max(el.elv, 0) < acc ? Math.max(el.elv, 0) : acc, Infinity))
      .reduce((acc, el) => el < acc ? el : acc, Infinity)

    let maxElv = this.data
      .map(el => el.reduce(
        (acc, el) => Math.max(el.elv, 0) > acc ? Math.max(el.elv, 0) : acc, -Infinity))
      .reduce((acc, el) => el > acc ? el : acc, -Infinity)

    this.heatmap = this.data.map(el => el.map(el => Math.max(el.elv, 0)))


    let boxSize = 400
    let tileLength = boxSize / (size - 1)
    let elevationScale = 0.5 / this.scale / (2* this.radius + 1)




    const surfaceGeometry = new THREE.Geometry()
    surfaceGeometry.verticesNeedUpdate = true
    this.heatmap.forEach((el, row) => el.forEach((el, col) => {
      surfaceGeometry.vertices.push(
        new THREE.Vector3(tileLength * col,(el - minElv) * elevationScale, tileLength * row)
      )
    }))


    // Define faces

    for (let row = 0; row < size-1; row++) {
      for (let col = 0; col < size-1; col++) {
        surfaceGeometry.faces.push(new THREE.Face3(
          row * size  + col,
          (row + 1) * size + col,
          row * size + col + 1
        ))
        surfaceGeometry.faces.push(new THREE.Face3(
          (row + 1) * size + col,
          (row + 1) * size + col + 1,
          row * size + col + 1
        ))
      }
    }

    surfaceGeometry.computeBoundingSphere()
    surfaceGeometry.center()
    surfaceGeometry.computeVertexNormals()
    surfaceGeometry.computeFaceNormals()

    let surfaceMaterial = new THREE.MeshBasicMaterial({
      color: 0x515151,
      wireframe: true
    })
    let surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial)
    this.surface = surface
    this.group.add(surface)
    this.yCoords = this.surface.geometry.vertices.map(el => el.y)
    this.surface.geometry.verticesNeedUpdate = true

  }

  animate() {
    requestAnimationFrame(this.animate.bind(this))
    this.controls.update();

    if (this.surface) {
      this.surface.geometry.vertices = this.surface.geometry.vertices.map((el,idx) => {
        el.y = this.yCoords[idx]
        return el
      })
      this.surface.geometry.verticesNeedUpdate = true

    }
    this.render()
  }



}
