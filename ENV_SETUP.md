
# Environment Variables Setup

This file documents the environment variables used in this project.

## Required Environment Variables

Copy the values from `.env` to a new file called `.env.local` for local development. The `.env.local` file should not be committed to version control.

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Configuration Steps

1. Create a `.env.local` file in the root directory
2. Copy the variables from `.env.example` and fill in your values
3. For production deployment, set these environment variables in your hosting platform

## Security Notes

- Never commit `.env.local` or any file containing actual credentials
- Use environment-specific variables for different environments (development, staging, production)
- Regularly rotate keys and update environment variables
