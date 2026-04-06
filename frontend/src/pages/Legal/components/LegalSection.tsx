import { Box, Divider, Typography } from "@mui/material";

import { legalSectionStyles } from "./LegalSection.styles";

interface IProps {
  title: string;
  body: string;
}

export const LegalSection = ({ title, body }: IProps) => {
  return (
    <>
      <Divider sx={legalSectionStyles.divider} />
      <Box sx={legalSectionStyles.section}>
        <Typography variant="subtitle1" sx={legalSectionStyles.sectionTitle}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" lineHeight={1.8}>
          {body}
        </Typography>
      </Box>
    </>
  );
};
