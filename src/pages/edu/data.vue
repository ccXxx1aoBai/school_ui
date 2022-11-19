<template>
  <div>
    <div class="wrap">
      <div class="top">
        <div class="panel" style="flex: 0 0 400px;">
          <h1>上课教室</h1>
          <div>
            <el-tag v-for="i in 9" :key="i">B20{{i}}</el-tag>
          </div>
        </div>
        <div class="qd">
          <div class="header">
            <div>
              <img :src="require('@/assets/xs.png')">
              <div>
                <p>学生</p>
                <p style="color: #1fdeae;">23141</p>
              </div>
            </div>
            <div>
              <img :src="require('@/assets/ls.png')" style="width: 56px;height: 56px;">
              <div>
                <p>教师</p>
                <p style="color: #bd9ee2;">579</p>
              </div>
            </div>
            <div>
              <img :src="require('@/assets/qj.png')" style="width: 56px;height: 56px;">
              <div>
                <p>请假</p>
                <p style="color: #fc4956;">29</p>
              </div>
            </div>
            <div>
              <img :src="require('@/assets/cq.png')">
              <div>
                <p>出勤</p>
                <p style="color: #6bb5ff;">179</p>
              </div>
            </div>
          </div>
          <div class="footer" ref="container"></div>
        </div>
      </div>
      <div class="bottom">
        <div ref="container1"></div>
        <div ref="container2"></div>
        <div ref="container3"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as echarts from 'echarts'
  export default {
    name: '',
    data() {
      return {
        
      }
    },
    mounted() {
      this.draw()
      this.draw1()
      this.draw2()
      this.draw3()
    },
    methods: {
      draw() {
        const chart = echarts.init(this.$refs.container)
        chart.setOption({
          title: {
            text: '本月出勤情况',
            top: 10,
            left: 10
          },
          legend: {
            top: 10,
            right: 50
          },
          tooltip: {
            trigger: 'item',
            formatter: (item) => {
              return '出勤情况<br>' + item[0].marker + '&nbsp;&nbsp;' + item[0].seriesName + '&nbsp;&nbsp;'  + item[0].value
                    + '人<br>' + item[1].marker + '&nbsp;&nbsp;' + item[1].seriesName + '&nbsp;&nbsp;' + item[1].value + '人'
            }
          },
          xAxis: {
            type: 'category',
            axisPointer: {
              show: true,
              type: 'shadow'
            }
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              type: 'line',
              name: '出勤',
              data: [2032, 2312, 223, 251, 749, 745, 4212, 452, 2567, 3150],
              itemStyle: {
                color: '#00c853'
              }
            }, {
              type: 'line',
              name: '缺勤',
              data: [23, 2, 5, 18, 23, 58, 25, 41, 69, 13],
              itemStyle: {
                color: '#c62828'
              }
            }
          ]
        })
      },
      draw1() {
        const chart1 = echarts.init(this.$refs.container1)
        chart1.setOption({
          title: {
            text: '学院学生人数',
            left: 10,
            top: 10
          },
          legend: {
            left: 5,
            bottom: 5,
            orient: 'vertical'
          },
          tooltip: {
            formatter: (item) => {
              return item.name + '<br>' + item.marker + '&nbsp;&nbsp;' + item.value + '人'
            }
          },
          series: [
            {
              type: 'pie',
              name: '学院学生人数',
              label: {
                show: false
              },
              data: [
                {name: '水利1', value: 1},
                {name: '土建1', value: 1},
                {name: '机电1', value: 1},
                {name: '信工1', value: 1},
                {name: '水利', value: 1},
                {name: '土建', value: 1},
                {name: '机电', value: 1},
                {name: '信工', value: 1},
                {name: '土建2', value: 1},
              ]
            }
          ]
        })
      },
      draw2() {
        const chart2 = echarts.init(this.$refs.container2)
        chart2.setOption({
          title: {
            text: '教师情况',
            top: 10,
            left: 10
          },
          legend: {
            left: 10,
            bottom: 5,
            orient: 'vertical'
          },
          tooltip: {
            formatter: (item) => {
              return item.name + '<br>' + item.marker + '&nbsp;&nbsp;' + item.value + '人'
            }
          },
          series: [
            {
              type: 'pie',
              name: '教师情况',
              label: {
                show: false
              },
              data: [
                {name: '教授', value: 522},
                {name: '副教授', value: 232},
                {name: '助教', value: 122}
              ]
            }
          ]
        })
      },
      draw3() {
        const chart3 = echarts.init(this.$refs.container3)
        chart3.setOption({
          title: {
            text: '各年级人数',
            top: 10,
            left: 10
          },
          tooltip: {
            trigger: 'item',
            formatter: (item) => {
              return '各年级人数<br>' + item[0].marker + '&nbsp;&nbsp;' + item[0].seriesName + '&nbsp;&nbsp;'  + item[0].value
                    + '人<br>' + item[1].marker + '&nbsp;&nbsp;' + item[1].seriesName + '&nbsp;&nbsp;' + item[1].value + '人'
            }
          },
          legend: {
            bottom: 5,
            icon: 'circle'
          },
          xAxis: {
            type: 'category',
            data: ['2019', '2020', '2021', '2022'],
            axisPointer: {
              show: true,
              type: 'shadow'
            }
          },
          yAxis: {
            type: 'value',
            axisTick: {
              show: false
            }
          },
          series: [
            {
              type: 'line',
              name: '在校人数',
              data: [4211, 5212, 4923, 5608]
            },{
              type: 'line',
              name: '外出人数',
              data: [1523, 241, 32, 59]
            }
          ]
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrap {
    flex-direction: column;
  }

  .top {
    display: flex;
    width: 100%;
    .panel {
      width: 400px;
      height: 470px;
      padding: 10px 0;
      box-sizing: border-box;
      box-shadow: 0 0 2px rgba($color: #000000, $alpha: .3);

      h1 {
        padding: 0 10px 10px;
      }

      & > div {
        display: flex;
        flex-wrap: wrap;

        & > * {
          margin: 8px 10px;
        }
      }
    }

    .qd {
      width: calc(100% - 400px);
      height: 470px;
      margin-left: 50px;

      .header {
        display: flex;

        & > div {
          display: flex;
          width: 100%;
          margin: 0 12px;
          align-items: center;
          box-shadow: 0 0 2px rgba($color: #000000, $alpha: .3);

          img {
            display: block;
            width: 48px;
            height: 48px;
            margin-left: 20px;
          }

          & > div {
            flex: 1;
            margin-right: 20px;
            padding: 10px 0;
            text-align: right;
          }

          p {
            font-size: 16px;
            font-weight: bold;

            &:last-child {
              padding-top: 5px;
              font-size: 22px;
            }
          }
        }
      }

      .footer {
        width: calc(100% - 20px);
        height: calc(100% - 80px);
        margin: 10px 10px 0;
        box-shadow: 0 0 2px rgba($color: #000000, $alpha: .3);
      }
    }
  }
  .bottom {
    display: flex;
    height: 300px;

    & > div {
      width: 100%;
      height: 100%;
      margin-top: 40px;
      box-shadow: 0 0 2px rgba($color: #000000, $alpha: .3);

      &:nth-child(2) {
        margin: 40px 20px 0;
      }
    }
  }
</style>