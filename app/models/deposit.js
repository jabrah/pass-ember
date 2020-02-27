import Model, { attr, belongsTo } from '@ember-data/model';

export default Model.extend({
  depositStatusRef: attr('string'),
  depositStatus: attr('string'),
  repositoryCopy: belongsTo('repository-copy'),
  submission: belongsTo('submission'),
  repository: belongsTo('repository'),
});
