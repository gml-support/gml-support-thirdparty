'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const gmlThirdparty = require("./gmlThirdparty");
class GMLCompletionItemProvider {
    constructor() {
        this.triggerCharacters = ['.'];
    }
    provideCompletionItems(document, position) {
        let result = [];
        let enable = vscode_1.workspace.getConfiguration('gml-gm81' || 'gml-gms' || 'gml-gms2').get('suggest.basic', true);
        if (!enable) {
            return Promise.resolve(result);
        }
        let range = document.getWordRangeAtPosition(position);
        const prefix = range ? document.getText(range) : '';
        if (!range) {
            range = new vscode_1.Range(position, position);
        }
        const added = {};
        const createNewProposal = (kind, name, entry, type) => {
            const proposal = new vscode_1.CompletionItem(name);
            proposal.kind = kind;
            if (entry) {
                if (entry.description) {
                    let availability = "GM Language Availability: ";
                    proposal.documentation = availability + entry.available + " \n " + entry.description;
                }

                if (entry.signature) {
                    proposal.detail = entry.signature;
                }
                if (entry.parameters) {
                    let signature = type ? '(' + type + ')' : '';
                    signature += name;
                    signature += '(';
                    if (entry.parameters && entry.parameters.length != 0) {
                        let params = '';
                        entry.parameters.forEach(p => params += p.label + ',');
                        signature += params.slice(0, -1);
                    }
                    signature += ')';
                    proposal.detail = signature;
                }
            }
            return proposal;
        };
        const matches = (name) => {
            return prefix.length === 0 || name.length >= prefix.length && name.substr(0, prefix.length) === prefix;
        };
        //Third-party
        for (const thirdfunctions in gmlThirdparty.thirdfunctions) {
            if (gmlThirdparty.thirdfunctions.hasOwnProperty(thirdfunctions) && matches(thirdfunctions)) {
                added[thirdfunctions] = true;
                result.push(createNewProposal(vscode_1.CompletionItemKind.Function, thirdfunctions, gmlThirdparty.thirdfunctions[thirdfunctions]));
            }
        }
        for (const thirdconstants in gmlThirdparty.thirdconstants) {
            if (gmlThirdparty.thirdconstants.hasOwnProperty(thirdconstants) && matches(thirdconstants)) {
                added[thirdconstants] = true;
                result.push(createNewProposal(vscode_1.CompletionItemKind.Field, thirdconstants, gmlThirdparty.thirdconstants[thirdconstants]));
            }
        }
        const text = document.getText();
        const functionMatch = /^\w+\s+([a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*)\s*\(/mg;
        let match = null;
        while (match = functionMatch.exec(text)) {
            const word = match[1];
            if (!added[word]) {
                added[word] = true;
                result.push(createNewProposal(vscode_1.CompletionItemKind.Function, word, null));
            }
        }
        return Promise.resolve(result);
    }
}
exports.default = GMLCompletionItemProvider;