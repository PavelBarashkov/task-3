import rand from 'csprng';
import crypto from "crypto";

export class HMAC {
    key;
    move;
    constructor(move) {
        this.move = move;
        this.key = this.keyGenerate();
    }

    keyGenerate() {
        return rand(256,16);
    }
    generateHMAC() {
        return crypto.createHmac('sha256', this.key).update(this.move).digest('hex');
    }
}