<template>
  <div class='demo'>
    <g2-vchart
      ref="g2-vchart"
      autoResize
      :plotCfg="plotCfg"
      :chartData="Data"
      :createChart="createChart"
      :addGuide="addGuide"
      @resize="onResize"
    />
    <div class='btn' @click="refresh">refresh</div>
  </div>
</template>
<script>
import G2VChart from '../src'

export default {
  components: {
    'g2-vchart': G2VChart
  },
  data () {
    return {
      selectedMonth: '9月',
      Data: [
        { month: '4月', value: 10 },
        { month: '5月', value: 310 },
        { month: '6月', value: 450 },
        { month: '7月', value: 60 },
        { month: '8月', value: 110 },
        { month: '9月', value: 100 }
      ],
      plotCfg: {
        background: { stroke: '#efefef' }
      },
      typeMap: {
        OUT: '支出',
        IN: '收入'
      }
    }
  },
  methods: {
    createChart(chart) {
      const self = this
      chart.interval().position('month*value').size(20).color('month', month => {
        if (month === self.selectedMonth) {
          return '#108ee9'
        }
        return '#108ee969'
      })
      chart.legend(false)
      // chart.tooltip(false)
      return chart
    },
    addGuide(chart, Data) {
      if (!chart || !Data) { return }
      Data.map(item => {
        chart.guide().text({
          position: item,
          content: item.value,
          offsetX: -9,
          offsetY: -8
        })
      })
    },
    refresh () {
      this.Data = [
        { month: '4月', value: Math.floor(Math.random() * 100) + 30 },
        { month: '5月', value: Math.floor(Math.random() * 100) + 110 },
        { month: '6月', value: Math.floor(Math.random() * 100) + 450 },
        { month: '7月', value: Math.floor(Math.random() * 100) + 340 },
        { month: '8月', value: Math.floor(Math.random() * 100) + 210 },
        { month: '9月', value: Math.floor(Math.random() * 100) + 680 }
      ]
    },
    onResize() {
      const g2VChart = this.$refs['g2-vchart'];
      console.log('onResize:width:%d, height:%d', g2VChart.width, g2VChart.height)
    }
  }
}
</script>
<style>
html, body {
  margin: 0;
  padding: 0;
}
.demo {
  width: 90vw;
  height: 80vh;
  margin: 1vh 5vw 0;
}
.demo .btn {
  width: 80px;
  height: 30px;
  line-height: 30px;
  background: #03A9F4;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  margin: 5px 12px;
  float: right;
}
</style>
