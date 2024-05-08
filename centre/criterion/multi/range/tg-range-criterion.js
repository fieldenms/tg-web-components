import { Polymer } from '@fieldenms/tg-polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@fieldenms/tg-polymer/polymer/lib/utils/html-tag.js';

import '../../tg-abstract-criterion.js';
import { TgAbstractRangeCriterionBehavior } from './tg-abstract-range-criterion-behavior.js';
import '@fieldenms/tg-polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@fieldenms/tg-polymer/paper-styles/color.js';

const template = html`
    <style>
        .exclusive-mnemonic {
            background-color: var(--paper-blue-200);
            opacity: 0.5;
            pointer-events: none;
            margin-bottom: 8px;
            margin-top: 28px;
        }
    </style>
    <style include="iron-flex iron-flex-reverse iron-flex-alignment iron-flex-factors iron-positioning"></style>
    <tg-abstract-criterion id="dom"
        mnemonics-visible="[mnemonicsVisible]]"
        exclude-missing="[[excludeMissing]]"
        _cancel-meta-values="[[_cancelMetaValuesForBinding]]"
        _accept-meta-values="[[_acceptMetaValuesForBinding]]"
        _show-meta-values-editor="[[_showMetaValuesEditor]]"
        _compute-icon-button-style="[[_computeIconButtonStyleForBinding]]"
        _or-null="{{_orNull}}"
        _not="{{_not}}"
        _exclusive="{{_exclusive}}"
        _exclusive2="{{_exclusive2}}">
        <div slot="criterion-editors" class="layout horizontal flex relative criterion-editors" style="margin-right:20px;">
            <slot name="range-criterion-editor-1"></slot>
            <div class="fit mnemonic-layer exclusive-mnemonic" hidden$="[[!_exclusive]]"></div>
        </div>
        <div slot="criterion-editors" class="layout horizontal flex relative criterion-editors">
            <slot name="range-criterion-editor-2"></slot>
            <div class="fit mnemonic-layer exclusive-mnemonic" hidden$="[[!_exclusive2]]"></div>
        </div>
    </tg-abstract-criterion>
`;

Polymer({
    _template: template,

    is: 'tg-range-criterion',

    observers: [
        '_updateIconButtonStyle(orNull, not, orGroup, exclusive, exclusive2)'
    ],

    behaviors: [ TgAbstractRangeCriterionBehavior ],

    _dom: function () {
        return this.$.dom;
    }
});