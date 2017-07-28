cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "com.darktalker.cordova.screenshot.screenshot",
        "file": "plugins/com.darktalker.cordova.screenshot/www/Screenshot.js",
        "pluginId": "com.darktalker.cordova.screenshot",
        "merges": [
            "navigator.screenshot"
        ]
    },
    {
        "id": "cordova-plugin-apple-watch.AppleWatch",
        "file": "plugins/cordova-plugin-apple-watch/www/applewatch.js",
        "pluginId": "cordova-plugin-apple-watch",
        "clobbers": [
            "applewatch"
        ]
    },
    {
        "id": "cordova-plugin-console.console",
        "file": "plugins/cordova-plugin-console/www/console-via-logger.js",
        "pluginId": "cordova-plugin-console",
        "clobbers": [
            "console"
        ]
    },
    {
        "id": "cordova-plugin-console.logger",
        "file": "plugins/cordova-plugin-console/www/logger.js",
        "pluginId": "cordova-plugin-console",
        "clobbers": [
            "cordova.logger"
        ]
    },
    {
        "id": "cordova-plugin-statusbar.statusbar",
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "id": "ionic-plugin-keyboard.keyboard",
        "file": "plugins/ionic-plugin-keyboard/www/ios/keyboard.js",
        "pluginId": "ionic-plugin-keyboard",
        "clobbers": [
            "cordova.plugins.Keyboard"
        ],
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.darktalker.cordova.screenshot": "0.1.5",
    "cordova-plugin-apple-watch": "0.11.5",
    "cordova-plugin-console": "1.0.7",
    "cordova-plugin-statusbar": "2.2.3",
    "cordova-plugin-whitelist": "1.3.2",
    "ionic-plugin-keyboard": "2.2.1"
};
// BOTTOM OF METADATA
});