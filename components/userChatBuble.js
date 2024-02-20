class UserChatBubble extends HTMLElement {
    constructor() {
        super();
        this.text = '';
        this.time = '';
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="you-messsageContainer">
                <div class="you-message message">
                    ${this.text}
                </div>
                <div class="you-messageCorner"></div>
            </div>
      `;
    }

    static get observedAttributes() {
        return ['text', 'time'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'text') {
            this.text = newValue;
        } else if (name === 'time') {
            this.time = newValue;
        }
    }
}

customElements.define('user-chat-bubble', UserChatBubble);