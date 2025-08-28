const HOST = "https://earthquake.usgs.gov"
const PATH = "/fdsnws/event/1/query"
//const END_POINT = "format=geojson&starttime=2020-01-01&endtime=2020-01-02"

function buildUrl({start, end, limit = 20000}) {
    const p = new URLSearchParams({
        format: "geojson",
        starttime: start,
        endtime: end,
        limit: limit
    });
    return `${HOST}${PATH}?${p.toString()}`
}

async function loadEarthQuakes(params) {
    const result = await fetch(buildUrl(params),{
        method: "GET"
    })
    if(!result.ok) throw new Error(`HTTP ${result.status}`)
    return await result.json()
}

//Validar los datos con manejo de errore muy basico con try....
export const dataFromRequest = async (params) => {
    try {
        return await loadEarthQuakes(params)
    } catch (error) {
        console.log(`Error al obtener datos: ${error}`);
        return {}
    }
}