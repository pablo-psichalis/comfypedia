# Comfypedia

A simple UI built using ReactJS to search based on the [MediaWiki API](https://www.mediawiki.org/wiki/API:Main_page) that offers results in English, Spanish & Chinese.

Because, very often, the best way to accurately translate a relatively technical word is to search for its article in Wikipedia and switch to the desired output language :P
## Development scripts
### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Mobile version
[Capacitor](https://capacitorjs.com/) was installed to generate the mobile version. 
### Android
To generate the android apk you may execute the following commands (requires Android studio and the Android SDK).
1. `yarn build`
2. `npx cap copy`
3. `npx cap open android` 

### iOS
Coming soon...