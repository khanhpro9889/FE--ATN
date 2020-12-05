import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Wrapper } from './styles';

const DialogConfirmDelete = ({openDialog, handleCloseDialog, handleAgree, handleDisagree}) => {
    return (
        <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <Wrapper>
                <DialogTitle id="alert-dialog-title">Xác nhận xóa?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn có thực sự muốn xóa?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        handleAgree();
                        handleCloseDialog();
                    }} color="primary" autoFocus>
                        Đồng ý
                    </Button>
                    <Button onClick={handleDisagree} color="primary">
                        Hủy
                    </Button>
                </DialogActions>
            </Wrapper>
        </Dialog>
    );
};

export default DialogConfirmDelete;