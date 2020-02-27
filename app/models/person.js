import Model, { attr } from '@ember-data/model';

export default Model.extend({
  /** (REQUIRED) */
  displayName: attr('string'),
  /** (REQUIRED) */
  email: attr('string'),
  orcid: attr('string'),
  // ---- Uncomment as needed in UI----
  firstName: attr('string'),
  middleName: attr('string'),
  lastName: attr('string'),
  institutionalId: attr('string'),
  affiliation: attr('string')
});
