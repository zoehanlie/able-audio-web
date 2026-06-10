import type { ReactNode } from 'react';

// A `template` (unlike `layout`) re-renders on every route change, so this
// wrapper replays its CSS animation each navigation = simple page transition.
// Upgrade path: enable React/Next View Transitions for shared-element morphs.
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-transition">{children}</div>;
}
