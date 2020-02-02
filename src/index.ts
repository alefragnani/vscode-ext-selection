import { TextEditor, Selection, Position } from "vscode";

function selectWordAtCursorPosition(editor: TextEditor): boolean {
    if (!editor.selection.isEmpty) {
        return true;    
    }

    const cursorWordRange = editor.document.getWordRangeAtPosition(editor.selection.active);
    
    if (!cursorWordRange) {
        return false;
    }

    const newSe = new Selection(cursorWordRange.start.line, cursorWordRange.start.character, cursorWordRange.end.line, cursorWordRange.end.character);
    editor.selection = newSe;
    return true;            
}

function selectLines(editor: TextEditor, lines: number[]): Selection[] {
    editor.selections.shift();
    const selections = new Array<Selection>();
    lines.forEach(line => {
        selections.push(new Selection(line, 0, line, editor.document.lineAt(line).text.length)); 
    });
    editor.selections = selections;
    return editor.selections;
}

export { 
    selectWordAtCursorPosition,
    selectLines
};