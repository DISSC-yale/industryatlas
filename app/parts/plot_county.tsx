import {use, init, getInstanceByDom} from 'echarts/core'
import {LineChart} from 'echarts/charts'
import {DatasetComponent, GridComponent, TitleComponent, ToolboxComponent, TooltipComponent} from 'echarts/components'
import {Box, useColorScheme} from '@mui/material'
import {useEffect, useRef} from 'react'
import {CanvasRenderer} from 'echarts/renderers'
import {DATA_VERSION, DataBySector, type DataEntry, type ViewDef} from './data'
import {sectorLabels} from '../labels'

const N_COUNTIES = 20

export default function CountyPlot({
  view,
  selection,
  data,
}: {
  view: ViewDef
  selection: DataEntry[]
  data: DataBySector
}) {
  const {mode} = useColorScheme()
  const container = useRef<HTMLDivElement>(null)
  useEffect(() => {
    use([
      DatasetComponent,
      TitleComponent,
      GridComponent,
      TooltipComponent,
      ToolboxComponent,
      LineChart,
      CanvasRenderer,
    ])
  }, [])
  useEffect(() => {
    const chart = container.current ? init(container.current, mode, {renderer: 'canvas'}) : null
    const resize = () => chart && chart.resize()
    window.addEventListener('resize', resize)
    return () => {
      if (chart) {
        chart.dispose()
      }
      window.removeEventListener('resize', resize)
    }
  }, [mode])
  const sectorLabel = view.sector in sectorLabels ? sectorLabels[view.sector] : view.sector
  useEffect(() => {
    if (container.current) {
      const chart = getInstanceByDom(container.current)
      if (chart && data.year.length) {
        const colors = mode === 'dark' ? {bg: '#121212', text: '#ffffff'} : {bg: '#ffffff', text: '#000000'}
        const selectCounties = selection.filter((e, i) => e.label !== 'year' && i < N_COUNTIES + 1)
        chart.setOption(
          {
            darkMode: mode === 'dark',
            backgroundColor: colors.bg,
            title: {
              text: `Top ${N_COUNTIES} Counties in Sector ${view.sector}`,
              textStyle: {
                textBorderColor: colors.bg,
                textBorderWidth: 2,
              },
            },
            tooltip: {
              trigger: 'axis',
              textStyle: {
                color: colors.text,
              },
              backgroundColor: colors.bg,
              borderWidth: 0,
            },
            visualMap: {
              calculable: true,
              max: Math.max(...selectCounties.map(e => e.value)),
              inRange: {
                color: [
                  '#051E3A',
                  '#073D6C',
                  '#185D8D',
                  '#29738D',
                  '#388284',
                  '#49917A',
                  '#5EA56F',
                  '#86C168',
                  '#C3DD91',
                  '#EEEEC5',
                ],
              },
              right: 0,
              orient: 'horizontal',
            },
            grid: {top: 40, right: 30, bottom: 90, left: 70},
            xAxis: {type: 'category', data: data.year},
            yAxis: {type: 'value'},
            series: selectCounties.map(e => {
              return {
                type: 'line',
                symbolSize: 10,
                itemStyle: {opacity: 1},
                lineStyle: {width: 1, opacity: 1},
                emphasis: {
                  focus: 'series',
                  lineStyle: {
                    width: 5,
                    opacity: 1,
                  },
                },
                name: e.label,
                id: e.name,
                data: data[e.name],
              }
            }),
            toolbox: {
              feature: {
                saveAsImage: {name: `industryatlas_counties_${view.sector}_${view.year}_${DATA_VERSION}`},
              },
            },
          },
          true,
          true
        )
      }
    }
  }, [mode, sectorLabel, view, selection, data])
  return <Box ref={container} sx={{width: '100%', height: '100%', minHeight: '10px'}} />
}
