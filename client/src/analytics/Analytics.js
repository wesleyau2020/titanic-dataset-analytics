import React from "react";

// MUI
import { Box, Stack, CssBaseline, Card, CardContent } from "@mui/material";

// Components
import AppNavbar from "../dashboard/components/AppNavbar";
import Header from "../dashboard/components/Header";
import SideMenu from "../dashboard/components/SideMenu";
import AppTheme from "../shared-theme/AppTheme";

import useTitanicData from "./hooks/useTitanicData";
import SurvivorsChart from "./components/SurvivorsChart";

export default function App(props) {
  const { data, ageGroups } = useTitanicData();

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <AppNavbar />
        <Box component="main" sx={{ flexGrow: 1, overflow: "auto" }}>
          <Stack spacing={2} sx={{ mx: 3, pb: 5, mt: { xs: 8, md: 0 } }}>
            <Header />
            <Card variant="outlined" sx={{ width: "100%" }}>
              <CardContent>
                <SurvivorsChart
                  data={data}
                  ageGroups={ageGroups}
                  sx={{ height: "100%", width: "100%" }}
                />
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
