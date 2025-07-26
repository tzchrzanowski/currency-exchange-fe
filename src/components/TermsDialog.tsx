import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Props {
    onAccept: () => void
}

function TermsDialog({onAccept}: Props ) {
    const { t } = useTranslation();

    return (
        <Dialog open>
            <DialogTitle>
                {t('terms_header')}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {t('terms_description')}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onAccept} variant="contained">
                    {t('accept')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default TermsDialog