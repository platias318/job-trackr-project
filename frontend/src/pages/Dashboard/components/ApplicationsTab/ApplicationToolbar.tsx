import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { SORT_OPTIONS, type SortOption } from "@/utils/applicationList";

import { applicationToolbarStyles } from "./ApplicationToolbar.styles";

interface IProps {
  query: string;
  sort: SortOption;
  onQueryChange: (value: string) => void;
  onSortChange: (value: SortOption) => void;
}

export const ApplicationToolbar = ({
  query,
  sort,
  onQueryChange,
  onSortChange,
}: IProps) => {
  const { t } = useTranslation();

  return (
    <Box sx={applicationToolbarStyles.root}>
      <TextField
        size="small"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder={t("Dashboard.ApplicationsTab.searchPlaceholder")}
        sx={applicationToolbarStyles.search}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: query ? (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  aria-label={t("Dashboard.ApplicationsTab.clearSearch")}
                  onClick={() => onQueryChange("")}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : undefined,
          },
        }}
      />
      <TextField
        select
        size="small"
        value={sort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        label={t("Dashboard.ApplicationsTab.sortBy")}
        sx={applicationToolbarStyles.sort}
      >
        {SORT_OPTIONS.map((option) => (
          <MenuItem key={option} value={option}>
            {t(`Dashboard.ApplicationsTab.sort.${option}`)}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};
