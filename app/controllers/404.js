import Controller from '@ember/controller';
import BrandingMixin from 'pass-ember/mixins/branding-mixin';

export default Controller.extend(BrandingMixin, {
  icon: Ember.computed('model.config', function () {
    return `${this.get('assetsUri')}img/error-icon.png`;
  }),
  contactUrl: Ember.computed('model.config', function () {
    return `${this.get('assetsUri')}contact.html`;
  })
});
