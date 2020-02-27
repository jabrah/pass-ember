import Model, { attr, belongsTo } from '@ember-data/model';

export default Model.extend({
  name: attr('string'),
  url: attr('string'),
  localKey: attr('string'),

  policy: belongsTo('policy'),
});
