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

import type { Application } from "@/types/application.types";

import { deleteApplicationDialogStyles } from "./DeleteApplicationDialog.styles";

interface IProps {
  app: Application | null;
  onClose: () => void;
  onConfirm: (id: number) => Promise<void>;
}

export const DeleteApplicationDialog = ({
  app,
  onClose,
  onConfirm,
}: IProps) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!app) return;
    setLoading(true);
    try {
      await onConfirm(app.id);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Dialog open={!!app} onClose={onClose}>
      <DialogTitle>
        {t("Dashboard.ApplicationsTab.deleteApplication")}?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t("Dashboard.ApplicationsTab.deleteApplicationSure")}{" "}
          <strong>{app?.company_name}</strong>?{" "}
          {t("Dashboard.ApplicationsTab.deleteApplicationSureUndone")}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={deleteApplicationDialogStyles.actions}>
        <Button onClick={onClose} disabled={loading}>
          {t("Dashboard.ApplicationsTab.cancel")}
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={handleConfirm}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} /> : null}
        >
          {t("Dashboard.ApplicationsTab.delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
