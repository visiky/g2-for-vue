
<template>
  <div class="g2-chart"/>
</template>
<style>
.g2-chart {
  width: 100%;
  height: 100%;
}
</style>
<script>
import G2 from '@antv/g2'

export default {
  props: {
    width: Number,
    height: {
      type: Number,
      default: 300
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
    width: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.chart.changeSize(newVal, this.height)
      }
    },
    height: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.chart.changeSize(this.width, newVal)
      }
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
    this.initChart()
  },

  // activated () {
  //   if (this.autoResize) {
  //     this.chart && this.chart.resize()
  //   }
  // },

  beforeDestory () {
    if (this.chart) {
      this.chart.destroy()
      this.chart = null
    }
  },

  methods: {
    initChart () {
      const self = this
      let chart = new G2.Chart({
        container: self.$el,
        height: self.height,
        width: self.width,
        forceFit: !self.width,
        ...Object.assign(this.defaultPlotCfg, this.plotCfg)
      })
      if (this.createChart) {
        chart = this.createChart(chart)
      } else {
        // TODO 默认创建
      }
      chart.source(this.chartData)
      this.addGuide(chart, this.chartData)
      chart.render()
      this.chart = chart
    },
    refresh () {
      if (this.chart) {
        this.chart.destroy()
        this.initChart()
      }
    }
  }
}
</script>
