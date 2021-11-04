<template>
  <div>
    <div id="he-plugin-standard" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue';

export default defineComponent({
  setup() {
    onMounted(() => {
      // @ts-ignore
      window.WIDGET = {
        CONFIG: {
          layout: '2',
          width: 178,
          height: 248,
          background: '1',
          dataColor: 'FFFFFF',
          city: 'CN101030500',
          key: '8ae1897fbd0349bf99782d3f1ef447aa',
        },
      };
      (function (d) {
        const c = d.createElement('link');
        c.rel = 'stylesheet';
        c.href = 'https://widget.heweather.net/standard/static/css/he-standard.css?v=1.4.0';
        const s = d.createElement('script');
        s.src = 'https://widget.heweather.net/standard/static/js/he-standard.js?v=1.4.0';
        const sn = d.getElementsByTagName('script')[0];
        sn.parentNode!.insertBefore(c, sn);
        sn.parentNode!.insertBefore(s, sn);
      })(document);
    });

    onBeforeUnmount(() => {
      const scripts = document.getElementsByTagName('script');
      for (let i = 0; i < scripts.length; i++) {
        if (scripts[i] && scripts[i].src && scripts[i].src.indexOf('https://widget.heweather.net/standard/static/js/he-standard.js?v=1.4.0') !== -1) {
              scripts[i].parentNode!.removeChild(scripts[i]);
        }
      }
      const links = document.getElementsByTagName('link');
      for (let i = 0; i < links.length; i++) {
        if (links[i] && links[i].href && links[i].href.indexOf('https://widget.heweather.net/standard/static/css/he-standard.css?v=1.4.0') !== -1) {
              links[i].parentNode!.removeChild(links[i]);
        }
      }
      const stylesheets = document.getElementsByTagName('style');
      for (let i = 0; i < stylesheets.length; i++) {
        if (stylesheets[i] && stylesheets[i].className && stylesheets[i].className.indexOf('AMap.style') !== -1) {
              stylesheets[i].parentNode!.removeChild(stylesheets[i]);
        }
        if (stylesheets[i] && stylesheets[i].innerHTML && stylesheets[i].innerHTML.indexOf('.amap-logo') !== -1) {
              stylesheets[i].parentNode!.removeChild(stylesheets[i]);
        }
      }
    });
  },
});
</script>
