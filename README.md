# vscode-ext-selection

This module contains a set of helper functions to work with **text selection** while developing VS Code extensions.

## Installation

`npm install vscode-ext-selection`

## Usage

```ts
    import { Directions, selectLines, expandSelectionToPosition, shrinkSelectionToPosition } from "vscode-ext-selection";

    ...

    if (selectWordAtCursorPosition(editor)) {
        vscode.env.clipboard.writeText(editor.document.getText(editor.selection));
    } else {
        vscode.commands.executeCommand("editor.action.clipboardCopyAction");
    }

    ...

    const lines: number[] = [];
    for (const bookmark of bookmarks.activeBookmark.bookmarks) {
        lines.push(bookmark.line);
    }
    selectLines(vscode.window.activeTextEditor, lines);

    ...

    const line = 10;
    const column = 20;
    const nextPosition = new vscode.Position(line, column);
    expandSelectionToPosition(vscode.window.activeTextEditor, nextPosition, Directions.Forward);
    shrinkSelectionToPosition(vscode.window.activeTextEditor, nextPosition, Directions.Backward);
```

## Support

If you find it useful, please consider supporting it.

<table align="center" width="60%" border="0">
  <tr>
    <td>
      <a title="Paypal" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=EP57F3B6FXKTU&lc=US&item_name=Alessandro%20Fragnani&item_number=vscode%20extensions&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><img src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif"/></a>
    </td>
    <td>
      <a title="Paypal" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=EP57F3B6FXKTU&lc=BR&item_name=Alessandro%20Fragnani&item_number=vscode%20extensions&currency_code=BRL&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><img src="https://www.paypalobjects.com/pt_BR/i/btn/btn_donate_SM.gif"/></a>
    </td>
    <td>
      <a title="Patreon" href="https://www.patreon.com/alefragnani"><img src="https://raw.githubusercontent.com/alefragnani/oss-resources/master/images/button-become-a-patron-rounded-small.png"/></a>
    </td>
  </tr>
</table>

# License

[MIT](LICENSE.md) &copy; Alessandro Fragnani