# Elmenov

A TypeScript workspace for reusable types, structures, and utilities.

## Packages

| Package | Contents |
| --- | --- |
| `@elmenov/island` | Function and primitive types, strict types, optional values, and exceptions. |

See the [API documentation](https://elmenov-softworks.github.io/elmenov/)
and [package source](packages/island/src/index.ts) for the current exports.

## Development

Use Node.js 20, as used by CI:

```sh
npm ci
npx nx run-many -t typecheck,lint:check,prettier:check,test:unit
```

CI checks pull requests against `main`. Documentation is generated from `main`
and published from the `gh-pages` branch.

## Contributing and security

Propose changes through [issues](https://github.com/Elmenov-Softworks/elmenov/issues)
or pull requests. See [CONTRIBUTING.md](CONTRIBUTING.md) and
[SECURITY.md](SECURITY.md).

MIT license. See [LICENSE](LICENSE).
