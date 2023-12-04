import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const MyPopup = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // Automatically open the dialog when the component mounts
    setOpen(true);
  }, []);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Popup Title</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is your auto-opened popup content. You can customize it with your own Material-UI components.
          </DialogContentText>
          {/* Add your custom content here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          {/* You can add more action buttons if needed */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyPopup;
