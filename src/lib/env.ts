import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().url(),
		GITHUB_ID: z.string().min(1),
		GITHUB_SECRET: z.string().min(1)
	},
	client: {
		// Nothing here yet
	},
	experimental__runtimeEnv: {
		// Nothing here yet, we just need to put client env here
	}
});
