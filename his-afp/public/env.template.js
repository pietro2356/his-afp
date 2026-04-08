(function (window) {
  window['env'] = window['env'] || {};
  // Questo segnaposto verrà sostituito all'avvio del container
  window['env']['type'] = '${APP_ENV}';
  window['env']['ver'] = '${APP_VER}';
})(this);
