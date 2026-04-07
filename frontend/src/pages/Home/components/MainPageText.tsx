import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { mainPageTextStyles } from "./MainPageText.styles";

export const MainPageText = () => {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h4" gutterBottom sx={mainPageTextStyles.heading}>
        {t("HomePage.trackApplications")}
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={mainPageTextStyles.subtitle}
      >
        {t("HomePage.signInToGetStarted")}
      </Typography>
    </>
  );
};
