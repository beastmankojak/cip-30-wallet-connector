# Example

```
    <script src="dist/main.js"></script>
    <script>
      (async () => {
        // Create an instance of the wallet class
        const nami = new cip30.wallet(
          await cip30.getSerializationLib(), // Dynamically load the web assembly serialization lib
          window.cardano?.nami, // The wallet extension api lives on the window.cardano object
        );

        const enabled = await nami.isEnabled();
        console.log(enabled);

        // This will pop the nami window that requests connection if it's not already connected
        await nami.enable();

        // This will grab the wallet address and write it to the conosle
        console.log('address:', await nami.getAddress());
      })();
    </script>
```

# How to build

This project has been created using **webpack-cli**, you can now run

```
npm run build
```

or

```
yarn build
```

to bundle your application
