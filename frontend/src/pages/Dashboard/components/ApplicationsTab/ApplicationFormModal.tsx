import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  type Application,
  APPLICATION_STATUSES,
  type ApplicationStatus,
  type CreateApplicationPayload,
} from "@/types/application.types";

interface IProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateApplicationPayload) => Promise<void>;
  editingApplication?: Application | null;
}

const today = new Date().toISOString().split("T")[0];

const emptyForm: CreateApplicationPayload = {
  company_name: "",
  job_title: "",
  status: "Applied",
  date_applied: today,
  job_link: "",
  linkedin_link: "",
  notes: "",
};

export const ApplicationFormModal = ({
  open,
  onClose,
  onSubmit,
  editingApplication,
}: IProps) => {
  const { t } = useTranslation();

  const [form, setForm] = useState<CreateApplicationPayload>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingApplication) {
      setForm({
        company_name: editingApplication.company_name,
        job_title: editingApplication.job_title,
        status: editingApplication.status,
        date_applied: editingApplication.date_applied.split("T")[0],
        job_link: editingApplication.job_link ?? "",
        linkedin_link: editingApplication.linkedin_link ?? "",
        notes: editingApplication.notes ?? "",
      });
    } else {
      setForm(emptyForm);
    }
    setError(null);
  }, [editingApplication, open]);

  const set =
    (field: keyof CreateApplicationPayload) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.company_name.trim() || !form.job_title.trim()) {
      setError("Company name and job title are required.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit({
        ...form,
        job_link: form.job_link || undefined,
        linkedin_link: form.linkedin_link || undefined,
        notes: form.notes || undefined,
      });
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const notesLength = form.notes?.length ?? 0;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {editingApplication
          ? t("Dashboard.ApplicationsTab.editApplication")
          : t("Dashboard.ApplicationsTab.addApplication")}
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} pt={1}>
          <TextField
            label={t(
              "Dashboard.ApplicationsTab.AddDeleteApplicationDialog.companyName",
            )}
            value={form.company_name}
            onChange={set("company_name")}
            fullWidth
          />
          <TextField
            label={t(
              "Dashboard.ApplicationsTab.AddDeleteApplicationDialog.jobTitle",
            )}
            value={form.job_title}
            onChange={set("job_title")}
            fullWidth
          />
          <TextField
            select
            label={t(
              "Dashboard.ApplicationsTab.AddDeleteApplicationDialog.status",
            )}
            value={form.status}
            fullWidth
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                status: e.target.value as ApplicationStatus,
              }))
            }
          >
            {APPLICATION_STATUSES.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label={t(
              "Dashboard.ApplicationsTab.AddDeleteApplicationDialog.dateApplied",
            )}
            type="date"
            value={form.date_applied}
            onChange={set("date_applied")}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label={t(
              "Dashboard.ApplicationsTab.AddDeleteApplicationDialog.jobPostLink",
            )}
            value={form.job_link}
            onChange={set("job_link")}
            fullWidth
            placeholder="https://..."
          />
          <TextField
            label={t(
              "Dashboard.ApplicationsTab.AddDeleteApplicationDialog.linkedInLink",
            )}
            value={form.linkedin_link}
            onChange={set("linkedin_link")}
            fullWidth
            placeholder="https://linkedin.com/jobs/..."
          />
          <Box>
            <TextField
              label={t(
                "Dashboard.ApplicationsTab.AddDeleteApplicationDialog.notes",
              )}
              value={form.notes}
              onChange={set("notes")}
              fullWidth
              multiline
              rows={3}
              inputProps={{ maxLength: 500 }}
              placeholder={t(
                "Dashboard.ApplicationsTab.AddDeleteApplicationDialog.notesAboutApplication",
              )}
            />
            <Typography
              variant="caption"
              color={notesLength > 450 ? "warning.main" : "text.disabled"}
              display="block"
              textAlign="right"
            >
              {notesLength} / 500
            </Typography>
          </Box>
          {error && (
            <Box color="error.main" fontSize="0.875rem">
              {error}
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={submitting}>
          {t("Dashboard.ApplicationsTab.cancel")}
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={submitting}
          startIcon={submitting ? <CircularProgress size={16} /> : null}
        >
          {editingApplication
            ? t(
                "Dashboard.ApplicationsTab.AddDeleteApplicationDialog.saveChanges",
              )
            : t("Dashboard.ApplicationsTab.addApplication")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
