
# Environment Variables Setup

This file documents the environment variables used in this project.

## Required Environment Variables

Copy the values from `.env.example` to a new file called `.env.local` for local development. The `.env.local` file should not be committed to version control.

```
VITE_APP_VERSION=1.0.0
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Feature Flags

The application uses environment-based feature flags that can be configured in the `src/config/index.ts` file. These flags automatically adjust based on the current environment:

- `enableAnalytics`: Enabled only in production
- `enableNewUI`: Enabled only in development for testing new features
- `debugMode`: Enabled only in development

## Configuration Steps

1. Create a `.env.local` file in the root directory
2. Copy the variables from `.env.example` and fill in your values
3. For production deployment, set these environment variables in your hosting platform

## Security Notes

- Never commit `.env.local` or any file containing actual credentials
- Use environment-specific variables for different environments (development, staging, production)
- Regularly rotate keys and update environment variables

