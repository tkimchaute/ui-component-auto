const JsCustomization = require('../../pageObject/app/JsCssCustomization');
const Common = require('../../utils/Common');
const AppSettings = require('../../pageObject/app/AppSettings')

describe('kintoneUIComponent - JS test - Upload files', function () {
    it('upload file', function () {
        Common.logInSlash();
        JsCustomization.navigate();
        JsCustomization.deleteAllJSFiles();
        JsCustomization.uploadFile();
        JsCustomization.save();
        AppSettings.updateApp();
        Common.logOutSlash();
    })
});