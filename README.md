# G2-for-Vue

> G2 Charts for Vue.js.

Built upon [G2](https://antv.alipay.com/zh-cn/g2/3.x/api/index.html) `v3.2.7`+ and depends on [Vue.js](https://vuejs.org/) `v2.5.17`+.

## Install

### Manual
download `lib/G2VChart.js` and include it in your HTML file

```html
<script src="path/to/g2-for-vue/lib/index.js"></script>
```

The component is exposed as `window.G2VChart`.
```js
// register component to use
Vue.component('g2-vchart', G2VChart)
```

### Use npm（Recommended)

```bash
npm install g2-for-vue
```
## Register Component
```js
import Vue from 'vue'
import G2VChart from 'g2-for-vue/components/G2VChart'

// register component to use
Vue.component('g2-vchart', G2VChart)
```
## Using the Component

```vue
<template>
  <div class='bar-chart'>
    <G2VChart
      ref="bar"
      :height="chartHeight"
      :plotCfg="barPlotCfg"
      :chartData="barData"
      :createChart="createBarChart"
      :addGuide="addBarGuide"
    />
    <div class='btn' @click="refresh">refresh</div>
  </div>
</template>
<script>
import G2VChart from 'g2-for-vue'
// or import G2VChart from 'g2-for-vue/components/G2VChart'

export default {
  components: {
    G2VChart
  },
  data () {
    return {
      chartHeight: 220,
      selectedMonth: '9月',
      barData: [
        {month: '4月', value: 10},
        {month: '5月', value: 310},
        {month: '6月', value: 450},
        {month: '7月', value: 60},
        {month: '8月', value: 110},
        {month: '9月', value: 100}
      ],
      barPlotCfg: {},
      typeMap: {
        OUT: '支出',
        IN: '收入'
      }
    }
  },
  methods: {
   createBarChart(chart) {
    const self = this;
    chart.interval().position('month*value').size(20).color('month', month => {
      if (month === self.selectedMonth) {
        return '#108ee9';
      }
      return '#108ee969';
    });
    chart.legend(false);
    chart.tooltip(false);
    return chart;
  },

  addBarGuide(chart, barData) {
    if (!chart || !barData) { return; }
    // 辅助文本
    let diffVal = 0;
    barData.map(item => {
      chart.guide().text({
        position: item,
        content: item.value,
        offsetX: -9,
        offsetY: -8
      });
    });
  },
    refresh () {
      this.barData = [
        {month: '4月', value: Math.floor(Math.random() * 100) + 30},
        {month: '5月', value: Math.floor(Math.random() * 100) + 110},
        {month: '6月', value: Math.floor(Math.random() * 100) + 450},
        {month: '7月', value: Math.floor(Math.random() * 100) + 340},
        {month: '8月', value: Math.floor(Math.random() * 100) + 210},
        {month: '9月', value: Math.floor(Math.random() * 100) + 680}
      ]
    }
  }
}
</script>
<style>
.bar-chart {
  width: 100%;
  height: 100%;
  min-width: 200px;
}
</style>
```

See more examples [here](https://github.com/Me-Momo/g2-for-vue/tree/master/demo/charts)

### Props

- `height`
- `width`
- `plotCfg`
- `chartData`
- `createChart`
- `addGuide`

### Computed

TODO

### Methods

TODO

### Static Methods

TODO

### Events

TODO


## Local development

```
npm i
npm run demo
```
浏览器打开`http://localhost:8080/demo.html`


## Plan

- [ ] 分包引入G2,目前会将整个G2引入,打包后的common.js大小为1542.79 kb,压缩后的大小为327.42 kb
  - [ ] use G2 as `exterval`！
```js
import G2 from '@antv/g2/src/core.js'

// import G2 modules manually to reduce bundle size,such as Geoms,Facets, Interaction
// geoms
require('./geom/area');
require('./geom/edge');
require('./geom/heatmap');
require('./geom/interval');
require('./geom/line');
require('./geom/path');
require('./geom/point');
require('./geom/polygon');
require('./geom/schema');
require('./geom/venn');

// facets
require('./facet/index');

// interaction
require('./interaction/index');
```
- [ ] use `resize-detector`
- [ ] add more examples
- [ ] `run lint` before `git push`


Version|File|Size|Gzipped
0.3.0 | dist/G2VChart.umd.min.js | 634.35 kb  | 176.48 kb
0.3.0 | dist/G2VChart.umd.js     | 1536.26 kb | 326.48 kb


=== Tarball Details ===
version:       0.3.0
package size:  854.3 kB
unpacked size: 3.9 MB
total files:   22