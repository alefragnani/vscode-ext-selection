/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the MIT License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

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

enum Directions { Forward, Backward }

function expandSelectionToPosition(editor: TextEditor, position: Position, direction: Directions): Selection {
    let newSelection: Selection;  
    const actualSelection: Selection = editor.selection;  
            
    // no matter 'the previous selection'. going FORWARD will become 'isReversed = FALSE'
    if (direction === Directions.Forward) {                        
        if (actualSelection.isEmpty || !actualSelection.isReversed) {
            newSelection = new Selection(editor.selection.start.line, editor.selection.start.character, 
                position.line, position.character);
        } else {
            newSelection = new Selection(editor.selection.end.line, editor.selection.end.character, 
                position.line, position.character);
        }
    } else { // going BACKWARD will become 'isReversed = TRUE'
        if (actualSelection.isEmpty || !actualSelection.isReversed) {
            newSelection = new Selection(editor.selection.start.line, editor.selection.start.character, 
                position.line, position.character);
        } else {
            newSelection = new Selection(editor.selection.end.line, editor.selection.end.character, 
                position.line, position.character);
        }
    }
    editor.selection = newSelection;
    return editor.selection;
}

function shrinkSelectionToPosition(editor: TextEditor, position: Position, direction: Directions): Selection {
    let newSelection: Selection;   
            
    // no matter 'the previous selection'. going FORWARD will become 'isReversed = FALSE'
    if (direction === Directions.Forward) {    
        newSelection = new Selection(editor.selection.end.line, editor.selection.end.character, 
            position.line, position.character);
    } else { // going BACKWARD , select to line length
        newSelection = new Selection(editor.selection.start.line, editor.selection.start.character, 
            position.line, position.character);
    }
    editor.selection = newSelection;
    return editor.selection;
}      

export { 
    selectWordAtCursorPosition,
    selectLines,
    Directions,
    expandSelectionToPosition,
    shrinkSelectionToPosition,
};