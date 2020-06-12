class WebSocketClient {
    constructor(url) {
        this.url = url;

        this.init();
    }

    get autoReconnectInterval() {
        this._autoReconnectInterval || 5 * 1000; // ms
    }

    get url() {
        return this._url;
    }

    set url(u) {
        this._url = u;
    }

    set onmessage(f) {
        this.instance.onmessage = f;
    }

    init() {
        this.instance = new WebSocket(this.url);
        this.instance.onclose = this.onclose;
        this.instance.onopen = this.onopen;
        this.instance.onerror = this.onerror;
        this.instance.onmessage = this.onmessage;
        // this.instance.send = this.send;
    }

    onclose(e) {
        switch (e.code) {
            case 1000: // close normal
                console.log('WebSocket closed.');
                break;
            default: // abnormal closure
                this.reconnect;
                break;
        }
    }

    onerror(e) {
        switch (e.code) {
            case 'ECONNREFUSED':
                this.reconnect(e);
                break;
            default:
                console.log("WebSocketClient: error", e);
                break;
        }
    }

    onmessage() {
        console.log('default onmessage handler');
    }

    onopen(e) {
        console.log("WebSocketClient: open", e);
    }

    reconnect(e) {
        console.log(`WebSocketClient: retry in ${this.autoReconnectInterval}ms`, e);
        this.instance.removeAllListeners();
        setTimeout(() => {
            console.log("WebSocketClient: reconnecting...");
            this.init();
        }, this.autoReconnectInterval);
    }

    send(data) {
        this.instance.send(data);
    }
}

export default WebSocketClient;
