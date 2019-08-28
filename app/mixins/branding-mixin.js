import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';

export default Mixin.create({
  staticConfig: service('app-static-config'),

  assetsUri: Ember.computed(function () {
    debugger
    return this.get('staticConfig').getAssetsUrl();
  }),
  branding() {
    return this.get('staticConfig').getBranding();
  },
  // assetsUri: null,
  // branding: null,

  async init() {
    this._super(...arguments);

    // console.log('moo2');
    // const config = this.get('staticConfig');
    // // debugger
    // this.set('assetsUri', config.getAssetsUrl());
    // this.set('branding', config.getBranding());
  }
});
