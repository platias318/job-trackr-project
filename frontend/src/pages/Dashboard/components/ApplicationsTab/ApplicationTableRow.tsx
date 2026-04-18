import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LinkIcon from "@mui/icons-material/Link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {
  Box,
  Chip,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { type Application, STATUS_META } from "@/types/application.types";

import { applicationTableRowStyles } from "./ApplicationTableRow.styles";

interface IProps {
  app: Application;
  onEdit: (app: Application) => void;
  onDelete: (app: Application) => void;
}

export const ApplicationTableRow = ({ app, onEdit, onDelete }: IProps) => {
  const { t } = useTranslation();

  const meta = STATUS_META[app.status];

  return (
    <TableRow hover>
      <TableCell align="center">
        <Typography variant="body2" sx={applicationTableRowStyles.companyName}>
          {app.company_name}
        </Typography>
      </TableCell>

      <TableCell align="center">
        <Typography variant="body2">{app.job_title}</Typography>
      </TableCell>

      <TableCell align="center">
        <Chip
          label={`${meta.emoji} ${app.status}`}
          size="small"
          sx={{
            ...applicationTableRowStyles.statusChip,
            backgroundColor: meta.color + "22",
            color: meta.color,
            border: `1px solid ${meta.color}44`,
          }}
        />
      </TableCell>

      <TableCell align="center">
        <Typography variant="body2" color="text.secondary">
          {new Date(app.date_applied).toLocaleDateString()}
        </Typography>
      </TableCell>

      <TableCell align="center">
        {app.notes ? (
          <Tooltip title={app.notes} arrow placement="top">
            <InfoOutlinedIcon
              sx={{ fontSize: 18, color: "text.secondary", cursor: "pointer" }}
            />
          </Tooltip>
        ) : (
          <Typography variant="caption" color="text.disabled">
            —
          </Typography>
        )}
      </TableCell>

      <TableCell align="center">
        <Box display="flex" justifyContent="center" gap={0.5}>
          {app.job_link && (
            <Tooltip title={t("Dashboard.ApplicationsTab.jobPostTooltip")}>
              <IconButton
                size="small"
                href={app.job_link}
                target="_blank"
                rel="noopener"
              >
                <LinkIcon sx={applicationTableRowStyles.linkIcon} />
              </IconButton>
            </Tooltip>
          )}
          {app.linkedin_link && (
            <Tooltip title={t("Dashboard.ApplicationsTab.linkedInTooltip")}>
              <IconButton
                size="small"
                href={app.linkedin_link}
                target="_blank"
                rel="noopener"
              >
                <LinkedInIcon sx={applicationTableRowStyles.linkedInIcon} />
              </IconButton>
            </Tooltip>
          )}
          {!app.job_link && !app.linkedin_link && (
            <Typography variant="caption" color="text.disabled">
              —
            </Typography>
          )}
        </Box>
      </TableCell>

      <TableCell align="right">
        <Tooltip title={t("Dashboard.ApplicationsTab.editTooltip")}>
          <IconButton size="small" onClick={() => onEdit(app)}>
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title={t("Dashboard.ApplicationsTab.delete")}>
          <IconButton size="small" color="error" onClick={() => onDelete(app)}>
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};
