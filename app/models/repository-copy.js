import Model, { attr, belongsTo } from '@ember-data/model';

export default Model.extend({
  externalIds: attr('set'),
  accessUrl: attr('string'),
  copyStatus: attr('string'),
  publication: belongsTo('publication'),
  repository: belongsTo('repository'),
});
