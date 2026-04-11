import AddIcon from "@mui/icons-material/Add";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { Alert, Box, Button, Skeleton, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useApplications } from "@/hooks/useApplications";
import {
  type Application,
  type ApplicationStatus,
  type CreateApplicationPayload,
  STATUS_TRANSLATION_KEYS,
} from "@/types/application.types";

import { ApplicationFilterBar } from "./ApplicationFilterBar";
import { ApplicationFormModal } from "./ApplicationFormModal";
import { ApplicationsTable } from "./ApplicationsTable";
import { applicationsTabStyles } from "./ApplicationTab.styles";
import { DeleteApplicationDialog } from "./DeleteApplicationDialog";

export const ApplicationsTab = () => {
  const { t } = useTranslation();

  const [activeFilter, setActiveFilter] = useState<ApplicationStatus | "All">(
    "All",
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<Application | null>(null);
  const [deletingApp, setDeletingApp] = useState<Application | null>(null);

  const {
    applications,
    loading,
    error,
    create,
    update,
    remove,
    filterByStatus,
  } = useApplications();

  const handleEdit = (app: Application) => {
    setEditingApp(app);
    setModalOpen(true);
  };

  const handleSubmit = async (payload: CreateApplicationPayload) => {
    if (editingApp) await update(editingApp.id, payload);
    else await create(payload);
  };

  const visibleApplications = filterByStatus(activeFilter);

  return (
    <Box>
      <Box sx={applicationsTabStyles.header}>
        <Box>
          <Typography variant="h6" fontWeight={600}>
            {t("Dashboard.ApplicationsTab.myApplications")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {applications.length}{" "}
            {t("Dashboard.ApplicationsTab.totalApplications")}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditingApp(null);
            setModalOpen(true);
          }}
        >
          {t("Dashboard.ApplicationsTab.addApplication")}
        </Button>
      </Box>

      <ApplicationFilterBar
        activeFilter={activeFilter}
        applications={applications}
        onChange={setActiveFilter}
      />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading && (
        <Box sx={applicationsTabStyles.skeletonStack}>
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} variant="rounded" height={52} />
          ))}
        </Box>
      )}

      {!loading && applications.length === 0 && (
        <Box sx={applicationsTabStyles.emptyBox}>
          <WorkOutlineIcon sx={applicationsTabStyles.emptyStateIcon} />
          <Typography color="text.secondary">
            {t("Dashboard.ApplicationsTab.noApplicationsYet")}
          </Typography>
          <Typography variant="body2" color="text.disabled">
            {t("Dashboard.ApplicationsTab.addFirstApplication")}
          </Typography>
        </Box>
      )}

      {!loading && applications.length > 0 && (
        <ApplicationsTable
          applications={visibleApplications}
          onEdit={handleEdit}
          onDelete={setDeletingApp}
        />
      )}

      {!loading &&
        applications.length > 0 &&
        visibleApplications.length === 0 && (
          <Box sx={applicationsTabStyles.noResultsBox}>
            <Typography color="text.secondary">
              {t("Dashboard.ApplicationsTab.noApplicationsWithStatus")} "
              {t(
                `Dashboard.ApplicationsTab.${STATUS_TRANSLATION_KEYS[activeFilter]}`,
              )}
              "
            </Typography>
          </Box>
        )}

      <ApplicationFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        editingApplication={editingApp}
      />

      <DeleteApplicationDialog
        app={deletingApp}
        onClose={() => setDeletingApp(null)}
        onConfirm={remove}
      />
    </Box>
  );
};
