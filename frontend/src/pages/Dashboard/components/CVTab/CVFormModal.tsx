import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

import type {
  CreateCVPayload,
  CV,
  CVFormState,
  UpdateCVPayload,
} from "@/types/cv.types";

interface IProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateCVPayload) => Promise<void>;
  onUpdate: (payload: UpdateCVPayload) => Promise<void>;
  editingCV?: CV | null;
}

const emptyForm: CVFormState = {
  name: "",
  version_label: "",
  notes: "",
  is_default: false,
  file: null,
};

export const CVFormModal = ({
  open,
  onClose,
  onSubmit,
  onUpdate,
  editingCV,
}: IProps) => {
  const [form, setForm] = useState<CVFormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingCV) {
      setForm({
        name: editingCV.name,
        version_label: editingCV.version_label ?? "",
        notes: editingCV.notes ?? "",
        is_default: editingCV.is_default,
        file: null,
      });
    } else {
      setForm(emptyForm);
    }
    setError(null);
  }, [editingCV, open]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      return;
    }
    if (file.size > 1 * 1024 * 1024) {
      setError("File must be under 1MB.");
      return;
    }
    setError(null);
    setForm((prev) => ({ ...prev, file }));
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!editingCV && !form.file) {
      setError("Please select a PDF file.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      if (editingCV) {
        await onUpdate({
          name: form.name,
          version_label: form.version_label || undefined,
          notes: form.notes || undefined,
          is_default: form.is_default,
        });
      } else {
        await onSubmit({
          file: form.file!,
          name: form.name,
          version_label: form.version_label || undefined,
          notes: form.notes || undefined,
          is_default: form.is_default,
        });
      }
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{editingCV ? "Edit CV" : "Upload CV"}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} pt={1}>
          {!editingCV && (
            <Box>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <Button
                variant="outlined"
                fullWidth
                onClick={() => fileInputRef.current?.click()}
                sx={{ py: 2, borderStyle: "dashed" }}
              >
                {form.file ? `📄 ${form.file.name}` : "Click to select a PDF"}
              </Button>
              {form.file && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  mt={0.5}
                >
                  {(form.file.size / 1024).toFixed(0)} KB
                </Typography>
              )}
            </Box>
          )}

          <TextField
            label="Name *"
            value={form.name}
            onChange={(e) =>
              setForm((prev: CVFormState) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            fullWidth
            placeholder='e.g. "Backend Engineer v2"'
            error={!!error && !form.name.trim()}
          />
          <TextField
            label="Version Label"
            value={form.version_label}
            onChange={(e) =>
              setForm((prev: CVFormState) => ({
                ...prev,
                version_label: e.target.value,
              }))
            }
            fullWidth
            placeholder='e.g. "Senior focus, 1 page"'
          />
          <TextField
            label="Notes"
            value={form.notes}
            onChange={(e) =>
              setForm((prev: CVFormState) => ({
                ...prev,
                notes: e.target.value,
              }))
            }
            fullWidth
            multiline
            rows={3}
            placeholder="Any reminders about this version..."
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={form.is_default}
                onChange={(e) =>
                  setForm((prev: CVFormState) => ({
                    ...prev,
                    is_default: e.target.checked,
                  }))
                }
              />
            }
            label="Set as default CV"
          />

          {error && (
            <Box color="error.main" fontSize="0.875rem">
              {error}
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={submitting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={submitting}
          startIcon={submitting ? <CircularProgress size={16} /> : null}
        >
          {editingCV ? "Save Changes" : "Upload CV"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
