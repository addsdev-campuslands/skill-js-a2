class CounterComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <style>
                .contador {
                    font-size: 2rem;
                    color: green;
                }
                button {
                    margin: 5px;
                }
            </style>
            <div>
                <p class="contador">Contador: <span id="valor">0</span></p>
                <button id="btnInc">Aumentar</button>
                <button id="btnDec">Restar</button>
            </div>
        `
        this.contador = 0;
    }

    connectedCallback() {
        this.shadowRoot.querySelector("#btnInc").addEventListener('click', () => {
            this.contador++;
            this.actualizar();
        })

        this.shadowRoot.querySelector("#btnDec").addEventListener('click', () => {
            this.contador--;
            this.actualizar();
        })
    }

    actualizar() {
        this.shadowRoot.querySelector("#valor").textContent = this.contador;
    }
}

customElements.define('counter-custom',CounterComponent);