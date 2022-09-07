/* eslint-disable react/display-name */
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { ReactNode, useState } from 'react'
import { ListItemType } from '../../utils/types/list'

function not(list: readonly ListItemType[], listNotIn: readonly ListItemType[]) {
  return list.filter((value) => listNotIn.findIndex((item) => item.id === value.id) === -1)
}

function intersection(list: readonly ListItemType[], listIn: readonly ListItemType[]) {
  return list.filter((value) => listIn.findIndex((item) => item.id === value.id) !== -1)
}

function union(list: readonly ListItemType[], listToUnion: readonly ListItemType[]) {
  return [...list, ...not(listToUnion, list)]
}

interface TranferListProps {
  list: ListItemType[]
  listSelected: ListItemType[]
  onChange: (selected: ListItemType[]) => void
}

const TransferList = ({ list, listSelected, onChange }: TranferListProps) => {
  const [checked, setChecked] = useState<ListItemType[]>([])
  const [left, setLeft] = useState<ListItemType[]>(list)
  const [right, setRight] = useState<ListItemType[]>(listSelected)

  const leftChecked = intersection(checked, left)
  const rightChecked = intersection(checked, right)

  const handleToggle = (value: ListItemType) => () => {
    const currentIndex = checked.findIndex((item) => item.id === value.id)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const numberOfChecked = (items: readonly ListItemType[]) => intersection(checked, items).length

  const handleToggleAll = (items: readonly ListItemType[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items))
    } else {
      setChecked(union(checked, items))
    }
  }

  const handleCheckedRight = () => {
    const rightResult = right.concat(leftChecked)
    setRight(rightResult)
    setLeft(not(left, leftChecked))
    setChecked(not(checked, leftChecked))
    onChange(rightResult)
  }

  const handleCheckedLeft = () => {
    const rightResult = not(right, rightChecked)
    setLeft(left.concat(rightChecked))
    setRight(rightResult)
    setChecked(not(checked, rightChecked))
    onChange(rightResult)
  }

  const customList = (title: ReactNode, items: readonly ListItemType[]) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selecionado`}
      />
      <Divider />
      <List
        sx={{
          width: 200,
          height: 230,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component='div'
        role='list'
      >
        {items.map((value: ListItemType) => {
          const labelId = `transfer-list-all-item-${value}-label`

          return (
            <ListItem key={value.id} role='listitem' button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.label} />
            </ListItem>
          )
        })}
        <ListItem />
      </List>
    </Card>
  )

  return (
    <Grid container spacing={2} justifyContent='center' alignItems='center'>
      <Grid item>{customList('', left)}</Grid>
      <Grid item>
        <Grid container direction='column' alignItems='center'>
          <Button
            sx={{ my: 0.5 }}
            variant='outlined'
            size='small'
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label='move selected right'
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant='outlined'
            size='small'
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label='move selected left'
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('', right)}</Grid>
    </Grid>
  )
}

export default TransferList
