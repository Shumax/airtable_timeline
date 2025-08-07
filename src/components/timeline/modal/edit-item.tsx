"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@mui/material"

interface EditItemProps {
  open: boolean
  onClose: () => void
  onSave: (newName: string) => void
  defaultName: string
}

export default function EditItem({ open, onClose, onSave, defaultName }: EditItemProps) {
  const [editedName, setEditedName] = useState(defaultName)

  useEffect(() => {
    setEditedName(defaultName)
  }, [defaultName])

  function handleSave() {
    onSave(editedName)
  }
  
  return (
    <Dialog open={open} onClose={onClose} >
      <DialogTitle>Edit Item Name</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          label="Name"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
