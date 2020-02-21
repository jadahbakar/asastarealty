var db = require('@db/db')
var router = require('express').Router()
var asyncro = require('../asyncro/asyncro')

const getAgama = async (request, response, next) => {
  const agama = await db.any('SELECT mst.agama_get()')
  try {
    response.send(agama[0].agama_get)
  } catch (error) {
    return response.status(400).send(error)
  }
}

const getMarital = async (request, response, next) => {
  const marital = await db.any(
    'SELECT marital_id, marital_nama FROM mst.marital'
  )
  try {
    response.json(marital)
  } catch (error) {
    return response.status(400).send(error)
  }
}

const getPropinsi = async (request, response, next) => {
  const propinsi = await db.any('SELECT mst.propinsi_get()')
  try {
    response.send(propinsi[0].propinsi_get)
  } catch (error) {
    return response.status(400).send(error)
  }
}

const getKota = asyncro.asyncHandler(async (request, response, next) => {
  const propinsiId = request.params.propinsiId
  const kota = await db.any(
    'SELECT kota_id, kota_nama FROM mst.kota WHERE kota_propinsi = $(propinsiId) ',
    { propinsiId }
  )
  try {
    response.json(kota)
  } catch (error) {
    return response.status(400).send(error)
  }
})

const getKecamatan = asyncro.asyncHandler(async (request, response, next) => {
  const kotaId = request.params.kotaId
  const kecamatan = await db.any(
    'SELECT kecamatan_id, kecamatan_nama FROM mst.kecamatan WHERE kecamatan_kota = $(kotaId) ',
    { kotaId }
  )
  try {
    response.json(kecamatan)
  } catch (error) {
    return response.status(400).send(error)
  }
})

const getKelurahan = asyncro.asyncHandler(async (request, response, next) => {
  const kecamatanId = request.params.kecamatanId
  const kelurahan = await db.any(
    'SELECT kelurahan_id, kelurahan_nama FROM mst.kelurahan WHERE kelurahan_kecamatan = $(kecamatanId) ',
    { kecamatanId }
  )
  try {
    response.json(kelurahan)
  } catch (error) {
    return response.status(400).send(error)
  }
})

router.get('/agama', getAgama)
router.get('/marital', getMarital)
router.get('/propinsi', getPropinsi)
router.get('/kota/:propinsiId', getKota)
router.get('/kecamatan/:kotaId', getKecamatan)
router.get('/kelurahan/:kecamatanId', getKelurahan)

module.exports = router
