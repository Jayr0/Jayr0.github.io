class PartnerChatBubble extends HTMLElement {
    constructor() {
        super();
        this.text = '';
        this.time = '';
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="girl-messsageContainer">
                <div class="girl-message message"">
                    ${this.text}
                    <span class="message-time-fill">${this.time}</span>
                    <span class="message-time">${this.time}</span>
                </div>
                <div class="messageCorner"></div>
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

customElements.define('partner-chat-bubble', PartnerChatBubble);