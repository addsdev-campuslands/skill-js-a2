class ErrorComponent extends HTMLElement {

    constructor() {
        super();
        //Crear el DOM de Error Component
        this.attachShadow({mode: 'open'})
        console.log('CONSTRUTOR');
        this.shadowRoot.innerHTML = `
        <style> 
            p { color: red; }
        </style>
        <p> Hola camper desde el Constructor</p>
        `;
    }

    connectedCallback() {
        console.log('CONNECTED');
        this.shadowRoot.querySelector('p').textContent += `(Hola camper desde Web Component)`;
    }
}
customElements.define('error-component', ErrorComponent);
