import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import type { CV } from "@/types/cv.types";

import { deleteCVDialogStyles } from "./DeleteCVDialog.styles";

interface IProps {
  cv: CV | null;
  onClose: () => void;
  onConfirm: (id: number) => Promise<void>;
}

export const DeleteCVDialog = ({ cv, onClose, onConfirm }: IProps) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!cv) return;
    setLoading(true);
    try {
      await onConfirm(cv.id);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Dialog open={!!cv} onClose={onClose}>
      <DialogTitle>{t("Dashboard.CVTab.deleteCV")}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t("Dashboard.CVTab.deleteCVSure")} <strong>{cv?.name}</strong>?{" "}
          {t("Dashboard.CVTab.deleteCVSureUndone")}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={deleteCVDialogStyles.actions}>
        <Button onClick={onClose} disabled={loading}>
          {t("Dashboard.CVTab.cancel")}
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={handleConfirm}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} /> : null}
        >
          {t("Dashboard.CVTab.delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
