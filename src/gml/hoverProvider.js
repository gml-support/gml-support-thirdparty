'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const gmlThirdparty = require("./gmlThirdparty");
function textToMarkedString(text) {
    return text.replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&'); // escape markdown syntax tokens: http://daringfireball.net/projects/markdown/syntax#backslash
}
exports.textToMarkedString = textToMarkedString;
const GMLHoverProvider = ((() => {
    class GMLHoverProvider {
        provideHover(document, position, token) {
            let enable = vscode_1.workspace.getConfiguration('gml-gm81' || 'gml-gms' || 'gml-gms2').get('suggest.basic', true);
            if (!enable) {
                return undefined;
            }
            const wordRange = document.getWordRangeAtPosition(position);
            if (!wordRange) {
                return undefined;
            }
            const name = document.getText(wordRange);
            let backchar = '';
            if (wordRange.start.character > 0) {
                let backidx = wordRange.start.translate({ characterDelta: -1 });
                backchar = backidx.character < 0 ? '' : document.getText(new vscode_1.Range(backidx, wordRange.start));
            }
            let isChinese = vscode_1.workspace.getConfiguration('gmlsupport').get('thirdparty.isChinese', false);
            if (isChinese == true)
            {
                const entry = gmlThirdparty.thirdfunctions[name] || gmlThirdparty.thirdconstants[name] || gmlThirdparty.cnthirdfunctions[name] || gmlThirdparty.cnthirdconstants[name];
            }
            else
            {
                const entry = gmlThirdparty.thirdfunctions[name] || gmlThirdparty.thirdconstants[name];
            }
            if (entry && entry.description && entry.available) {
                const signature = entry.signature;
                const availability = "GM Language Availability: ";
                const contents = [];
                contents.push(new vscode_1.MarkdownString(signature));
                contents.push(textToMarkedString(availability + entry.available + " \n " + entry.description));
                return new vscode_1.Hover(contents, wordRange);
            }
            return undefined;
        }
    }

    return GMLHoverProvider;
})());
exports.default = GMLHoverProvider;