const { getDefaultConfig } = require('expo/metro-config');
const path = require('path')

const config = getDefaultConfig(__dirname)

const extraNodeModules = {
   'MasterDetailNavigator': path.resolve(__dirname + '/../src/')
}

config.resolver = {
    extraNodeModules
}

const watchFolders = [
    path.resolve(__dirname + '/../src')
];

config.watchFolders = watchFolders

module.exports = config