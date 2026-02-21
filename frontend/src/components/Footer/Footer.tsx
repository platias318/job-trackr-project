import { Box, Container, Divider, Link, Typography } from "@mui/material";

import { footerStyles } from "./Footer.styles";

const currentYear = new Date().getFullYear();

const footerLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Contact", href: "mailto:platiaskostas318@gmail.com" },
];

export const Footer = () => (
  <Box component="footer" mt="auto">
    <Divider />
    <Container maxWidth="lg">
      <Box sx={footerStyles.inner}>
        <Typography variant="body2" color="text.secondary">
          © {currentYear} Job Trackr Project. All rights reserved.
        </Typography>
        <Box sx={footerStyles.links}>
          {footerLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              underline="hover"
              color="text.secondary"
              variant="body2"
            >
              {label}
            </Link>
          ))}
        </Box>
      </Box>
    </Container>
  </Box>
);
