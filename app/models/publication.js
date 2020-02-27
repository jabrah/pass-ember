import Model, { attr, belongsTo } from '@ember-data/model';

export default Model.extend({
  // doi, title, abstract, journal, volume, issue
  doi: attr('string'),
  title: attr('string'),
  abstract: attr('string'),
  volume: attr('string'),
  issue: attr('string'),
  pmid: attr('string'),

  journal: belongsTo('journal', { autoSave: true }),
  // submissions: DS.hasMany('submission', { async: true })
});
