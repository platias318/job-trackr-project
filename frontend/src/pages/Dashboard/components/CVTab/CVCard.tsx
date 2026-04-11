import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import type { CV } from "@/types/cv.types";

import { cvCardStyles } from "./CVCard.styles";

interface IProps {
  cv: CV;
  onEdit: (cv: CV) => void;
  onDelete: (cv: CV) => void;
}

export const CVCard = ({ cv, onEdit, onDelete }: IProps) => {
  const { t } = useTranslation();

  return (
    <Card variant="outlined" sx={cvCardStyles.card}>
      {cv.is_default && (
        <Box sx={cvCardStyles.defaultBadge}>
          <Chip
            label={t("Dashboard.CVTab.default")}
            size="small"
            color="primary"
          />
        </Box>
      )}

      <CardContent sx={cvCardStyles.cardContent}>
        <Typography variant="h6" fontWeight={600} pr={cv.is_default ? 8 : 0}>
          {cv.name}
        </Typography>

        {cv.version_label && (
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            mt={0.5}
          >
            🏷️ {cv.version_label}
          </Typography>
        )}

        {cv.notes && (
          <Typography
            variant="body2"
            color="text.secondary"
            mt={1.5}
            sx={cvCardStyles.notesText}
          >
            {cv.notes}
          </Typography>
        )}

        <Typography
          variant="caption"
          color="text.disabled"
          display="block"
          mt={2}
        >
          {t("Dashboard.CVTab.added")}{" "}
          {new Date(cv.created_at).toLocaleDateString()}
        </Typography>
      </CardContent>

      <CardActions sx={cvCardStyles.cardActions}>
        {cv.file_url && (
          <Tooltip title={t("Dashboard.CVTab.viewPDF")}>
            <Button
              size="small"
              startIcon={<PictureAsPdfIcon />}
              href={cv.file_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("Dashboard.CVTab.view")}
            </Button>
          </Tooltip>
        )}
        <Tooltip title={t("Dashboard.CVTab.edit")}>
          <IconButton size="small" onClick={() => onEdit(cv)}>
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title={t("Dashboard.CVTab.delete")}>
          <IconButton size="small" color="error" onClick={() => onDelete(cv)}>
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};
