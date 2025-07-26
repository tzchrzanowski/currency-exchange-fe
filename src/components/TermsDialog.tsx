import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

interface Props {
    onAccept: () => void
}

function TermsDialog({onAccept}: Props ) {
    return (
        <Dialog open>
            <DialogTitle>
                Terms and Conditions
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please accept our terms and conditions to proceed.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onAccept} variant="contained">
                    Accept
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default TermsDialog