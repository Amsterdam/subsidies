import { createMemoryHistory } from "history";
import CustomRouter from "./CustomRouter";
import { ThemeProvider } from "@amsterdam/asc-ui";

export const history = createMemoryHistory();

export const withTheme = (Component) => {
  return (
    <ThemeProvider>
      <CustomRouter history={history}>{Component}</CustomRouter>
    </ThemeProvider>
  );
};
