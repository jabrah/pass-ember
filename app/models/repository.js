import Model, { attr } from '@ember-data/model';
import { computed } from '@ember/object';

export default Model.extend({
  name: attr('string'),
  description: attr('string'),
  url: attr('string'),
  formSchema: attr('string'),
  integrationType: attr('string'),
  agreementText: attr('string', {
    defaultValue: false
  }),
  repositoryKey: attr('string'),

  _selected: attr('boolean'),
  _isWebLink: computed('integrationType', function () {
    return this.get('integrationType') === 'web-link';
  })
});
