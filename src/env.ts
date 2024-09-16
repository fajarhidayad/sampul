import { ZodError, z } from 'zod';

const stringBoolean = z.coerce.string().transform((val) => {
  return val === 'true';
});

const EnvSchema = z.object({
  PORT: z.coerce.number(),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DB_PORT: z.coerce.number(),
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
