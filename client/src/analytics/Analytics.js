import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";

// MUI
import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

// Components
import AppNavbar from "../dashboard/components/AppNavbar";
import Header from "../dashboard/components/Header";
import SideMenu from "../dashboard/components/SideMenu";
import AppTheme from "../shared-theme/AppTheme";

import useTitanicData from "./hooks/useTitanicData";
import SurvivorsChart from "./components/SurvivorsChart";

export default function App(props) {
  const { data, processAgeGroups, ageGroups } = useTitanicData();
  const transformedData = processAgeGroups(data);
  
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <AppNavbar />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto",
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <Box
              sx={{
                width: "100%",
                // maxWidth: 800,
                height: 450,
              }}
            >
              <SurvivorsChart
                transformedData={transformedData}
                ageGroups={ageGroups}
              />
            </Box>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
