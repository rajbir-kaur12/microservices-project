# Security Policy

## Supported Versions

The table below lists the versions of this project that are actively supported with security updates.

| Version  | Supported          |
| -------- | ------------------ |
| 1.0.x    | Yes                |
| 0.9.x    | No                 |
| < 0.9    | No                 |

---

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly to help protect users and the community.

### How to Report
- Email: **security@example.com**
- Subject line: **Security Vulnerability Report – [Project Name]**
- Include:
  - A detailed description of the vulnerability.
  - Steps to reproduce the issue.
  - Proof-of-concept code or screenshots (if applicable).

### Guidelines
- **Do not disclose** the vulnerability publicly until it has been confirmed and patched.
- Do not attempt to exploit the vulnerability beyond the scope needed to prove its existence.

---

## Response Process

1. **Acknowledgment** – We will acknowledge your report within **48 hours**.
2. **Assessment** – We will assess the severity within **7 business days**.
3. **Fix** – If confirmed, we will prioritize a fix depending on severity.
4. **Disclosure** – Once fixed, we will:
   - Publish a security advisory.
   - Credit you for responsible disclosure (unless you wish to remain anonymous).

---

## Security Best Practices

We recommend that contributors and maintainers follow these best practices:

- Validate and sanitize **all** user input.
- Use **HTTPS** for all internal and external communications.
- Never commit secrets (API keys, credentials, certificates) to source control.
- Keep dependencies updated and regularly audit them for vulnerabilities.
- Apply the **Principle of Least Privilege** for database, API, and system access.
- Use environment variables for configuration instead of hardcoding sensitive data.

---

**Thank you for helping us keep this project secure.**
