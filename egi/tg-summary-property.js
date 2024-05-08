import '@fieldenms/tg-polymer/polymer/polymer-legacy.js';

import {Polymer} from '@fieldenms/tg-polymer/polymer/lib/legacy/polymer-fn.js';

Polymer({
    is: "tg-summary-property",

    properties: {
        property: String,
        type: String,
        columnTitle: String,
        columnDesc: String
    }
});