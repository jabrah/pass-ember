import WorkflowComponent from './workflow-component';
import { Promise, } from 'rsvp';
import { inject as service } from '@ember/service';

export default WorkflowComponent.extend({
  store: service('store'),
  init() {
    this._super(...arguments);
    if (this.get('model.preLoadedGrant')) this.send('addGrant', this.get('model.preLoadedGrant'));
  },
  actions: {
    next() {
      this.sendAction('next');
    },
    back() {
      this.sendAction('back');
    },
    addGrant(grant, event) {
      if (grant) {
        const submission = this.get('model.newSubmission');
        submission.get('grants').pushObject(grant);
        this.set('maxStep', 2);
        submission.set('metadata', '[]');
      } else if (event && event.target.value) {
        this.get('store').findRecord('grant', event.target.value).then((g) => {
          g.get('primaryFunder.policy'); // Make sure policy is loaded in memory
          const submission = this.get('model.newSubmission');
          submission.get('grants').pushObject(g);
          this.set('maxStep', 2);
          submission.set('metadata', '[]');
          Ember.$('select')[0].selectedIndex = 0;
        });
      }
    },
    removeGrant(grant) {
      // if grant is grant passed in from grant detail page remove query parms
      if (grant === this.get('model.preLoadedGrant')) {
        this.set('model.preLoadedGrant', null);
      }
      const submission = this.get('model.newSubmission');
      submission.get('grants').removeObject(grant);

      // undo progress, make user redo metadata step.
      this.set('maxStep', 2);
      submission.set('metadata', '[]');
    },
  },
});
