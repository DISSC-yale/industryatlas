import {Close} from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  Typography,
} from '@mui/material'
import {useState} from 'react'
import {DATA_VERSION, DataEntry, ViewDef} from './data'

export function Export({view, sectors, selection}: {view: ViewDef; sectors: string[]; selection: DataEntry[]}) {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(!open)

  const [allSectors, setAllSector] = useState(false)
  const filename = `industryatlas${allSectors ? '' : view.sector === '10' ? '_total' : '_' + view.sector}_${
    view.year
  }_v${DATA_VERSION}.csv`
  return (
    <>
      <Button onClick={toggle} variant="outlined" size="large">
        Download
      </Button>
      {open && (
        <Dialog open={open} onClose={toggle}>
          <DialogTitle>Export</DialogTitle>
          <IconButton
            aria-label="close download dialog"
            onClick={toggle}
            sx={{
              position: 'absolute',
              right: 8,
              top: 12,
            }}
            className="close-button"
          >
            <Close />
          </IconButton>
          <DialogContent>
            <Stack spacing={1}>
              <FormControlLabel
                sx={{float: 'right'}}
                label="Include all sectors"
                labelPlacement="start"
                control={<Switch checked={allSectors} onChange={() => setAllSector(!allSectors)} />}
              />
              <Typography>
                File ({selection.length} x {allSectors ? sectors.length + 1 : 2}): <code>{filename}</code>
              </Typography>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => {
                const e = document.createElement('a')
                document.body.appendChild(e)
                e.rel = 'noreferrer'
                e.target = '_blank'
                e.download = filename
                e.href = URL.createObjectURL(
                  new Blob(
                    allSectors
                      ? [
                          'county,' +
                            sectors.join(',') +
                            '\n' +
                            selection
                              .map(e => '"' + e.name + '",' + e.sectors.map(v => (v === null ? 'NA' : v)).join(','))
                              .join('\n'),
                        ]
                      : ['county,employed\n' + selection.map(e => '"' + e.name + '",' + e.value).join('\n')],
                    {
                      type: 'text/csv; charset=utf-8',
                    }
                  )
                )
                setTimeout(function () {
                  e.dispatchEvent(new MouseEvent('click'))
                  URL.revokeObjectURL.bind(null, e.href)
                  document.body.removeChild(e)
                }, 0)
              }}
            >
              Download
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}
