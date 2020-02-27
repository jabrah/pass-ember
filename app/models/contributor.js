import Model, { attr, belongsTo } from '@ember-data/model';

export default Model.extend({
  firstName: attr('string'),
  middleName: attr('string'),
  lastName: attr('string'),
  displayName: attr('string'),
  email: attr('string'),
  orcidId: attr('string'),
  affiliation: attr('set'),
  roles: attr('set'),
  publication: belongsTo('publication'),
  user: belongsTo('user'),
});
