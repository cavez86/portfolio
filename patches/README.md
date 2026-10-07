The `braces@3.0.3` patch mitigates GHSA-vfj7-8cjw-p6xm by rejecting patterns
with more than 100 nested brace or parenthesis AST nodes before recursive
compilation, expansion, or stringification. It throws `SyntaxError`, consistent
with the parser's existing input-length rejection. Callers accepting untrusted
patterns must handle invalid-input errors.

The limit follows the recommendation in the upstream report:
https://github.com/micromatch/braces/issues/70

No patched npm release is available as of 2026-10-07. pnpm applies this patch
through `patchedDependencies` to every installed copy. Version-based audit tools
will continue reporting 3.0.3 as vulnerable. Remove the patch after upgrading to
a verified upstream fix; retain the regression tests.
