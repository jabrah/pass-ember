import Model, { attr, belongsTo } from '@ember-data/model';

export default Model.extend({
  name: attr('string'),
  description: attr('string'),
  /** Possible values: manuscript, supplemental, table, figure */
  fileRole: attr('string'),
  uri: attr('string'),
  mimeType: attr('string'),
  submission: belongsTo('submission'),

  // not represented on backend
  _file: attr(),
});
