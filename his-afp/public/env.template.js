(function (window) {
  window['env'] = window['env'] || {};
  window['ver'] = window['ver'] || {};
  // Questo segnaposto verrà sostituito all'avvio del container
  window['env']['type'] = '${APP_ENV}';
  window['ver']['type'] = 'v1.0.5';
})(this);
