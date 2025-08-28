export const parseEvent = (f) => ({ //Funcion flecha
    id: f.id,
    mag: f.properties.mag ?? null,
    place: f.properties.place ?? "N/D",
    time: new Date(f.properties.time), // epoch -> Date
    tsunami: Boolean(f.properties.tsunami),
    type: f.properties.type,
    coords: {
        type: f.geometry.type,
        lon: f.geometry.coordinates[0],
        lat: f.geometry.coordinates[1],
        depth: f.geometry.coordinates[2],

    }
})

export function isSignificant(earthquake, minMag = 6) {
    return typeof earthquake.mag == "number" && earthquake.mag >= minMag;
}

export const fmt = {
    //Funcion anonima asignada a una propiedad
    date: function (d) {return d.toISOString().slice(0, 19).replace("T", " ")},
    coord: (c) => `${c.lat.toFixed(3)},${c.lon.toFixed(3)} (z=${c.depth.toFixed(2)}km)`
}

//Tabla de categorias por tipo
export const TypeDict = (() => {
    const dict = new Map();
    return {
        add : (type) => dict.set(type, (dict.get(type) ?? 0) + 1),
        entries: () => [...dict.entries()],
        //Vamos a agregar un clear
        clear: () => dict.clear(),
    }
})();
