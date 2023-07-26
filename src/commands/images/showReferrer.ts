import { IActionContext } from '@microsoft/vscode-azext-utils';
import * as vscode from 'vscode';
import { ext } from '../../extensionVariables';
import { ImageTreeItem } from '../../tree/images/ImageTreeItem';

export async function showReferrer(context: IActionContext, node: ImageTreeItem | undefined): Promise<string> {
    //this exports a function with a tree item as its parameter and returns a promise string
    if (!node) { //check if the node parameter is undefined
        await ext.imagesTree.refresh(context); //if it is refresh the images tree
        node = await ext.imagesTree.showTreeItemPicker<ImageTreeItem>(ImageTreeItem.contextValue, {
            ...context,
            noItemFoundErrorMessage: vscode.l10n.t('No images are available to copy tag')
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    //return node.fullTag; //returns the full tag of the image tree item if the node is defined
    let referrerExt = extensions.getExtension('annaIntern.annaPrototype');
    let importedApi = referrerExt.exports;

    console.log(importedApi.showReferrer(node.fullTag));
}
