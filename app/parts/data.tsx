import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Typography,
  useColorScheme,
} from '@mui/material'
import {MouseEvent, useEffect, useMemo, useState} from 'react'
import Map from './map'
import {About} from './about'
import {ChevronLeft, ChevronRight, DarkMode, FirstPage, LastPage, LightMode, Public} from '@mui/icons-material'
import {GeoJSON} from 'echarts/types/src/coord/geo/geoTypes.js'
import {Export} from './export'
import {sectorLabels} from '../labels'
import {DataGrid} from '@mui/x-data-grid'
import CountyPlot from './plot_county'
import SectorPlot from './plot_sector'

export const DATA_VERSION = '2025-04'
const MIN_YEAR = 1975
const MAX_YEAR = 2018
const PREFIX = process.env.NODE_ENV === 'development' ? '/industryatlas/' : ''
const MENU_WIDTH = 350

export type ViewDef = {
  year: number
  sector: string
}
const defaultView: ViewDef = {year: 2016, sector: '10'}

export type DataByYear = {
  [index: string]: (string | number)[]
  sector: string[]
}
export type DataBySector = {
  [index: string]: number[]
}

const dataCache: {by_sector: {[index: string]: DataBySector}; by_year: {[index: number]: DataByYear}} = {
  by_sector: {},
  by_year: {},
}

export type DataEntry = {
  name: string
  label: string
  value: number
  index: number
  sectors: {label: string; value: number}[]
}
export function byValue(a: {value: number}, b: {value: number}) {
  return b.value - a.value
}

function pageActions({
  count,
  page,
  onPageChange,
}: {
  count: number
  page: number
  onPageChange: (e: MouseEvent<HTMLButtonElement>, newPage: number) => void
}) {
  const pages = Math.ceil(count / 100) - 1
  const onFirstPage = page === 0
  const onLastPage = page === pages
  return (
    <Stack direction="row">
      <IconButton aria-label="Go to first page" disabled={onFirstPage} onClick={e => onPageChange(e, 0)}>
        <FirstPage />
      </IconButton>
      <IconButton aria-label="Go to previous page" disabled={onFirstPage} onClick={e => onPageChange(e, page - 1)}>
        <ChevronLeft />
      </IconButton>
      <IconButton aria-label="Go to next page" disabled={onLastPage} onClick={e => onPageChange(e, page + 1)}>
        <ChevronRight />
      </IconButton>
      <IconButton aria-label="Go to last page" disabled={onLastPage} onClick={e => onPageChange(e, pages)}>
        <LastPage />
      </IconButton>
    </Stack>
  )
}

function updateUrlParams(params: ViewDef) {
  const options: string[] = []
  if (params.year !== defaultView.year) options.push('year=' + params.year)
  if (params.sector !== defaultView.sector) options.push('sector=' + params.sector)
  requestAnimationFrame(() => window.history.replaceState(void 0, '', '?' + options.join('&')))
}

export function Data() {
  const {mode, setMode} = useColorScheme()
  const [dataByYear, setDataByYear] = useState<DataByYear>({sector: []})
  const [dataBySector, setDataBySector] = useState<DataBySector>({year: []})
  const urlParams = useMemo(() => {
    const view: ViewDef = {...defaultView}
    const search = 'undefined' !== typeof window && window.location.search
    if (search) {
      search
        .substring(1)
        .split('&')
        .forEach(e => {
          const parts = e.split('=')
          if (parts[0] in view) {
            view[parts[0] as 'year'] = (parts[0] === 'year' ? +parts[1] : parts[1]) as number
          }
        })
    }
    return view
  }, [])
  const [view, setView] = useState<ViewDef>(urlParams)
  const updateView = (action: {key: 'year'; value: number} | {key: 'sector'; value: string}) => {
    const newView = {...view, [action.key]: action.value}
    updateUrlParams(newView)
    setView(newView)
  }
  const [map, setMap] = useState<{shapes: GeoJSON; info: {[index: string]: {[index: string]: string}}} | null>(null)
  useEffect(() => {
    fetch(PREFIX + 'counties_2010.geojson').then(async res => {
      const shapes = (await res.json()) as GeoJSON
      const info: {[index: string]: {[index: string]: string}} = {}
      shapes.features.forEach(e => {
        info[e.properties.geoid as string] = e.properties
      })
      setMap({shapes, info})
    })
  }, [])
  const selection = useMemo(() => {
    const sectors = dataByYear.sector
    const sectorIndex = dataByYear.sector.findIndex(s => s === view.sector)
    const data: DataEntry[] = []
    Object.keys(dataByYear).forEach((county, index) => {
      if (county !== 'sector') {
        data.push({
          name: county,
          label: map && county in map.info ? map.info[county].region_name : county,
          value: (dataByYear[county] as number[])[sectorIndex],
          index,
          sectors: dataByYear[county]
            .map((v, i) => {
              return {label: sectors[i] in sectorLabels ? sectorLabels[sectors[i]] : sectors[i], value: v as number}
            })
            .sort(byValue),
        })
      }
    })
    return data.sort(byValue)
  }, [dataByYear, view.sector, map])
  useEffect(() => {
    if (view.year >= MIN_YEAR && view.year <= MAX_YEAR) {
      if (view.year in dataCache.by_year) {
        setDataByYear(dataCache.by_year[view.year])
      } else {
        fetch(PREFIX + 'data/by_year/' + view.year + '.json').then(async res => {
          dataCache.by_year[view.year] = await res.json()
          setDataByYear(dataCache.by_year[view.year])
        })
      }
    }
  }, [view.year])
  useEffect(() => {
    if (view.sector in dataCache.by_sector) {
      setDataBySector(dataCache.by_sector[view.sector])
    } else {
      fetch(PREFIX + 'data/by_sector/' + view.sector + '.json').then(async res => {
        dataCache.by_sector[view.sector] = await res.json()
        setDataBySector(dataCache.by_sector[view.sector])
      })
    }
  }, [view.sector])
  const sectorOptions = useMemo(() => {
    return dataByYear.sector.map(s => {
      return {
        id: s,
        label: s in sectorLabels ? `${s === defaultView.sector ? '' : '(' + s + ') '}${sectorLabels[s]}` : s,
      }
    })
  }, [dataByYear.sector])
  const yearRange = useMemo(() => {
    return [Math.min(...dataBySector.year), Math.max(...dataBySector.year)]
  }, [dataBySector.year])
  const isDark = mode === 'dark'
  return map ? (
    <Box sx={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, overflow: 'hidden'}}>
      <Stack direction="row" sx={{height: '100%'}}>
        <Card
          sx={{
            width: MENU_WIDTH + 'px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Public sx={{position: 'absolute', height: '2.7em', width: '2.7em', p: 1}} />
          <CardHeader title="Industry Atlas" sx={{pl: 8, '& .MuiCardHeader-title': {fontFamily: 'monospace'}}} />
          <CardContent sx={{height: '100%', overflow: 'hidden'}}>
            <Stack spacing={2} sx={{height: '100%'}}>
              <Stack direction="row">
                <IconButton
                  onClick={() => updateView({key: 'year', value: yearRange[0]})}
                  disabled={view.year === yearRange[0]}
                  aria-label="jump to first year"
                >
                  <FirstPage />
                </IconButton>
                <IconButton
                  onClick={() => {
                    if (view.year > yearRange[0]) {
                      updateView({key: 'year', value: view.year - 1})
                    }
                  }}
                  disabled={view.year === yearRange[0]}
                  aria-label="go to previous year"
                >
                  <ChevronLeft />
                </IconButton>
                <TextField
                  sx={{mr: 1, ml: 1}}
                  value={view.year}
                  label="Year"
                  onChange={e => updateView({key: 'year', value: +e.target.value})}
                  size="small"
                  type="number"
                  slotProps={{htmlInput: {min: 1975, max: 2016, step: 1}}}
                  fullWidth
                >
                  {view.year}
                </TextField>
                <IconButton
                  onClick={() => {
                    if (view.year < yearRange[1]) {
                      updateView({key: 'year', value: view.year + 1})
                    }
                  }}
                  disabled={view.year === yearRange[1]}
                  aria-label="go to next year"
                >
                  <ChevronRight />
                </IconButton>
                <IconButton
                  onClick={() => updateView({key: 'year', value: yearRange[1]})}
                  disabled={view.year === yearRange[1]}
                  aria-label="jump to first year"
                >
                  <LastPage />
                </IconButton>
              </Stack>
              <Autocomplete
                size="small"
                fullWidth
                options={sectorOptions}
                value={sectorOptions.find(e => e.id === view.sector) || {id: '', label: ''}}
                onChange={(_, value) => updateView({key: 'sector', value: value.id || defaultView.sector})}
                renderInput={params => <TextField {...params} label="Sector" />}
                disableClearable
              />
              <DataGrid
                sx={{minHeight: '140px'}}
                getRowId={r => r.name}
                columns={[
                  {field: 'label', headerName: 'County', width: MENU_WIDTH - 149},
                  {field: 'value', headerName: 'Employed', width: 90, align: 'right'},
                ]}
                rows={selection}
                pageSizeOptions={[50]}
                initialState={{pagination: {paginationModel: {pageSize: 50}}}}
                slotProps={{pagination: {ActionsComponent: pageActions}}}
                density="compact"
                disableRowSelectionOnClick
                disableDensitySelector
                disableColumnMenu
              />
            </Stack>
          </CardContent>
          <CardActions sx={{justifyContent: 'space-around'}}>
            <IconButton
              color="inherit"
              onClick={() => setMode(isDark ? 'light' : 'dark')}
              aria-label="toggle dark mode"
            >
              {isDark ? <LightMode /> : <DarkMode />}
            </IconButton>
            <Button variant="text" color="warning" onClick={() => setView(defaultView)}>
              Reset
            </Button>
            <About />
            <Export view={view} sectors={dataByYear.sector} selection={selection} />
          </CardActions>
        </Card>
        <Stack>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: MENU_WIDTH + 'px',
            }}
          >
            <Stack sx={{height: '100%'}}>
              <Map view={view} selection={selection} map={map} />
              <Stack sx={{height: '40%'}} direction="row">
                <CountyPlot view={view} selection={selection} data={dataBySector} />
                <SectorPlot view={view} data={dataByYear} />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Box>
  ) : (
    <Backdrop open={true}>
      <Stack>
        <CircularProgress sx={{m: 'auto'}} />
        <Typography>Loading Map...</Typography>
      </Stack>
    </Backdrop>
  )
}
