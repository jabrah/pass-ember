import Model, { attr, belongsTo } from '@ember-data/model';
import { computed } from '@ember/object';

export default Model.extend({
  /**
   * Name of the journal (REQUIRED)
   */
  journalName: attr('string'),
  nlmta: attr('string'),
  pmcParticipation: attr('string'),
  issns: attr('set'),
  publisher: belongsTo('publisher'),

  isMethodA: computed('pmcParticipation', function () {
    return this.get('pmcParticipation') ? this.get('pmcParticipation').toLowerCase() === 'a' : false;
  }),
  isMethodB: computed('pmcParticipation', function () {
    return this.get('pmcParticipation') ? this.get('pmcParticipation').toLowerCase() === 'b' : false;
  })
});
