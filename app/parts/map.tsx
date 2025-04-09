import {use, init, getInstanceByDom} from 'echarts/core'
import {MapChart, type MapSeriesOption} from 'echarts/charts'
import {GeoComponent, ToolboxComponent, TooltipComponent, VisualMapComponent} from 'echarts/components'
import {Box, useColorScheme} from '@mui/material'
import {useEffect, useRef} from 'react'
import {getMap, registerMap} from 'echarts'
import {CanvasRenderer} from 'echarts/renderers'
import type {GeoJSON} from 'echarts/types/src/coord/geo/geoTypes.js'
import {DATA_VERSION, type DataEntry, type ViewDef} from './data'
import {sectorLabels} from '../labels'

function quantile(p: number, x: DataEntry[]): number {
  const a = p * (x.length - 1),
    ap = a % 1,
    bp = 1 - ap,
    b = Math.ceil(a),
    i = Math.floor(a)
  return x[i].value * ap + x[b].value * bp
}

const roamSettings: {zoom: number; center: number[]} = {
  zoom: 1.5,
  center: [-96, 38],
}
export default function Map({
  view,
  selection,
  map,
}: {
  view: ViewDef
  selection: DataEntry[]
  map: {shapes: GeoJSON; info: {[index: string]: {[index: string]: string}}}
}) {
  const {mode} = useColorScheme()
  const container = useRef<HTMLDivElement>(null)
  useEffect(() => {
    use([TooltipComponent, ToolboxComponent, GeoComponent, MapChart, CanvasRenderer, VisualMapComponent])
  }, [])
  useEffect(() => {
    if (map) {
      const chart = container.current ? init(container.current, mode, {renderer: 'canvas'}) : null
      if (!getMap('counties')) registerMap('counties', map.shapes)
      const resize = () => chart && chart.resize()
      window.addEventListener('resize', resize)
      if (chart) {
        chart.on('georoam', p => {
          const params = p as {totalZoom: number} | {dx: number; dy: number}
          if ('totalZoom' in params) {
            roamSettings.zoom = params.totalZoom as number
          } else {
            roamSettings.center = (chart.getOption().series as MapSeriesOption[])[0].center as number[]
          }
        })
      }
      return () => {
        if (chart) {
          chart.dispose()
        }
        window.removeEventListener('resize', resize)
      }
    }
  }, [mode, map])
  const sectorLabel = view.sector in sectorLabels ? sectorLabels[view.sector] : view.sector
  useEffect(() => {
    if (container.current) {
      const chart = getInstanceByDom(container.current)
      if (chart && map) {
        const colors = mode === 'dark' ? {bg: '#121212', text: '#ffffff'} : {bg: '#ffffff', text: '#000000'}
        chart.setOption(
          {
            backgroundColor: colors.bg,
            title: {text: `${sectorLabel} employment in ${view.year}`},
            tooltip: {
              trigger: 'item',
              textStyle: {
                color: colors.text,
              },
              backgroundColor: colors.bg,
              borderWidth: 0,
              formatter: ({marker, name, data}: {marker: string; name: string; data: DataEntry}) => {
                return (
                  '<div>' +
                  marker +
                  data.label +
                  ' (' +
                  name +
                  '), ' +
                  view.year +
                  '<table><thead><tr><td><u>Sector</u></td><td><u>Employed</u></td></tr></thead>' +
                  `<tbody><tr><td>${sectorLabel}</td><td><strong>${data.value}</strong></td></tr>` +
                  (data.sectors
                    ? data.sectors
                        .filter((s, i) => s.label !== sectorLabel && i < 6)
                        .map(s => `<tr><td>${s.label}</td><td>${s.value}</td></tr>`)
                        .join('')
                    : '') +
                  '</tbody></table></div>'
                )
              },
            },
            visualMap: {
              name: 'Employed',
              calculable: true,
              max: quantile(0.5, selection) * 2,
              inRange: {
                color: ['#7E1700', '#C8E9B6', '#1549A2'],
              },
            },
            series: [
              {
                type: 'map',
                roam: true,
                map: 'counties',
                nameProperty: 'geoid',
                data: selection,
                zoom: roamSettings.zoom,
                center: roamSettings.center,
              },
            ],
            toolbox: {
              feature: {
                myReset: {
                  title: 'reset view',
                  icon: 'path://M-2.7513 -7.5L-5.9524 -4.2989L-2.6984 -1.045M-5.8466 -4.2989L5.9524 -4.2989L5.9524 7.5L-5.8466 7.5L-5.8466 0.6217',
                  onclick: () => {
                    roamSettings.zoom = 1.5
                    roamSettings.center = [-98, 38]
                    chart.setOption({series: [{zoom: roamSettings.zoom, center: roamSettings.center}]})
                  },
                },
                saveAsImage: {name: `industryatlas_${view.sector}_${view.year}_${DATA_VERSION}`},
              },
            },
          },
          true,
          true
        )
      }
    }
  }, [selection, map, mode, sectorLabel, view])
  return <Box ref={container} sx={{width: '100%', height: '100%', minHeight: '10px'}} />
}
