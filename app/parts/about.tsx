import {Close} from '@mui/icons-material'
import {Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography} from '@mui/material'
import Link from 'next/link'
import {useState} from 'react'
import {DATA_VERSION} from './data'

export function About() {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(!open)
  return (
    <>
      <Button onClick={toggle} variant="outlined" size="large">
        About
      </Button>
      {open && (
        <Dialog open={open} onClose={toggle}>
          <DialogTitle>About</DialogTitle>
          <IconButton
            aria-label="close about dialog"
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
              <Typography>
                This site is a rework of{' '}
                <Link href="https://github.com/kenny101/industryatlas" rel="noreferrer" target="_blank">
                  industryatlas.org
                </Link>
                .
              </Typography>
              <Typography>
                It is built around the same{' '}
                <Link href="https://www.fpeckert.me/cbp/" rel="noreferrer" target="_blank">
                  County Business Patterns Database
                </Link>{' '}
                as of {DATA_VERSION}, which was created as part of the{' '}
                <Link href="https://www.nber.org/papers/w26632" rel="noreferrer" target="_blank">
                  Imputing Missing Values in the US Census Bureau&apos;s County Business Patterns
                </Link>{' '}
                paper.
              </Typography>
              <Typography>
                It was made by the Yale{' '}
                <Link href="https://dissc.yale.edu/" rel="noreferrer" target="_blank">
                  Data Intensive Social Science Center
                </Link>
                .
              </Typography>
              <Typography>
                View its source at{' '}
                <Link href="https://github.com/dissc-yale/industryatlas" rel="noreferrer" target="_blank">
                  dissc-yale/industryatlas
                </Link>
                .
              </Typography>
            </Stack>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
