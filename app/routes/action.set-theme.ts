import { createThemeAction } from "remix-themes";

import { themeSessionResolver } from "~/sessionstheme.server";

export const action = createThemeAction(themeSessionResolver);
