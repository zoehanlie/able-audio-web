import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Locale-aware drop-in replacements for next/link + next/navigation.
// Use THESE in components so links keep the current /en or /zh prefix.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
