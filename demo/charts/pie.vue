<template>
  <div class='pie-chart'>
    <G2VChart
      ref="pie"
      :height="chartHeight"
      :plotCfg="piePlotCfg"
      :chartData="pieData"
      :createChart="createPieChart"
      :addGuide="addPieGuide"
    />
    <div class='btn' @click="refresh">refresh</div>
  </div>
</template>
<script>
import G2VChart from '../../src'

export default {
  components: {
    G2VChart
  },
  data () {
    return {
      chartHeight: 150,
      pieData: [
        {
          value: 399,
          type: 'IN'
        },
        {
          value: 24,
          type: 'OUT'
        }
      ],
      piePlotCfg: {},
      typeMap: {
        OUT: '支出',
        IN: '收入'
      }
    }
  },
  computed: {},
  methods: {
    createPieChart (chart) {
      const self = this
      chart.coord('theta', {
        radius: 1,
        innerRadius: 0.9
      })
      chart
        .intervalStack()
        .position('value')
        .color('type', type => {
          return type === 'IN' ? '#F96268' : '#FFC600'
        })
      chart.legend('type', {
        itemFormatter: type => self.typeMap[type],
        clickable: false
      })
      chart.tooltip(false)
      return chart
    },
    addPieGuide (chart, chartData) {
      // 辅助文本
      let diffVal = 0
      chartData.map(item => {
        if (item.type === 'OUT') {
          diffVal -= item.value
        } else {
          diffVal += item.value
        }
      })
      if (diffVal > 0) {
        diffVal = `+${diffVal}`
      }
      chart.guide().html({
        position: ['50%', '50%'],
        html: `<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">损益总计<br><span style="color:#8c8c8c;font-size:24px">${diffVal}</span></div>`,
        alignX: 'middle',
        alignY: 'middle'
      })
    },
    refresh () {
      this.pieData = [
        {
          value: Math.floor(Math.random() * 300) + 50,
          type: 'IN'
        },
        {
          value: Math.floor(Math.random() * 300) + 60,
          type: 'OUT'
        }
      ]
    }
  },
  watch: {},
  mounted () {}
}
</script>
<style>
</style>
