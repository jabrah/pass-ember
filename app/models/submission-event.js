import Model, { attr, belongsTo } from '@ember-data/model';

export default Model.extend({
  eventType: attr('string'),
  performedDate: attr('date'),
  performerRole: attr('string'),
  comment: attr('string'),
  link: attr('string'),
  submission: belongsTo('submission'),
  performedBy: belongsTo('user'),
});
