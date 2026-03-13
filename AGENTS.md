# Code Review Rules

## ALL FILES

REJECT if:
- Hardcoded secrets/credentials (API keys, tokens, passwords)
- console.log in production code
- Empty catch blocks (silent error swallowing)
- Code duplication (DRY violation)

REQUIRE:
- Descriptive variable and function names
- Error handling on async operations

---

## TypeScript

REJECT if:
- `any` type without `// @ts-expect-error` or `// @ts-ignore` justification
- Missing return types on exported functions
- Type assertions (`as X`) without comment explaining why
- `var` keyword → use `const` or `let`

PREFER:
- `const` over `let` when value doesn't change
- Interfaces over type aliases for object shapes
- Named exports over default exports
- Explicit return types on functions

---

## CLI / Commander

REJECT if:
- Missing error handling on command execution
- No validation of required arguments
- Silent failures without user feedback

REQUIRE:
- Descriptive help text for all commands
- Proper error messages with exit codes

---

## Testing

PREFER:
- Test files co-located with source files
- Descriptive test names that explain the scenario

---

## Response Format

FIRST LINE must be exactly:
STATUS: PASSED
or
STATUS: FAILED

If FAILED, list: `file:line - rule violated - issue`
