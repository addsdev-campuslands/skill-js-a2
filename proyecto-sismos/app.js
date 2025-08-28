import { parseEvent, isSignificant, fmt, TypeDict } from "./helpers.js";
import { dataFromRequest } from './earthquakes.js'

// Refs UI
const selRange = document.querySelector('#rangeSelect')
const customRow = document.querySelector('#customRow')
const startInput = document.querySelector('#startDate')
const endInput = document.querySelector('#endDate')
const btntSearch = document.querySelector('#btnSearch')

const statsEl = document.querySelector('#stats')
const cardsEl = document.querySelector('#grid')
const pagerEl = document.querySelector('#pager')
const prevBtn = document.querySelector('#prevBtn')
const nextBtn = document.querySelector('#nextBtn')
const pageInfo = document.querySelector('#pageInfo')
const messages = document.querySelector('#messages')

// Estados
const state = {
    events: [],
    pageSize: 10,
    page: 1
}

function formatDate(d) {
    // YYYY-MM-DD 2025-08-27
    const y = d.getFullYear();//2025
    const m = String(d.getMonth() + 1).padStart(2, "0")
    const dd = String(d.getDate()).padStart(2, "0")
    return `${y}-${m}-${dd}`;
}

function daysAgo(n) {
    const now = new Date();
    now.setDate(now.getDate() - n)
    return now
}

function computeRangeSelect() {
    const v = selRange.value;
    if(v === "last7") {
        return {start: formatDate(daysAgo(7)), end: formatDate(new Date())}
    }
    if(v === "last30") {
        return {start: formatDate(daysAgo(30)), end: formatDate(new Date())}
    }
    if(v === "last1") {
        return {start: formatDate(daysAgo(1)), end: formatDate(new Date())}
    }
    //custom
    return {start: startInput.value, end: endInput.value}
}

// Render UI
function setLoading(on) {
    const root = document.body;
    root.classList.toggle("loading", Boolean(on))
    btntSearch.disabled = Boolean(on)
}


function showMessage(type, text) {
    messages.innerHTML = "";
    if(!text) return;
    const div = document.createElement('div')
    div.className = type === "error" ? "error" : "empty"
    div.textContent = text
    messages.appendChild(div)
}

function renderStats(evts) {
    statsEl.innerHTML = ""
    if(!evts.length) return

    //Mag, types total
    const total = document.createElement("span")
    total.className = "chip"
    total.textContent = `Total: ${evts.length}`
    statsEl.appendChild(total)

    //Tipos
    TypeDict.clear()
    state.events.forEach(e => TypeDict.add(e.type));

    TypeDict.entries().forEach(([type, count]) => {
        const chip = document.createElement("span")
        chip.className = "chip"
        chip.textContent = `${type} ${count}`
        statsEl.appendChild(chip)
    })
}

function renderCards() {
    cardsEl.innerHTML = ""
    showMessage()
    if(!state.events.length) {
        showMessage("empty", "No se encontraron eventos para el rango seleccionado")
        pageInfo.textContent = "Pagina 0 / 0"
        prevBtn.disabled = false
        nextBtn.disabled = false
        return
    }

    const totalPages = Math.max(1 , Math.ceil(state.events.length / state.pageSize))
    state.page = Math.min(Math.max(1, state.page), totalPages)

    const startIndex = (state.page - 1) * state.pageSize
    const endIndex = startIndex + state.pageSize

    const pageItems = state.events.slice(startIndex, endIndex)

    // Recorrer
    pageItems.forEach(e => {
        const card = document.createElement("article")
        card.className = "card"

        const mag = document.createElement("span")
        mag.className = "mag"
        mag.textContent = `M ${e.mag}`

        const place = document.createElement("div")
        place.className = "place"
        place.textContent = e.place

        const meta = document.createElement("div")
        meta.className = "meta"
        meta.textContent = `Fecha (UTC): ${fmt.date(e.time)} · Tipo: ${e.type}${e.tsunami ? " · 🌊 Tsunami" : ""}`

        const coords = document.createElement("div");
        coords.className = "coords";
        coords.textContent = `Coords: ${fmt.coord(e.coords)}`;

        card.append(mag, place, meta, coords)
        cardsEl.appendChild(card)
    })
    // Mostrar
    renderPager(totalPages)
}

function renderPager(totalPages) {
    pageInfo.textContent = `Pagina ${state.page} / ${totalPages}`
    prevBtn.disabled = state.page <= 1;
    nextBtn.disabled = state.page >= totalPages;
}

// Eventos
selRange.addEventListener("change", () => {
    const custom = selRange.value === "custom";
    customRow.style.display = custom ? "grid" : "none"
})

prevBtn.addEventListener("click", () => {
    state.page -= 1
    renderCards()
})

nextBtn.addEventListener("click", () => {
    state.page += 1
    renderCards()
})


btntSearch.addEventListener('click', async () => {
    const {start, end} = computeRangeSelect()
    if(!start || !end) {
        showMessage("error", "Debe seleccionar 'Desde' y 'Hasta' en modo personalizado")
        return
    }
    if(new Date(start) > new Date(end)) {
        showMessage("error", "La fecha 'Desde' no puede ser mayor que 'Hasta'")
        return
    }
    await loadAndRender({start, end})
})


async function loadAndRender({start, end}) {
    setLoading(true)
    showMessage()
    try {
        const geo = await dataFromRequest({start, end})
        const features = Array.isArray(geo.features) ? geo.features : []
        const events = features.map(parseEvent)
        //ordenar
        state.events = events
        state.page = 1

        renderStats(events)
        renderCards()
    }catch(err) {
        console.error(err)
        showMessage("error", "Ocurrio algo, lo mas probables es el error este entre la pantalla y la silla")
        state.events = []
        renderCards()
    } finally {
        setLoading(false)
    }
}

(function initDefaults() {
    //Perfil fechas ultimos 7 dias
    const endDate = new Date()
    const startDate = daysAgo(7)
    startInput.value = formatDate(startDate)
    endInput.value = formatDate(endDate)
})();

(async function initialData() {
    const {start, end } = computeRangeSelect()
    await loadAndRender({start, end})
})();
