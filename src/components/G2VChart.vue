
<template>
  <div class="g2-vchart"/>
</template>
<style>
.g2-vchart {
  width: 100%;
  height: 100%;
}
</style>
<script>
import G2 from '@antv/g2'
import { addListener, removeListener } from 'resize-detector'
import debounce from 'debounce'
import EVENTS from './Events.js'

export default {
  props: {
    // will ignore the props of Width and Height;
    // using the boxSize of $el
    autoResize: {
      type: Boolean,
      default: false
    },
    plotCfg: {
      type: Object,
      default: () => {}
    },
    chartData: [Array, Object],
    createChart: Function,
    addGuide: {
      type: Function,
      default: () => {}
    }
  },

  data () {
    return {
      chart: null,
      defaultPlotCfg: {
        padding: 'auto'
      }
    }
  },

  watch: {
    width: (newVal, oldVal) => {
      return this.delegateMethod('changeWidth', newVal)
    },
    height: (newVal, oldVal) => {
      return this.delegateMethod('changeHeight', newVal)
    }
  },

  created () {
    this.chart = null
    // this.dataView = null
    const watched = ['chartData']
    watched.forEach(prop => {
      this.$watch(
        prop,
        () => {
          this.refresh()
        },
        { deep: true }
      )
    })
  },

  mounted () {
    this.init()
  },

  activated () {
    console.log('activated')
    if (this.autoResize) {
      this.resize()
    }
  },

  beforeDestory () {
    if (this.chart) {
      this.chart.destroy()
      this.chart = null
    }
  },

  methods: {
    getArea () {
      return this.$el.offsetWidth * this.$el.offsetHeight
    },
    getBox () {
      return { width: this.$el.offsetWidth, height: this.$el.offsetHeight }
    },
    resize() {
      const { width, height } = this.getBox()
      return this.delegateMethod('changeSize', width, height)
    },
    clear () {
      this.delegateMethod('clear')
    },
    repaint () {
      this.delegateMethod('repaint')
    },
    destroy () {
      if (this.autoResize) {
        removeListener(this.$el, this.__resizeHandler)
      }
      this.delegateMethod('destroy')
    },
    changeData(...args) {
      return this.delegateMethod('changeData', ...args)
    },
    changeVisible() {
      return this.delegateMethod('changeVisible')
    },
    getDataURL () {
      return this.delegateMethod('toDataURL')
    },
    downloadImage(name) {
      return this.delegateMethod('downloadImage', name)
    },
    /**
     * @param {String} name - action name
     */
    dispatchAction(name, ...args) {
      return this.delegateMethod(name, ...args)
    },
    delegateMethod (name, ...args) {
      if (!this.chart) {
        this.init()
      }
      return this.chart[name](...args)
    },
    delegateGet (name, method) {
      if (!this.chart) {
        this.init()
      }
      return this.chart[method]()
    },
    init () {
      const { width, height } = this.getBox()
      let chart = new G2.Chart({
        container: this.$el,
        height,
        width,
        ...Object.assign(this.defaultPlotCfg, this.plotCfg)
      })
      if (this.createChart) {
        chart = this.createChart(chart)
      } else {
        // TODO 默认创建
      }

      // autoResize Detector
      if (this.autoResize) {
        this.__resizeHandler = debounce(() => {
          // expose a resize event
          this.$emit('resize')
          this.resize()
        }, 200)
        addListener(this.$el, this.__resizeHandler)
      }

      chart.source(this.chartData)
      this.addGuide(chart, this.chartData)
      chart.render()

      // expose G2 Chart events as custom events
      EVENTS.forEach(event => {
        chart.on(event, evt => {
          this.$emit(event, evt)
        })
      })

      Object.defineProperties(this, {
        // Only recalculated when accessed from JavaScript.
        // Won't update DOM on value change because getters
        // don't depend on reactive values
        width: {
          configurable: true,
          get: () => {
            return this.getBox().width
          }
        },
        height: {
          configurable: true,
          get: () => {
            return this.getBox().height
          }
        }
      })

      this.chart = chart
    },
    refresh () {
      if (this.chart) {
        this.destroy()
        this.init()
      }
    }
  }
}
</script>
