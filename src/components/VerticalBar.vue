<template>
    <div>
        <div>【服务资源占用比】</div>
        <div ref="target" class="w-full h-full"></div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'


const props = defineProps({
	data: {
		type: Object,
		required: true
	}
})

console.log(props.data)

let mChart = null
const target = ref(null)

onMounted(() => {
	mChart = echarts.init(target.value)
    renderChart()
})

const renderChart = () =>{
    const options = {
        xAxis:{
            type: 'category',
            data: props.data.servers.map(item => item.name),
            axisLabel:{
                color: '#9EB1C8'
            }
        },
        yAxis:{
            type:'value',
            show: false,
            max: function(value){
                return parseInt(value.max * 1.2)
            }
        },
        grid:{
            top:16,
            right:0,
            bottom:26,
            left:-26,
            containLabel:true
        },
        // 柱形图核心配置
		series: [
			{
				// 图表类型
				type: 'bar',
				// 数据筛选
				data: props.data.servers.map((item) => ({
					name: item.name,
					value: item.value
				})),
				// 显示背景
				showBackground: true,
				// 背景色
				backgroundStyle: {
					color: 'rgba(180, 180, 180, 0.2)'
				},
				// 每个轴的样式
				itemStyle: {
					color: '#479AD3', // 设置柱子的颜色
					barBorderRadius: 5, // 设置柱子的圆角
					shadowColor: 'rgba(0, 0, 0, 0.3)', // 设置柱子的阴影颜色
					shadowBlur: 5 // 设置柱子的阴影模糊大小
				},
				// 轴宽度
				barWidth: 12,
				// 轴上的字体
				label: {
					show: true,
					// 设置标签位置为右侧
					position: 'top',
					textStyle: {
						// 设置标签文本颜色
						color: '#fff'
					},
                    formatter:'{c}%'
				}
			}
        ]
    }

    mChart.setOption(options)
}


watch(() => props.data, renderChart)
</script>

<style lang='scss' scoped></style>