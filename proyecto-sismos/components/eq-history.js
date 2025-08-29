const template = document.createElement('template')

template.innerHTML = `
    <style>
        :host {
        display: block; margin-top: 18px;
        background: var(--card); border: 1px solid var(--border);
        border-radius: 14px; padding: 14px;
        }
        .head {
        display: flex; align-items: center; justify-content: space-between; gap: 8px;
        margin-bottom: 8px;
        }
        .title { font-weight: 700; }
        .actions { display: flex; gap: 8px; }
        button, .btn {
        height: 34px; padding: 0 12px; border: 1px solid var(--border);
        background: var(--card); color: var(--text); border-radius: 10px; cursor: pointer;
        }
        .btn.primary { background: var(--brand); border-color: var(--brand); color: white; }
        .list { display: grid; gap: 10px; }
        .item {
        border: 1px solid var(--border); border-radius: 12px; padding: 12px;
        display: grid; gap: 8px; background: #141820;
        }
        .row { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
        .muted { color: var(--muted); font-size: 13px; }
        .chip {
        background: var(--chip); color: var(--chip-muted);
        padding: 6px 10px; font-size: 12px; border-radius: 999px; border: 1px solid var(--border);
        }
        .typechips { display: flex; gap: 6px; flex-wrap: wrap; }
        .empty {
        padding: 12px; border-radius: 12px; background: #1a1f2a; border: 1px solid var(--border);
        color: var(--muted);
        }
        .item-actions { display: flex; gap: 8px; }
    </style>

    <div class="head">
        <div class="title">Historial de búsquedas</div>
        <div class="actions">
        <button id="btnClear">Limpiar historial</button>
        </div>
    </div>

    <div id="container"></div>

`;


const STORAGE_KEY = 'eq_history_local_v1'
const MAX_ITEMS = 30

function loadHistory() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
    } catch {
        return [];
    }
}

function saveHistory(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

function fmtDateShort(iso) {
    return iso;
}

function round2(n) {
    return Math.round(n * 100) / 100;
}

export class EqHistory extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'}).appendChild(template.content.cloneNode(true))
        this._container = this.shadowRoot.querySelector('#container')
        this._btnClear = this.shadowRoot.querySelector('#btnClear')
        this._onCompleted = this._onCompleted.bind(this)
    }

    connectedCallback() {
        
        this._btnClear.addEventListener('click', () => this.clearAll())
        window.addEventListener('eq:search:completed', this._onCompleted)
        this.render()
    }

    disconnectedCallback() {
        window.removeEventListener('eq:search:completed', this._onCompleted)
    }

    _onCompleted(e) {
        console.log(`On Complete ${e}`);
        const {start, end, stats } = e.detail ?? {};
        if(!start || !end || !stats) { return; }

        const items = loadHistory()//[]

        const key = `${start}__${end}`
        const without = items.filter( e =>  `${e.start}__${e.end}` !== key) //Todos los items que no tiene ese Key

        const entry = {
            id: crypto.randomUUID(),
            start, end,
            when: new Date().toISOString(),
            stats
        }

        const newItems = [entry, ...without].slice(0, MAX_ITEMS)
        saveHistory(newItems)
        this.render()
    }

    clearAll() {
        saveHistory([])
        this.render()
    }

    removeOne(id) {
        const items = loadHistory().filter(e => e.id !== id)
        saveHistory(items)
        this.render()
    }

    repeatSearch(start, end) {
        //window.dispatchEvent(new CustomEvent('', {}))
        window.dispatchEvent(new CustomEvent('eq:history:select', { detail: { start, end}}))
    }

    render() {

        const items = loadHistory()

        if(!items.length) {
            this._container.innerHTML = `<div class="empty">Sin búsquedas guardadas aún. Realiza una búsqueda para empezar.</div>`
            return
        }

        const list = document.createElement('div')
        list.className = 'list'
        items.forEach(item => {
            const root = document.createElement('div')
            root.className = 'item'

            const top = document.createElement('div')
            top.className = 'row'
            top.innerHTML = `
                <div><strong>${fmtDateShort(item.start)}</strong> &rarr; <strong>${fmtDateShort(item.end)}</strong></div>
                <div class="muted">Guardado: ${new Date(item.when).toLocaleString()}</div>
            `

            const chips = document.createElement('div')
            chips.className = 'row'
            chips.innerHTML = `
                <span class="chip">Total: ${item.stats.total} </span>
                <span class="chip">M max: ${item.start.maxMag ?? "N/D"} </span>
                <span class="chip">M prom: ${item.start.avgMag ?? "N/D"} </span>
            `
            const typeRow = document.createElement('div')
            typeRow.className = 'typechips'
            Object.entries(item.stats.types ?? {}).forEach(([t,c]) => {
                const span = document.createElement('span')
                span.className = 'chip'
                span.textContent = `${t}: ${c}`
                typeRow.appendChild(span)
            })

            const actions = document.createElement('div')
            actions.className = 'item-actions'

            const btnRepeat = document.createElement('button')
            btnRepeat.className = 'btn primary'
            btnRepeat.textContent = 'Repetir Busqueda'
            btnRepeat.addEventListener('click', () => this.repeatSearch(item.start, item.end))

            const btnDel = document.createElement('button')
            btnDel.className = 'btn'
            btnDel.textContent = 'Eliminar'
            btnDel.addEventListener('click', () => this.removeOne(item.id))

            actions.append(btnRepeat, btnDel)

            root.append(top, chips, typeRow, actions)
            list.appendChild(root)

        });

        this._container.innerHTML = ""
        this._container.appendChild(list)
    }
}
customElements.define('eq-history', EqHistory)
