# InvoiceMe Roadmap

This roadmap outlines near-term and medium-term improvements for the InvoiceMe business management system.

## Planned Features

### 1. In-Memory Cache for customer list and tax lookup
- Add lightweight in-memory caching for frequently accessed read endpoints.
- Prioritize caching for the customer list and tax lookup operations that are repeatedly queried.
- Use short TTL values to balance freshness and performance.
- Invalidate cache entries on create, update, and delete actions.

### 2. MailTo feature for invoice delivery
- Add a MailTo action that opens the user's default mail client with the invoice details pre-filled when a customer has an email address.
- Support sending invoices directly to customers from the invoice view or generated PDF page.
- Include customer email validation and fallback behavior for missing email addresses.

### 3. Redis dependency to complement cache
- Introduce Redis as an optional production-grade caching layer.
- Use Redis for shared cache state across multiple app instances.
- Keep the application architecture flexible by supporting both in-memory local caching and Redis-backed caching.
- Configure TTLs, invalidation, and connection handling through environment variables.

## Short-Term Priorities

### High-value improvements
- Add caching for the customer listing endpoint to reduce repeated database reads.
- Add tax lookup caching, since tax rates are relatively static and can be reused frequently.
- Improve invoice actions so users can quickly send or share invoices by email.

### Operational improvements
- Add environment-based configuration for cache settings.
- Add graceful handling for cache misses and Redis connection failures.
- Add monitoring for API latency and database load.

## Notes

This project is already structured as a small Express + MongoDB API with a React frontend, so the most immediate value is in reducing repeated read queries and improving invoice workflow efficiency rather than large architectural rewrites.
