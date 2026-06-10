// Next.js App Router auto-renders this during route transitions and as a
// Suspense fallback for any async server component below it. Matches the
// homepage console aesthetic: framed panel with neon corner brackets, a
// sequenced boot log, and a tri-color (purple -> cyan -> purple) progress bar.

export default function Loading() {
  return (
    <div className="loading-screen" role="status" aria-live="polite">
      <div className="loading-console">
        <span className="loading-status-tag">SYS_BOOT</span>

        <div className="loading-log">
          <p className="loading-line">
            <span className="loading-prompt">&gt;</span>
            <span className="loading-cmd">init --module=portfolio</span>
          </p>
          <p className="loading-line loading-line--delayed-1">
            <span className="loading-ok">[ OK ]</span>
            <span>establishing uplink</span>
          </p>
          <p className="loading-line loading-line--delayed-2">
            <span className="loading-ok">[ OK ]</span>
            <span>decrypting payload</span>
          </p>
          <p className="loading-line loading-line--delayed-3">
            <span className="loading-pending">[ .. ]</span>
            <span>rendering view</span>
            <span className="loading-cursor" aria-hidden="true">
              _
            </span>
          </p>
        </div>

        <div className="loading-bar" aria-hidden="true">
          <div className="loading-bar-fill" />
          <div className="loading-bar-sweep" />
        </div>

        <div className="loading-meta">
          <span className="loading-meta-label">SYS_LOAD</span>
          <span className="loading-meta-dim">// portfolio.jgd</span>
        </div>
      </div>
      <span className="loading-sr-only">Loading...</span>
    </div>
  );
}
