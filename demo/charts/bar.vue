<template>
  <div class='bar-chart'>
    <g2-vchart
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
import G2VChart from '../../src'

export default {
  components: {
    'g2-vchart': G2VChart
  },
  data () {
    return {
      chartHeight: 220,
      selectedMonth: '9月',
      barData: [
        { month: '4月', value: 10 },
        { month: '5月', value: 310 },
        { month: '6月', value: 450 },
        { month: '7月', value: 60 },
        { month: '8月', value: 110 },
        { month: '9月', value: 100 }
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
      const self = this
      chart.interval().position('month*value').size(20).color('month', month => {
        if (month === self.selectedMonth) {
          return '#108ee9'
        }
        return '#108ee969'
      })
      chart.legend(false)
      chart.tooltip(false)
      return chart
    },
    addBarGuide(chart, barData) {
      if (!chart || !barData) { return }
      barData.map(item => {
        chart.guide().text({
          position: item,
          content: item.value,
          offsetX: -9,
          offsetY: -8
        })
      })
    },
    refresh () {
      this.barData = [
        { month: '4月', value: Math.floor(Math.random() * 100) + 30 },
        { month: '5月', value: Math.floor(Math.random() * 100) + 110 },
        { month: '6月', value: Math.floor(Math.random() * 100) + 450 },
        { month: '7月', value: Math.floor(Math.random() * 100) + 340 },
        { month: '8月', value: Math.floor(Math.random() * 100) + 210 },
        { month: '9月', value: Math.floor(Math.random() * 100) + 680 }
      ]
    }
  }
}
</script>
<style>

</style>
