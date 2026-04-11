import AddIcon from "@mui/icons-material/Add";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import {
  Alert,
  Box,
  Button,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useCVs } from "@/hooks/useCVs";
import type { CreateCVPayload, CV, UpdateCVPayload } from "@/types/cv.types";

import { CVCard } from "./CVCard";
import { CVFormModal } from "./CVFormModal";
import { cvTabStyles } from "./CVTab.styles";
import { DeleteCVDialog } from "./DeleteCVDialog";

export const CVTab = () => {
  const { t } = useTranslation();

  const { cvs, loading, error, create, update, remove, atLimit, count, limit } =
    useCVs();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCV, setEditingCV] = useState<CV | null>(null);
  const [deletingCV, setDeletingCV] = useState<CV | null>(null);

  const handleOpenEdit = (cv: CV) => {
    setEditingCV(cv);
    setModalOpen(true);
  };

  const handleSubmit = async (payload: CreateCVPayload) => {
    await create(payload);
  };

  const handleUpdate = async (payload: UpdateCVPayload) => {
    if (!editingCV) return;
    await update(editingCV.id, payload);
  };

  return (
    <Box>
      <Box sx={cvTabStyles.header}>
        <Box>
          <Typography variant="h6" fontWeight={600}>
            {t("Dashboard.CVTab.myCVs")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {count} / {limit} {t("Dashboard.CVTab.cvsUsed")}
          </Typography>
        </Box>
        <Tooltip
          title={atLimit ? t("Dashboard.CVTab.atLimitTooltip", { limit }) : ""}
        >
          <span>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                setEditingCV(null);
                setModalOpen(true);
              }}
              disabled={atLimit}
            >
              {t("Dashboard.CVTab.addCV")}
            </Button>
          </span>
        </Tooltip>
      </Box>

      {atLimit && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {t("Dashboard.CVTab.atLimitWarning", { limit })}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading && (
        <Box sx={cvTabStyles.grid}>
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} variant="rounded" height={180} />
          ))}
        </Box>
      )}

      {!loading && cvs.length === 0 && (
        <Box sx={cvTabStyles.emptyBox}>
          <DescriptionOutlinedIcon sx={cvTabStyles.emptyStateIcon} />
          <Typography color="text.secondary">
            {t("Dashboard.CVTab.noCVsYet")}
          </Typography>
          <Typography variant="body2" color="text.disabled">
            {t("Dashboard.CVTab.addFirstCV")}
          </Typography>
        </Box>
      )}

      {!loading && cvs.length > 0 && (
        <Box sx={cvTabStyles.grid}>
          {cvs.map((cv) => (
            <CVCard
              key={cv.id}
              cv={cv}
              onEdit={handleOpenEdit}
              onDelete={setDeletingCV}
            />
          ))}
        </Box>
      )}

      <CVFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        onUpdate={handleUpdate}
        editingCV={editingCV}
      />

      <DeleteCVDialog
        cv={deletingCV}
        onClose={() => setDeletingCV(null)}
        onConfirm={remove}
      />
    </Box>
  );
};
