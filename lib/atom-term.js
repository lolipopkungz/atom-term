'use babel';

import AtomTermView from './atom-term-view';
import { CompositeDisposable } from 'atom';

export default {

  atomTermView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomTermView = new AtomTermView(state.atomTermViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomTermView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-term:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomTermView.destroy();
  },

  serialize() {
    return {
      atomTermViewState: this.atomTermView.serialize()
    };
  },

  toggle() {
    console.log('AtomTerm was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
