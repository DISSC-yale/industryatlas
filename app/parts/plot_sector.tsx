import {use, init, getInstanceByDom} from 'echarts/core'
import {DatasetComponent, GridComponent, TitleComponent, ToolboxComponent, TooltipComponent} from 'echarts/components'
import {Box, useColorScheme} from '@mui/material'
import {useEffect, useRef} from 'react'
import {CanvasRenderer} from 'echarts/renderers'
import {byValue, DATA_VERSION, type DataByYear, type ViewDef} from './data'
import {sectorLabels} from '../labels'
import {BoxplotChart} from 'echarts/charts'

export default function SectorPlot({view, data}: {view: ViewDef; data: DataByYear}) {
  const {mode} = useColorScheme()
  const container = useRef<HTMLDivElement>(null)
  useEffect(() => {
    use([
      DatasetComponent,
      TitleComponent,
      GridComponent,
      TooltipComponent,
      ToolboxComponent,
      CanvasRenderer,
      BoxplotChart,
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
      if (chart && data.sector.length) {
        const colors = mode === 'dark' ? {bg: '#121212', text: '#ffffff'} : {bg: '#ffffff', text: '#000000'}
        const values = data.sector.map(() => 0)
        Object.keys(data).forEach(county => {
          if (county !== 'sector') {
            ;(data[county] as number[]).forEach((v, i) => {
              if (v) values[i] += v
            })
          }
        })
        const ordered = data.sector
          .map((s, i) => {
            return {name: s, value: values[i]}
          })
          .filter(e => e.name !== '10')
          .sort(byValue)
        chart.setOption(
          {
            darkMode: mode === 'dark',
            backgroundColor: colors.bg,
            title: {
              text: `Sector Totals in ${view.year}`,
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
              formatter: (series: {value: number; name: string; marker: string}[]) => {
                const {value, name, marker} = series[0]
                const label = sectorLabels[name]
                return `<div>(${name}) ${label}<br>${marker}<strong>${value}</strong></div>`
              },
            },
            grid: {top: 40, right: 30, bottom: 90, left: 70},
            xAxis: {
              type: 'category',
              data: ordered.map(e => e.name),
              name: 'Sectors',
              nameLocation: 'center',
              nameGap: 40,
            },
            yAxis: {type: 'value', max: 'dataMax'},
            series: [
              {
                type: 'bar',
                color: '#286dc0',
                data: ordered,
              },
            ],
            toolbox: {
              feature: {
                saveAsImage: {name: `industryatlas_sectors_${view.sector}_${view.year}_${DATA_VERSION}`},
              },
            },
          },
          true,
          true
        )
      }
    }
  }, [mode, sectorLabel, view, data])
  return <Box ref={container} sx={{width: '100%', height: '100%', minHeight: '10px'}} />
}
