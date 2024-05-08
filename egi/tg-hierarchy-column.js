import {mixinBehaviors} from '@fieldenms/tg-polymer/polymer/lib/legacy/class.js';
import {PolymerElement} from '@fieldenms/tg-polymer/polymer/polymer-element.js';

import { TgPropertyColumnBehavior } from './tg-property-column-behavior.js';

export class TgHierarchyColumn extends mixinBehaviors([TgPropertyColumnBehavior], PolymerElement) {

    static get properties() {
        
        return {
            contentBuilder: Function,
        };
        
    }    
}

customElements.define('tg-hierarchy-column', TgHierarchyColumn);