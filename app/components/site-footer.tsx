type SiteFooterProps = {
  showSignature?: boolean;
};

export function SiteFooter({ showSignature = false }: SiteFooterProps) {
  return (
    <>
      {showSignature ? (
        <div className="container">
          <img
            src="/assets/signature.svg"
            alt="Leo Driesch signature"
            className="signature"
          />
        </div>
      ) : null}

      <footer>
        <div className="container">
          <p>&copy; 2026 Leo Driesch</p>
          <div className="footer-links">
            <a
              href="https://github.com/leodr"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://x.com/leodriesch"
              target="_blank"
              rel="noopener noreferrer"
            >
              X
            </a>
            <a href="mailto:hi@leodriesch.com">Email</a>
          </div>
        </div>
      </footer>
    </>
  );
}
