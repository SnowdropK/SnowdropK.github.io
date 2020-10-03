---
title: Echarts具体样式个人笔记
date: 2018-09-10 18:02:54
tags:
---
虽然查文档很全面，但还是自己罗列一下样式，这样记忆深刻一些。不然每次看文档，时间都花在找上面了/(ㄒoㄒ)/

（如果有大神路过，请问一下，文档那么多样式，你们都是咋记住哒）

 1、折线图填充渐变
 ```
    series: [
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#d68262'
                    }, {
                        offset: 1,
                        color: '#ffe'
                    }])
                }
            }
    ]
```

<!-- more -->

2、网格线显示/不显示
```
yAxis: {
	    splitLine: {show: false}
    }
```
3、离边界的距离
```
grid: { x: 75, y: 65, x2: 25, y2: 65, borderWidth: 1 }
```
4、鼠标悬停的时候是否有数据
```
tooltip: {}
```
5、饼状图阴影+鼠标悬停时的阴影效果
```
//在 ECharts4 以前，高亮和普通样式的写法，是这样的：
//这种写法 仍然被兼容，但是，不再推荐。
itemStyle: {
                normal: {
                    color:'#c23531'
                    shadowBlur: 200,
                    shadowColor: 'rgba(35, 156, 0, 0.5)'
                },
                emphasis: {
                    shadowBlur: 200,
                    shadowColor: 'rgba(35, 156, 0, 0.5)'
                }
            }

// ECharts4支持的高亮样式。
series：{
    emphasis: {
        itemStyle: {
            // 高亮时点的颜色。
            color: 'blue'
        },
        label: {
            show: true,
            // 高亮时标签的文字。
            formatter: 'This is a emphasis label.'
        }
    }
}
```
6、饼状图的文字颜色和线条颜色
```
label: {
        normal: {
            textStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
            }
        }
},
labelLine: {
        normal: {
            lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
            }
        }
}
```
7、通过 visualMap 组件将数值的大小映射到明暗度
```
visualMap: {
        show: true,//左下角明暗控制条是否显示
        min: 80,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
    }
```
8、主题颜色
```
var chart = echarts.init(dom, 'light'/'dark');
```
9、调色盘
```
option = {
    // 全局调色盘。
    color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],

    series: [{
        type: 'bar',
        // 此系列自己的调色盘。
        color: ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78','#73a373','#73b9bc','#7289ab', '#91ca8c','#f49f42'],
        ...
    }, {
        type: 'pie',
        // 此系列自己的调色盘。
        color: ['#37A2DA', '#32C5E9', '#67E0E3', '#9FE6B8', '#FFDB5C','#ff9f7f', '#fb7293', '#E062AE', '#E690D1', '#e7bcf3', '#9d96f5', '#8378EA', '#96BFFF'],
        ...
    }]
}
```
10、
待补充ing……