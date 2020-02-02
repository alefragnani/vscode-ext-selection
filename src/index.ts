import { TextEditor, Selection, Position } from "vscode";

function selectWordAtCursorPosition(editor: TextEditor): boolean {
    if (!editor.selection.isEmpty) {
        return true;    
    }

    const cursorWordRange = editor.document.getWordRangeAtPosition(editor.selection.active);
    
    if (!cursorWordRange) {
        return false;
    }

    let newSe = new Selection(cursorWordRange.start.line, cursorWordRange.start.character, cursorWordRange.end.line, cursorWordRange.end.character);
    editor.selection = newSe;
    return true;            
}

export { 
    selectWordAtCursorPosition 
};