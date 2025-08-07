"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
    <Dialog 
      open={open} 
      onClose={onClose} 
      slotProps={{
        paper: {
          className: "rounded-xl bg-white p-4 shadow-lg",
          style: { minWidth: 320 }
        }
      }}
    >
      <DialogTitle className="font-bold text-lg pb-0">Edit Item Name</DialogTitle>
      <DialogContent className="pt-2 pb-4">
        <TextField
          autoFocus
          fullWidth
          label="Name"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          margin="dense"
          slotProps={{
            input: {
              className: "rounded-md bg-gray-100"
            }
          }}
        />
      </DialogContent>
      <DialogActions className="flex justify-end gap-2 pb-2">
        <button 
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium"
        >
          Cancel
        </button>
        <button 
          type="button"
          onClick={handleSave} 
          className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium"
        >
          Save
        </button>
      </DialogActions>
    </Dialog>
  )
}
