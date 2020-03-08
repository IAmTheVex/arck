# Arck


![Arck logo][logo]


# Setup:
1. Install globally `lerna yarn prisma2 ts-node typescript`
2. Setup the default project cli alias: 

Add the following alias to your terminal profile
```shell script
alias ad="NODE_NO_WARNINGS=1 TS_NODE_TRANSPILE_ONLY=true ts-node ${PROJECT_PATH}/packages/demo/bin/debug-run.ts"
```

For example:
```shell script
alias ad="NODE_NO_WARNINGS=1 TS_NODE_TRANSPILE_ONLY=true ts-node /mnt/c/Users/Laur/WebstormProjects/Arck/packages/demo/bin/debug-run.ts"
```

[logo]: https://raw.githubusercontent.com/IAmTheVex/arck/master/media/arck.png "Arck logo"