import { Polymer } from '@fieldenms/tg-polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@fieldenms/tg-polymer/polymer/lib/utils/html-tag.js';
import '@fieldenms/tg-polymer/paper-styles/paper-styles-classes.js';
import { IronA11yKeysBehavior } from '@fieldenms/tg-polymer/iron-a11y-keys-behavior/iron-a11y-keys-behavior.js';
import './tg-entity-master.js';
import { TgEntityMasterBehavior } from './tg-entity-master-behavior.js';
import './tg-entity-master-styles.js';
import { TgShortcutProcessingBehavior } from '../actions/tg-shortcut-processing-behavior.js';
import { getKeyEventTarget, generateUUID } from '../reflection/tg-polymer-utils.js';
import '@fieldenms/tg-polymer/iron-flex-layout/iron-flex-layout-classes.js';
import { TgReflector } from '/app/tg-reflector.js';
import { TgViewWithHelpBehavior } from '../components/tg-view-with-help-behavior.js';

const TgEntityMasterTemplateBehaviorImpl = {

    ready: function () {
        const self = this;
        self.isMasterTemplate = true;
        self._registrationListener = self._registrationListener.bind(self);
        self.classList.add("canLeave");

        // the value for property uuid needs to be assign only if this has not been done yet
        if (self.uuid === undefined) {
            self.uuid = self.is + '/' + generateUUID();
        }

        self._currentEntityForHelp = function() {
            return () => self._currEntity;
        };
        
        self._preOpenHelpMasterAction = function (action) {
            const reflector = new TgReflector();
            if (action.requireSelectedEntities === 'ONE') {
                action.shortDesc = reflector.getType(action.currentEntity().type().notEnhancedFullClassName()).entityTitle() + " Master Help";
            } else if (action.requireSelectedEntities === 'ALL' && self.$.egi.getSelectedEntities().length > 0) {
                action.shortDesc = reflector.getType(self.$.egi.getSelectedEntities()[0].type().notEnhancedFullClassName()).entityTitle() + " Master Help";
            }
        };
    },

    attached: function () {
        const self = this;
        if (self.prefDim) {
            self._masterDom().setAttribute('with-dimensions', 'true');
        } else {
            self._masterDom().removeAttribute('with-dimensions');
        }
    },

    /**
     * Should return the action that opens help master
     */
    getOpenHelpMasterAction: function () {
        return this.$.tgOpenHelpMasterAction;
    },

    /**
     * Adds 'with-dimensions' attribute to this tg-entity-master to make it suitable for resizing: action bar is placed on top of scrollable editor container.
     * Returns current dimensions with widthUnit = heightUnit = 'px'.
     */
    makeResizable: function () {
        const self = this;
        const prefDim = {
            width: self._masterDom().$.masterContainer.offsetWidth,
            height: self._masterDom().$.masterContainer.offsetHeight,
            widthUnit: 'px',
            heightUnit: 'px'
        };
        this._masterDom().setAttribute('with-dimensions', 'true');
        return prefDim;
    },

    addOwnKeyBindings: function () {
        const keyBindings = this._ownKeyBindings;
        if (this.$.loader) {
            if (this.$.loader.wasLoaded) {
                if (typeof this.$.loader.loadedElement.addOwnKeyBindings === 'function') {
                    this.$.loader.loadedElement.addOwnKeyBindings();
                    return;
                }
            } else {
                this.$.loader.addEventListener('after-load', this._registrationListener);
                return;
            }
        }
        for (let shortcuts in keyBindings) {
            this.addOwnKeyBinding(shortcuts, keyBindings[shortcuts]);
        }
    },

    removeOwnKeyBindings: function () {
        if (this.$.loader) {
            if (this.$.loader.wasLoaded) {
                if (typeof this.$.loader.loadedElement.removeOwnKeyBindings === 'function') {
                    this.$.loader.loadedElement.removeOwnKeyBindings();
                    return;
                }
            } else {
                return;
            }
        }
        IronA11yKeysBehavior.removeOwnKeyBindings.call(this);
    },

    confirm: function (message, buttons) {
        return this._masterDom().confirm(message, buttons);
    },

    _shouldOverridePrefDim: function () {
        let parent = this.parentElement || this.getRootNode().host;
        while (parent && (parent.tagName !== 'TG-CUSTOM-ACTION-DIALOG' && parent.tagName !== 'TG-MENU-ITEM-VIEW')) {
            if (parent.isMasterTemplate && parent.prefDim) {
                return false;
            }
            parent = parent.parentElement || parent.getRootNode().host;
        }
        return true;
    },

    _registrationListener: function (e) {
        const target = e.target || e.srcElement;

        if (target === this.$.loader) {
            if (e.detail && typeof e.detail.addOwnKeyBindings === 'function') {
                e.detail.addOwnKeyBindings();
            }

            this.$.loader.removeEventListener('after-load', this._registrationListener);
        }
    },

    /**
     * Returns the key event target it might be a dialog or this element if the master is not in dialog.
     * Also it configures key bindings if the master is not a part of compound master.
     */
    _getKeyEventTarget: function () {
        let automaticAddKeyBindings = true;
        const keyEventTarget = getKeyEventTarget(this, this, (nextParent) => {
            if (nextParent.tagName === 'TG-MASTER-MENU-ITEM-SECTION') {
                automaticAddKeyBindings = false;
            }
        });
        if (automaticAddKeyBindings) {
            this.addOwnKeyBindings();
        }
        return keyEventTarget;
    },

    _masterDom: function () {
        return this.$.masterDom;
    },

    /**
     * The core-ajax component for entity retrieval.
     */
    _ajaxRetriever: function () {
        return this._masterDom()._ajaxRetriever();
    },

    /**
     * The core-ajax component for entity saving.
     */
    _ajaxSaver: function () {
        return this._masterDom()._ajaxSaver();
    },

    /**
     * The validator component.
     */
    _validator: function () {
        return this._masterDom()._validator();
    },

    /**
     * The component for entity serialisation.
     */
    _serialiser: function () {
        return this._masterDom()._serialiser();
    },

    /**
     * The reflector component.
     */
    _reflector: function () {
        return this._masterDom()._reflector();
    },

    /**
     * The toast component.
     */
    _toastGreeting: function () {
        return this._masterDom()._toastGreeting();
    },

    _shortcutPressed: function (e) {
        this.processShortcut(e, ['tg-action', 'tg-ui-action']);
    }
};

export const TgEntityMasterTemplateBehavior = [
    IronA11yKeysBehavior,
    TgShortcutProcessingBehavior,
    TgEntityMasterBehavior,
    TgViewWithHelpBehavior,
    TgEntityMasterTemplateBehaviorImpl,
];
export { Polymer, html };