import { Polymer } from '@fieldenms/tg-polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@fieldenms/tg-polymer/polymer/lib/utils/html-tag.js';

import { TgSerialiser } from '../serialisation/tg-serialiser.js';
import '../components/tg-toast.js';

const template = html`
    <tg-toast id="toastGreeting"></tg-toast>
`;
Polymer({
    _template: template,

    is: 'tg-entity-binder',

    created: function () {
        this.__serialiser = new TgSerialiser();
    },

    /**
     * The component for entity serialisation.
     */
    _serialiser: function () {
        return this.__serialiser;
    },

    /**
     * The reflector component.
     */
    _reflector: function () {
        return this._serialiser().reflector();
    },

    /**
     * The toast component.
     */
    _toastGreeting: function () {
        return this.$.toastGreeting;
    }
});