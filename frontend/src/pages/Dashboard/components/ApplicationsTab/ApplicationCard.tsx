import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LinkIcon from "@mui/icons-material/Link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Box, Button, Chip, IconButton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { type Application, STATUS_META } from "@/types/application.types";

import { applicationCardStyles } from "./ApplicationCard.styles";
import { FollowUpBadge } from "./FollowUpBadge";

interface IProps {
  app: Application;
  onEdit: (app: Application) => void;
  onDelete: (app: Application) => void;
}

export const ApplicationCard = ({ app, onEdit, onDelete }: IProps) => {
  const { t } = useTranslation();

  const meta = STATUS_META[app.status];

  return (
    <Box sx={applicationCardStyles.card}>
      <Box sx={applicationCardStyles.topRow}>
        <Box minWidth={0}>
          <Typography
            variant="subtitle1"
            sx={applicationCardStyles.companyName}
          >
            {app.company_name}
          </Typography>
          <Typography variant="body2">{app.job_title}</Typography>
        </Box>
        <Chip
          label={`${meta.emoji} ${app.status}`}
          size="small"
          sx={{
            ...applicationCardStyles.statusChip,
            backgroundColor: meta.color + "22",
            color: meta.color,
            border: `1px solid ${meta.color}44`,
          }}
        />
      </Box>

      <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
        <Typography variant="caption" color="text.secondary">
          {new Date(app.date_applied).toLocaleDateString()}
        </Typography>
        {app.follow_up_date && <FollowUpBadge app={app} />}
      </Box>

      {app.notes && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={applicationCardStyles.notes}
        >
          {app.notes}
        </Typography>
      )}

      <Box sx={applicationCardStyles.actions}>
        <Box sx={applicationCardStyles.linkButtons}>
          {app.job_link && (
            <Button
              size="small"
              variant="outlined"
              startIcon={<LinkIcon />}
              href={app.job_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("Dashboard.ApplicationsTab.jobPostTooltip")}
            </Button>
          )}
          {app.linkedin_link && (
            <Button
              size="small"
              variant="outlined"
              startIcon={<LinkedInIcon />}
              href={app.linkedin_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("Dashboard.ApplicationsTab.linkedInTooltip")}
            </Button>
          )}
        </Box>
        <Box display="flex">
          <IconButton
            aria-label={t("Dashboard.ApplicationsTab.editTooltip")}
            sx={applicationCardStyles.iconButton}
            onClick={() => onEdit(app)}
          >
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            aria-label={t("Dashboard.ApplicationsTab.delete")}
            color="error"
            sx={applicationCardStyles.iconButton}
            onClick={() => onDelete(app)}
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
