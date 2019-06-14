# update-package-lock

CLI tool that updates a package lock.

```
npm install -g update-package-lock
```

Apparently this is tricky enough to require a module since non of the npm flags
seem to work across configs ¯\\_(ツ)_/¯

## Usage

``` sh
cd my-project
update-package-lock
```

(Works by tmp copying your npmrc config into the folder and editing the package-lock flag to true)

## License

MIT
