import type { SxProps, Theme } from "@mui/material";

interface IApplicationsTableStyles {
  tableContainer: SxProps<Theme>;
  cardList: SxProps<Theme>;
}
export const applicationsTableStyles: IApplicationsTableStyles = {
  tableContainer: {
    borderRadius: 2,
    border: "1px solid",
    borderColor: "divider",
  },
  cardList: {
    display: "flex",
    flexDirection: "column",
    gap: 1.5,
  },
};
