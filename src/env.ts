import { ZodError, z } from 'zod';

const stringBoolean = z.coerce.string().transform((val) => {
  return val === 'true';
});

const EnvSchema = z.object({
  ENV_MODE: z.string(),
  PORT: z.coerce.number(),
  DB_URL: z.string(),
  DB_AUTH_TOKEN: z.string(),
  DB_MIGRATE: stringBoolean,
  JWT_SECRET: z.string(),
  COOKIE_SECRET: z.string(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

try {
  EnvSchema.parse(process.env);
} catch (error) {
  if (error instanceof ZodError) {
    let message = 'Missing required values in .env files:\n';
    error.issues.forEach((issue) => {
      message += issue.path[0] + '\n';
    });
    const err = new Error(message);
    err.stack = '';
    throw err;
  } else {
    console.error(error);
  }
}

export default EnvSchema.parse(process.env);
