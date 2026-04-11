import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { type Application } from "@/types/application.types";

import { applicationsTableStyles } from "./ApplicationsTable.styles";
import { ApplicationTableRow } from "./ApplicationTableRow";

interface IProps {
  applications: Application[];
  onEdit: (app: Application) => void;
  onDelete: (app: Application) => void;
}

export const ApplicationsTable = ({
  applications,
  onEdit,
  onDelete,
}: IProps) => {
  const { t } = useTranslation();

  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={applicationsTableStyles.tableContainer}
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>{t("Dashboard.ApplicationsTab.company")}</strong>
            </TableCell>
            <TableCell>
              <strong>{t("Dashboard.ApplicationsTab.jobTitle")}</strong>
            </TableCell>
            <TableCell>
              <strong>{t("Dashboard.ApplicationsTab.status")}</strong>
            </TableCell>
            <TableCell>
              <strong>{t("Dashboard.ApplicationsTab.dateApplied")}</strong>
            </TableCell>
            <TableCell>
              <strong>{t("Dashboard.ApplicationsTab.links")}</strong>
            </TableCell>
            <TableCell align="right">
              <strong>{t("Dashboard.ApplicationsTab.actions")}</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applications.map((app) => (
            <ApplicationTableRow
              key={app.id}
              app={app}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
