# How to install in iOS device

## AppDelegate.m

Replace

```swift
jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
```

With

```swift
#ifdef DEBUG
  // DEV
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  // PROD
  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  #endif
```

## info.plist

Do not touch App Transport Security if **installing on your device.**

> Important: Remove localhost and enable ATS when publishing to app store.

App Transport Security is a security feature introduced in iOS 9 that rejects all HTTP requests that are not sent over HTTPS. You should re-enable ATS prior to building your app for production by removing the `localhost` entry from the `NSExceptionDomains` dictionary in your `Info.plist` file in the `ios/` folder.

If your application needs to access HTTP resources on production, see [this post](https://ste.vn/2015/06/10/configuring-app-transport-security-ios-9-osx-10-11/) to learn how to configure ATS on your project.

## Open xcode

`Product → Scheme → Edit Scheme`. Select the `Run` tab in the sidebar, then set the Build Configuration dropdown to `Release`.

![ConfigureReleaseScheme](ConfigureReleaseScheme.png)

## Select device

On top left corner, next to app name you can select device and then hit run button.

> Using xcode you can install the released (production) app to your device and if you want to run it in simulator using debug mode then you can do it just by `react-native run-ios --simulator=\"iPhone X\"` and no need to reconfigure active scheme through xcode.
