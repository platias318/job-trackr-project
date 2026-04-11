import type { SxProps, Theme } from "@mui/material";

interface IApplicationsTableStyles {
  tableContainer: SxProps<Theme>;
}
export const applicationsTableStyles: IApplicationsTableStyles = {
  tableContainer: {
    borderRadius: 2,
    border: "1px solid",
    borderColor: "divider",
  },
};
