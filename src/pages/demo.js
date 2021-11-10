import MarkdownEditor from '@uiw/react-markdown-editor';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function demo() {
  return (
    <MarkdownEditor
      value="# This is a H1  \n## This is a H2  \n###### This is a H6"
      onChange={(editor, data, value) => setMarkdown(value)}
    />
  );
}
export default demo