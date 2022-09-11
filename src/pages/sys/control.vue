<template>
  <div>
    <el-row justify="center" style="marginTop: 10px;" :gutter="24">
      <el-col :span="8" :offset="1">
        <div class="panel">
          <el-descriptions title="CPU" :column="1">
            <el-descriptions-item v-for="cpu in cpuInfo" :key="cpu.name" :label="cpu.name">
              {{cpu.value}}
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <div class="panel scroll">
          <el-descriptions title="硬盘信息" :column="1" :colon="false">
            <el-descriptions-item :label="info.model" v-for="info in sysFileInfo" :key="info.model">
              <el-collapse>
                <el-collapse-item :title="info.model">
                  <div>
                    <p>总容量：{{info.size}}</p>
                    <div v-for="os in info.os" :key="os.name" style="width: 100%;margin: 10px auto;">
                      <p>{{os.name}}</p>
                      <div class="progress">
                        <div class="progress-wrap">
                          <div class="progress-used" :style="{'width': `${os.lused * 100 / os.ltotal}%`}"></div>
                        </div>
                      </div>
                      <p>{{`已用 ${os.used}`}}，{{`共 ${os.total}`}}</p>
                    </div>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </el-col>
      <el-col :span="5" :offset="1">
        <div class="panel">
          <div style="padding: 10px;">
            <h1>
              <span>内存使用情况</span>
              <el-tooltip content="每10S刷新一次" placement="bottom-start">
                <i class="el-icon-question" />
              </el-tooltip></h1>
            <p>
              <span style="padding-right: 20px">已用：{{memory.used}}</span>
              <span>总共：{{memory.total}}</span>
            </p>
            <div ref="memory" class="memory"></div>
          </div>
        </div>
        <div class="panel">
          <div style="padding: 10px;">
            <h1>JVM内存</h1>
            <p>
              <span style="padding-right: 20px">已用：{{jvmInfo.used}}</span>
              <span>总共：{{jvmInfo.total}}</span>
            </p>
          </div>
        </div>
      </el-col>
      <el-col :span="6" :offset="1">
        <div class="panel">
          <div ref="cpu" class="memory"></div>
          <div ref="net" class="memory"></div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="22" :offset="1">
        <div class="panel">
          <el-descriptions title="系统信息">
            <el-descriptions-item label="服务器名称">
              {{sysInfo.computerName}}
            </el-descriptions-item>
            <el-descriptions-item label="操作系统">
              {{sysInfo.osName}}
            </el-descriptions-item>
            <el-descriptions-item label="服务器IP">
              {{sysInfo.computerIp}}
            </el-descriptions-item>
            <el-descriptions-item label="运行环境">
              {{sysInfo.environment}}
            </el-descriptions-item>
            <el-descriptions-item label="系统架构">
              {{sysInfo.osArch}}
            </el-descriptions-item>
            <el-descriptions-item label="项目路径">
              {{sysInfo.userDir}}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="22" :offset="1">
        <div class="panel">
          <el-descriptions title="JVM信息">
            <el-descriptions-item label="JVM名称">
              {{jvmInfo.jvmName}}
            </el-descriptions-item>
            <el-descriptions-item label="JDK版本">
              {{jvmInfo.jdkVersion}}
            </el-descriptions-item>
            <el-descriptions-item label="JDK路径">
              {{jvmInfo.jdkPath}}
            </el-descriptions-item>
            <el-descriptions-item label="启动时间">
              {{jvmInfo.startTime}}
            </el-descriptions-item>
            <el-descriptions-item label="运行时间">
              {{jvmInfo.runTime}}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10" :offset="1">
        <div class="panel">
          <el-descriptions title="数据库" :column="2">
            <el-descriptions-item label="数据库名称">
              {{otherInfo.dataName}}
            </el-descriptions-item>
            <el-descriptions-item label="数据库版本">
              {{otherInfo.dataVersion}}
            </el-descriptions-item>
            <el-descriptions-item label="JDBC驱动名称">
              {{otherInfo.jdbcName}}
            </el-descriptions-item>
            <el-descriptions-item label="JDBC驱动版本">
              {{otherInfo.jdbcVersion}}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </el-col>
      <el-col :span="10" :offset="2">
        <div class="panel">
          <el-descriptions title="Redis" :column="2">
            <el-descriptions-item label="端口">
              {{otherInfo.port}}
            </el-descriptions-item>
            <el-descriptions-item label="数据库版本">
              {{otherInfo.version}}
            </el-descriptions-item>
            <el-descriptions-item label="系统">
              {{otherInfo.os}}
            </el-descriptions-item>
            <el-descriptions-item label="架构">
              {{otherInfo.arch}}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import * as echarts from 'echarts'
  import { getSysInfo, getCpuRate, getNetInfo, getMemory } from '@/api/sys'
  export default {
    name: '',
    data() {
      return {
        sysFileInfo: [],
        cpuInfo: [],
        memory: {},
        sysInfo: {},
        jvmInfo: {},
        otherInfo: {},
        colors: [
          {color: '#3b5bdb', percentage: 50},
          {color: '#e67700', percentage: 70},
          {color: '#e03131', percentage: 100}
        ]
      }
    },
    computed: {
      percentage() {
        return Math.round((this.memory.lUsed / this.memory.lTotal) * 100)
      }
    },
    created() {
      getSysInfo().then(res => {
        this.cpuInfo = []
        const {sysFileInfo, cpuInfo, memory, 
          sysInfo, jvmInfo, otherInfo} = res.data.data
        this.memory = memory
        this.sysInfo = sysInfo
        this.jvmInfo = jvmInfo
        otherInfo.jdbcVersion = otherInfo.jdbcVersion.split(/\(/)[0]
        this.otherInfo = otherInfo
        sysFileInfo.map(item => {
          item.os = []
          item.hpList.map((child, index) => {
            child.osList.map(os => {
              item.os.splice(index, 0, os)
            })
          })
        })
        this.sysFileInfo = sysFileInfo
        Object.keys(cpuInfo).forEach((key, index) => {
          this.cpuInfo.splice(index, 0, {name: key, value: cpuInfo[key]})
        })
      })
      getCpuRate().then(res => {
        const { data } = res.data
        this.drawCPU(data)
      })
      getNetInfo().then(res => {
        const { data } = res.data
        this.drawNet(data)
      })
      getMemory().then(res => {
        const {data} = res.data
        this.drawMemory(data)
      })
      this.interval = setInterval(() => {
        getMemory().then(res => {
          const {data} = res.data
          this.memory.used = data.used
          this.drawMemory(data)
        })
      }, 1000 * 10);
    },
    beforeDestroy() {
      clearInterval(this.interval)
    },
    methods: {
      drawMemory(data) {
        const memory = echarts.init(this.$refs.memory)
        memory.resize({
          width: this.$refs.memory.clientWidth,
          height: 175
        })
        const rate = (data.lUsed / data.lTotal * 100).toFixed(2)
        memory.setOption({
          series: [
            {
              type: 'gauge',
              axisLine: {
                lineStyle: {
                  width: 4,
                  color: [
                    [0.3, '#67e0e3'],
                    [0.7, '#37a2da'],
                    [1, '#fd666d']
                  ]
                }
              },
              pointer: {
                itemStyle: {
                  color: 'auto'
                }
              },
              axisTick: {
                distance: -20,
                length: 8,
                lineStyle: {
                  color: '#fff',
                  width: 2
                }
              },
              splitLine: {
                distance: -10,
                length: 2,
                lineStyle: {
                  color: '#fff',
                  width: 0
                }
              },
              axisLabel: {
                show: true,
                color: 'auto',
                distance: 20,
                fontSize: 10
              },
              detail: {
                valueAnimation: true,
                formatter: '{value} %',
                color: 'auto',
                fontSize: 16
              },
              data: [
                {
                  value: rate
                }
              ]
            }
          ]
        })
      },
      drawCPU(data) {
        const arr = []
        const label = []
        for(let i = data.length - 1; i >= 0; i--){
          arr.push((data[i].used / data[i].total * 100).toFixed(2))
          label.push(data[i].createTime)
        }
        const cpu = echarts.init(this.$refs.cpu)
        cpu.resize({
          width: this.$refs.cpu.clientWidth,
          height: 180
        })
        cpu.setOption({
          title: {
            text: 'CPU使用率'
          },
          tooltip: {
            trigger: 'axis',
            name: '使用率',
            axisPointer: {
              animation: false
            },
            valueFormatter: (data) => data + '%',
          },
          xAxis: {
            type: 'category',
            data: label,
            boundaryGap: true,
            axisLabel: {
              interval: 1,
              formatter: (label) => {
                const time = label.split(' ')[1].split(':')
                return time[0] + ':' + time[1]
              }
            },
            axisTick: {
              alignWithLabel: true
            }
          },
          yAxis: {
            type: 'value',
            show: true,
            boundaryGap: [0, '100%'],
            min: () => 0,
            max: (val) => val.max
          },
          series: [
            {
              name: 'CPU使用率',
              type: 'line',
              smooth: true,
              data: arr,
              color: '#339af0',
            }
          ]
        })
      },
      drawNet(data) {
        const arr = [[], []]
        const label = []
        for(let i = data.length - 1; i >= 0; i--){
          arr[0].push(data[i].revc)
          arr[1].push(data[i].send)
          label.push(data[i].createTime)
        }
        const net = echarts.init(this.$refs.net)
        net.resize({
          width: this.$refs.net.clientWidth,
          height: 185
        })
        net.setOption({
          title: {
            text: '网络使用情况',
            textStyle: {
              fontSize: 14
            }
          },
          legend: {
            left: 'right',
            data: ['收包数', '发包数']
          },
          tooltip: {
            trigger: 'axis',
            formatter: (axis) => {
              const data1 = axis[0]
              const data2 = axis[1]
              return `${data1.name}<br />
                      ${data1.marker}${data1.seriesName}&nbsp;&nbsp;${data1.data}Kb/s<br />
                      ${data2.marker}${data2.seriesName}&nbsp;&nbsp;${data2.data}Kb/s`
            }
          },
          xAxis: {
            type: 'category',
            data: label,
            boundaryGap: true,
            axisLabel: {
              interval: 1,
              formatter: (data) => {
                const time = data.split(' ')[1].split(':')
                return time[0] + ':' + time[1]
              }
            },
            axisTick: {
              alignWithLabel: true
            },
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '收包数',
              type: 'line',
              data: arr[0],
              color: '#f08c00',
              smooth: true
            },{
              name: '发包数',
              type: 'line',
              data: arr[1],
              color: '#4dabf7',
              smooth: true
            }
          ]
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.panel {
  width: 100%;
  margin: 10px auto;
  padding: 10px 20px;
  background-color: #ffffff;
  box-shadow: 0 0 12px 0 rgba($color: #000000, $alpha: .3);

  &.scroll{
    max-height: 189px;
    overflow-y: auto;
  }
  &::-webkit-scrollbar{
    width: 4px;
    height: 4px;
  }

  p {
    padding: 10px 0;
  }
  .memory{
    width: 100%;
  }
}
.table{
  .tr{
    display: flex;

    .td,.th{
      width: 100%;
      padding: 10px;
    }
  }
}
::v-deep .el-collapse-item__header, .el-collapse, .el-collapse-item__wrap{
  border: none;
}
::v-deep .el-descriptions-item__label{
  align-items: center;
}
.progress{
  width: 80%;

  .progress-wrap{
    width: 100%;
    height: 20px;
    background-color: #e6e6e6;
    
    .progress-used{
      width: 10%;
      height: 100%;
      background-color: #26a0da;
    }
  }
}
</style>