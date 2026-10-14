import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        environment: "node",
        // Tells vitest to load this file before anything else
        // Which we need to have enviroment vars properly loaded
        setupFiles: ["./utils/supabase/setuptests.ts"],
    },
});